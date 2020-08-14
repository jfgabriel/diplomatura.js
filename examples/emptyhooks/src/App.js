import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';

import MoviesPage from './pages/MoviesPage';
import SeriesPage from './pages/SeriesPage';
import MovieDetail from './pages/MovieDetail';

import './App.css';

function App() {
  return (
    <div className="App">
      <nav>
        <ul className="nav nav-pills">
          <li className="active">
            <Link className="nav-link active" to="/">
              Movies
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/series">
              Series
            </Link>
          </li>
        </ul>
      </nav>
      <Switch>
        <Route path="/" exact component={MoviesPage}></Route>
        <Route path="/series" exact component={SeriesPage}></Route>
        <Route path="/movies/:id" exact component={MovieDetail}></Route>
        <Route component={Error}></Route>
      </Switch>
    </div>
  );
}

export default App;
