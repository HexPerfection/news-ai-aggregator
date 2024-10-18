import React from 'react';

const NewsDisplay = ({ articles }) => {
  return (
    <div>
      {articles.map((article) => (
        <div key={article.id} className="news-article">
          <h3>{article.title}</h3>
          <p>{article.summary}</p>
          <a href={article.url} target="_blank" rel="noopener noreferrer">Read Full Article</a>
        </div>
      ))}
    </div>
  );
};

export default NewsDisplay;