const express = require('express');
const axios = require('axios');
const { OpenAI } = require("openai");
var cors = require('cors');

const NEWS_API_KEY = process.env.NEWS_API_KEY || '';
const LLAMA_API_KEY = process.env.LLM_API_KEY || '';

const app = express();
const openai = new OpenAI({baseURL: "https://openrouter.ai/api/v1", apiKey: LLAMA_API_KEY});

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
        model: "meta-llama/llama-3.1-8b-instruct:free",
        messages: [
          {"role": "user", "content": `Write a summary of the article: "${content}"`}
        ]
      });
      const summary = completion.choices[0].message.content;
      res.json(summary);
  } catch (error) {
    console.error('Error summarizing article:', error);
    res.status(500).json({ message: 'Error summarizing article', error });
  }
});

app.post('/api/top-headlines', async (req, res) => {
  try {
    const response = await axios.get(
      `https://newsapi.org/v2/top-headlines?country=us&apiKey=${NEWS_API_KEY}`
    );
    res.json({ articles: response.data.articles });
  } catch (error) {
    console.error('Error fetching top headlines:', error);
    res.status(500).json({ message: 'Error fetching top headlines', error });
  }
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
