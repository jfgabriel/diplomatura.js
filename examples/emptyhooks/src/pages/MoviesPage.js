import React, { Component } from 'react';

import MovieList from '../components/MovieList';

export default class MoviesPage extends Component {
  render() {
    return (
      <div>
        <h1>Movie page</h1>
        <MovieList />
      </div>
    );
  }
}
