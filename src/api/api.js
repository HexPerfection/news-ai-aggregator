const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

const NEWS_API_KEY = process.env.REACT_APP_NEWS_API_KEY || '';
const GPT_API_KEY = process.env.REACT_APP_OPENAI_API_KEY || '';

// Fetch News from NewsAPI and summarize each article
app.post('/api/fetch-news', async (req, res) => {
  const { topics } = req.body;
  try {
    // Fetching articles based on selected topics
    const newsRes = await axios.get(`https://newsapi.org/v2/everything?q=${topics.join(',')}&apiKey=${NEWS_API_KEY}`);
    const articles = newsRes.data.articles;

    // Summarizing each article using GPT API
    const summarizedArticles = await Promise.all(articles.map(async (article) => {
      try {
        const gptRes = await axios.post(
          'https://api.openai.com/v1/engines/davinci/completions',
          {
            prompt: `Summarize this article: ${article.content}`,
            max_tokens: 100,
            temperature: 0.7,
          },
          {
            headers: {
              'Authorization': `Bearer ${GPT_API_KEY}`,
            },
          }
        );

        const summary = gptRes.data.choices[0].text.trim();

        // Returning both original and summarized content
        return {
          id: article.url,
          title: article.title,
          url: article.url,
          content: article.content,
          summary,
        };
      } catch (error) {
        console.error('Error summarizing article:', error);
        return { ...article, summary: 'Error summarizing this article' };
      }
    }));

    res.json({ articles: summarizedArticles });
  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).json({ message: 'Error fetching news', error });
  }
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
