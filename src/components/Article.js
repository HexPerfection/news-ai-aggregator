import React from 'react';
import { useParams } from 'react-router-dom';

const Article = ({ articles }) => {
  const { id } = useParams();
  const article = articles[id];

  if (!article) {
    return <div>Article not found</div>;
  }

  return (
    <div>
      <h2>{article.title}</h2>
      <p><strong>Summary:</strong> {article.summary}</p>
      <p><strong>Original Content:</strong> {article.content}</p>
      <a href={article.url} target="_blank" rel="noopener noreferrer">Read Full Article on Source</a>
    </div>
  );
};

export default Article;