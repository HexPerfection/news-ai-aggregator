import React, { useState } from 'react';

const Home = ({ fetchNews }) => {
  const [selectedTopics, setSelectedTopics] = useState([]);

  const topics = ["Technology", "Business", "Health", "Sports", "Entertainment"];

  const handleSelectTopic = (topic) => {
    if (selectedTopics.includes(topic)) {
      setSelectedTopics(selectedTopics.filter((t) => t !== topic));
    } else {
      setSelectedTopics([...selectedTopics, topic]);
    }
  };

  const handleFetchNews = () => {
    fetchNews(selectedTopics);
  };

  return (
    <div>
      <h2>Select Topics</h2>
      <div>
        {topics.map((topic) => (
          <button
            key={topic}
            className={`topic-button ${selectedTopics.includes(topic) ? "selected" : ""}`}
            onClick={() => handleSelectTopic(topic)}
          >
            {topic}
          </button>
        ))}
      </div>
      <button onClick={handleFetchNews}>Get News</button>
    </div>
  );
};

export default Home;