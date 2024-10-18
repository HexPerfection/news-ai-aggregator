import React, { useState } from 'react';
import axios from 'axios';
import Home from './components/Home';
import News from './components/News';

const App = () => {
  const [articles, setArticles] = useState([]);

  const fetchNews = async (topics) => {
    try {
      const newsResponse = await axios.post('/api/fetch-news', { topics });
      const fetchedArticles = newsResponse.data.articles;

      const summarizedArticles = await Promise.all(
        fetchedArticles.map(async (article) => {
          const summaryResponse = await axios.post('/api/summarize', { articleContent: article.content });
          return {
            id: article.url,
            title: article.title,
            url: article.url,
            summary: summaryResponse.data.summary,
          };
        })
      );
      setArticles(summarizedArticles);
    } catch (error) {
      console.error('Error fetching news or summarizing:', error);
    }
  };

  return (
    <div>
      <Home fetchNews={fetchNews} />
      <News articles={articles} />
    </div>
  );
};

export default App;

