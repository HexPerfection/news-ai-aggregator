import React from 'react';
import { Link } from 'react-router-dom';

const News = ({ articles }) => {
  return (
    <div>
      {articles.map((article, index) => (
        <div key={article.id} className="news-article">
          <h3>{article.title}</h3>
          <Link to={`/article/${index}`}>Read Full Article</Link>
        </div>
      ))}
    </div>
  );
};

export default News;