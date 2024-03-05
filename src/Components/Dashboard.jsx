// Dashboard.jsx
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

function Dashboard() {
  const [searchKey, setSearchKey] = useState('');
  const [movieResults, setMovieResults] = useState([]);

  const fetchMovies = async () => {
    console.log(searchKey)
    try {

      // const response = await axios.get(
      //   `http://localhost:${process.env.REACT_APP_JSON_SERVER_PORT}/movies?q=${searchKey}`
      // );
      const response = await axios({
        method: 'get',
        baseURL: `http://localhost:${process.env.REACT_APP_JSON_SERVER_PORT}`,
        url: `/movies`,
        params:{
          q: searchKey
        }
      })
      setMovieResults(response.data);
    
    } catch (error) {
      console.error('Error fetching movies:', error);
      
    }
  
  };
  useEffect(() => {
    fetchMovies();
    
  }, [searchKey]);
     console.log(movieResults)
  return (
    <div>
      <input
        type="text"
        placeholder="Search Movies"
        value={searchKey}
        onChange={(e) => setSearchKey(e.target.value)}
        data-testid="search_key"
      />
      <div data-testid="movie_results">
        {
          movieResults.map((movie) => (
            <div className="movie-card" key={movie.id}>
              <h3>Title: {movie.title}</h3>
              <p>Year: {movie.year}</p>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Dashboard;
