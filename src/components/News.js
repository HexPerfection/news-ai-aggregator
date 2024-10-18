import React from 'react';

const News = ({ articles }) => {
  return (
    <div>
      {articles.map((article) => (
        <div key={article.id} className="news-article">
          <h3>{article.title}</h3>
          <p><strong>Summary:</strong> {article.summary}</p>
          <p><strong>Original Content:</strong> {article.content}</p>
          <a href={article.url} target="_blank" rel="noopener noreferrer">Read Full Article</a>
        </div>
      ))}
    </div>
  );
};

export default News;