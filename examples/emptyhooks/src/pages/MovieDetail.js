import React, { useState, useEffect } from 'react';

import { fetchMovie } from '../services/omdb';

function MovieDetail(props) {
  //console.log(props);
  const {
    match: {
      params: { id },
    },
  } = props;

  const [movie, setMovie] = useState({ id: '' });

  useEffect(() => {
    const f = async () => {
      const movie = await fetchMovie(id);
      console.log(movie);
      setMovie(movie);
    };
    f();
  }, [id]);
  return (
    <div>
      <h2>{movie.Title}</h2>
      <div>
        <span>rating:{movie.imdbRating}</span>
      </div>
      <div>
        <span>rating:{movie.imdbVotes}</span>
      </div>
      <div>
        <span>Plot:{movie.Plot}</span>
      </div>
      <div>
        <span>Genre:{movie.Genre}</span>
      </div>
      <div>
        <span>Actors:{movie.Actors}</span>
      </div>
      <div>
        <span>Director:{movie.Director}</span>
      </div>
    </div>
  );
}

export default MovieDetail;
