import React, { useState } from 'react';
import axios from 'axios';
import Home from './components/Home';
import News from './components/News';
import Article from './components/Article';
import { BrowserRouter as Router, Routes, Route } from'react-router-dom';

const App = () => {
  const [articles, setArticles] = useState([]);

  const APIServer = 'http://localhost:5000';

  const fetchNews = async (query) => {
    try {
      const newsResponse = await axios.post(`${APIServer}/api/fetch-news`, { query });
      const fetchedArticles = newsResponse.data.articles;

      setArticles(fetchedArticles);
    } catch (error) {
      console.error('Error fetching news or summarizing:', error);
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home fetchNewsBySearch={fetchNews} />} />
        <Route path="/articles" element={<News articles={articles} />} />
        <Route path="/article/:id" element={<Article articles={articles} />} />
      </Routes>
    </Router>
  );
};

export default App;

