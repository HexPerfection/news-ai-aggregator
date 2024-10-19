import { React, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const Article = () => {
  const location = useLocation();
  const { article } = location.state || {};  // Access the article passed from state
  const [summary, setSummary] = useState(''); // State to hold the summarized content
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const APIServer = 'http://localhost:5000';

  useEffect(() => {
    const fetchArticleById = async () => {
      try {
        setLoading(true);
        // Now call the summarize endpoint
        const summaryResponse = await axios.post(`${APIServer}/api/summarize-article`, {
          content: article.content, // Pass the article content to summarize
        });

        setSummary(summaryResponse.data.summary); // Set the summary

      } catch (error) {
        setError('Error fetching or summarizing article. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchArticleById(); // Fetch the article and summary when the component mounts
  }, [article]);

  if (!article) {
    return <div>No article found.</div>;
  }

  if (loading) {
    return <div>Loading article...</div>;
  }

  return (
    <div>
      <h1>{article.title}</h1>
      <p>{article.content}</p>
      {/* Display the summary if it's available */}
      {summary && (
        <>
          <h2>Summary</h2>
          <p>{summary}</p>
        </>
      )}
      {/* Display error message if it's available */}
      {error && <p>{error}</p>}
    </div>
  );
};

export default Article;