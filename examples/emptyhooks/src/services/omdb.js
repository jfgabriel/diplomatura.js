const OMDB_API_KEY = process.env.REACT_APP_OMDB_API_KEY;

export async function fetchMovies(search = '') {
  return fetch(
    `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&type=movie&s=${search}`
  ).then((r) => r.json());
}

export async function fetchMovie(movieId = '') {
  return fetch(
    `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&type=movie&i=${movieId}`
  ).then((r) => r.json());
}
