import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';

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
      {articles.length > 0 ? (
        <ul>
          {articles.map((article, index) => (
            <li key={index}>
              <h2>{article.title}</h2>
              <p>{article.content}</p>
              {/* Pass article data using Link's state */}
              <Link to={`/article/${index}`} state={{ article }}>
                Read more
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No articles found for this search.</p>
      )}
    </div>
  );
};

export default News;