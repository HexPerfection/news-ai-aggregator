const express = require('express');
const axios = require('axios');
const { OpenAI } = require("openai");
var cors = require('cors');

const NEWS_API_KEY = process.env.NEWS_API_KEY || '';
const GPT_API_KEY = process.env.OPENAI_API_KEY || '';

const app = express();
const openai = new OpenAI(GPT_API_KEY);

app.use(express.json());
app.use(cors());

// Fetch News from NewsAPI and summarize each articlequeryParams: {
app.post('/api/fetch-news', async (req, res) => {
  const { query } = req.body;
  try {
    // Fetching articles based on selected topics
    const newsRes = await axios.get(`https://newsapi.org/v2/everything?q=${query}&apiKey=${NEWS_API_KEY}`);
    const articles = newsRes.data.articles;

    res.json({ articles: articles});
  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).json({ message: 'Error fetching news', error });
  }
});

app.post('/api/summarize-article', async (req, res) => {
  const { content } = req.body;
  try {
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {"role": "system", "content": "You are a assistant helping user analyze a news article User will give you the desciprtion of the article, you help me them analyze it. Respond should be in paragraph format, avoid using any markdown symbol"},
          {"role": "user", "content": `Write an analysis based on the description of my article: "${content}"`}
        ]
      });
      res.json(completion.data.choices[0].message.content);
  } catch (error) {
    console.error('Error summarizing article:', error);
    res.status(500).json({ message: 'Error summarizing article', error });
  }
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
