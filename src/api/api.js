const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

const NEWS_API_KEY = process.env.REACT_APP_NEWS_API_KEY || "";
const GPT_API_KEY = process.env.REACT_APP_OPEN_AI_API_KEY || "";

// Fetch News from NewsAPI
app.post('/api/fetch-news', async (req, res) => {
  const { topics } = req.body;
  try {
    const newsRes = await axios.get(`https://newsapi.org/v2/everything?q=${topics.join(',')}&apiKey=${NEWS_API_KEY}`);
    const articles = newsRes.data.articles;
    res.json({ articles });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching news', error });
  }
});

// Summarize Article with GPT-based API
app.post('/api/summarize', async (req, res) => {
  const { articleContent } = req.body;
  try {
    const gptRes = await axios.post('https://api.openai.com/v1/engines/davinci/completions', {
      prompt: `Summarize this article: ${articleContent}`,
      max_tokens: 100,
      temperature: 0.7,
    }, {
      headers: {
        'Authorization': `Bearer ${GPT_API_KEY}`
      }
    });
    const summary = gptRes.data.choices[0].text.trim();
    res.json({ summary });
  } catch (error) {
    res.status(500).json({ message: 'Error summarizing article', error });
  }
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});