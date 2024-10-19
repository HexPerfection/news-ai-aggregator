import React from 'react';
import axios from 'axios';
import Home from './components/Home';
import News from './components/News';
import Article from './components/Article';
import { BrowserRouter as Router, Routes, Route } from'react-router-dom';

const App = () => {

  const APIServer = 'http://localhost:5000';

  const fetchNews = async (query) => {
    try {
      const newsResponse = await axios.post(`${APIServer}/api/fetch-news`, { query });
      return newsResponse.data.articles;
    } catch (error) {
      console.error('Error fetching news or summarizing:', error);
      return [];
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/articles" element={<News fetchNewsBySearch={fetchNews} />} />
        <Route path="/article/:id" element={<Article />} />
      </Routes>
    </Router>
  );
};

export default App;

