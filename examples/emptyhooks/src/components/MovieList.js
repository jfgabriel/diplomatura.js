import React, { useState, useEffect } from 'react';

import { fetchMovies } from '../services/omdb';
import MovieItem from './MovieItem';

function MovieList() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMsg, setErrorMessage] = useState('');
  useEffect(() => {
    async function f() {
      const moviesResult = await fetchMovies(searchTerm);
      console.log('moviesResult', moviesResult);
      if (moviesResult.Response === 'True') {
        setMovies(moviesResult.Search);
        setErrorMessage('');
      } else {
        if (moviesResult.Error) {
          setMovies([]);
          if (searchTerm) {
            setErrorMessage(moviesResult.Error);
          }
        }
      }
    }
    f();
  }, [searchTerm]);
  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
        }}
      />
      <span>{errorMsg}</span>
      <ul>
        {movies.map((movie, i) => {
          console.log(movie);
          return <li key={i}>{<MovieItem data={movie} />}</li>;
        })}
      </ul>
    </div>
  );
}

export default MovieList;
