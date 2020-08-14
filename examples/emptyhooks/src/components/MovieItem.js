import React from 'react';
import { useHistory } from 'react-router-dom';
export function MovieItem({ data }) {
  const history = useHistory();
  console.log(data);
  const { Title, imdbID } = data;
  return (
    <div>
      {Title}{' '}
      <button
        onClick={() => {
          history.push(`/movies/${imdbID}`);
        }}
      >
        ver
      </button>
    </div>
  );
}
export default MovieItem;
