import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import "../styles.css";

const News = ({ fetchNewsBySearch }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('search');

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const fetchedArticles = await fetchNewsBySearch(searchQuery);
        setArticles(fetchedArticles);
      } catch (error) {
        setError('Error fetching news articles. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (searchQuery) {
      fetchArticles();
    }
  }, [searchQuery, fetchNewsBySearch]);

  if (loading) {
    return <div>Loading articles...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Articles for: "{searchQuery}"</h1>
      {articles.length === 0 ? (
        <p>No articles found. Please try a different search.</p>
      ) : (
        articles.map((article, index) => (
          <div key={index} className="news-article">
            {article.urlToImage && (
              <img src={article.urlToImage} alt={article.title} className="article-image" />
            )}
            <h2>{article.title}</h2>
            <p>By {article.author || 'Unknown'} | Published on {new Date(article.publishedAt).toLocaleDateString()}</p>
            <p>{article.description}</p>
            <Link to={`/article/${index}`} state={{ article }}>Read more</Link>
          </div>
        ))
      )}
    </div>
  );
};

export default News;