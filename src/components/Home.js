import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const [featuredArticles, setFeaturedArticles] = useState([]);
  const [error, setError] = useState(null);
  const APIServer = 'http://localhost:5000';

  useEffect(() => {
    const fetchTopHeadlines = async () => {
      try {
        const response = await axios.post(`${APIServer}/api/top-headlines`);
        const articles = response.data.articles.slice(0, 5); // Take the top 5 articles for featured news
        setFeaturedArticles(articles);
      } catch (error) {
        setError('Error fetching featured news. Please try again later.');
      }
    };

    fetchTopHeadlines();
  }, [APIServer]);

  const handleSearch = () => {
    if (searchQuery.trim() !== '') {
      navigate(`/articles?search=${searchQuery}`); // Redirect to articles page after fetching
      setSearchQuery(''); // Clear input after searching
    }
  };

  return (
    <div className='home-container'>
      <h2>Search for News</h2>
      <div className='search-bar'>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Enter search query"
          className='search-input'
        />
        <button onClick={handleSearch} className='search-button'>Search</button>
      </div>
      <div className="container">
        <h1>Featured News</h1>
        {error && <p className="error">{error}</p>}
        <div className="featured-news-section">
          {featuredArticles.map((article, index) => (
            <div key={index} className="featured-article">
              {article.urlToImage && (
                <img src={article.urlToImage} alt={article.title} className="featured-article-image" />
              )}
              <h2>{article.title}</h2>
              <p>{article.description}</p>
              <Link to={`/article/${index}`} state={{ article }}>Read more</Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;