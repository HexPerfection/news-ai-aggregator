import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchQuery.trim() !== '') {
      navigate(`/articles?search=${searchQuery}`); // Redirect to articles page after fetching
      setSearchQuery(''); // Clear input after searching
    }
  };

  return (
    <div>
      <h2>Search for News</h2>
      <div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Enter search query"
        />
        <button onClick={handleSearch}>Search</button>
      </div>
    </div>
  );
};

export default Home;