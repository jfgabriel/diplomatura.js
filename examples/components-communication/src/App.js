import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';

import Container from './components/Container';
import PropsExample from './Pages/PropsExample';

export default function App() {
  return (
    <>
      <BrowserRouter>
        <div>
          <nav>
            <Container>
              <Link className="alink" to="/props">
                1. Props
              </Link>
              <Link className="alink" to="/about">
                2. Instance methods
              </Link>
              <Link className="alink" to="/users">
                3. Lala
              </Link>
            </Container>
          </nav>
          <div className="container">
            <Route path="/props" exact>
              <PropsExample />
            </Route>
          </div>
        </div>
      </BrowserRouter>
    </>
  );
}
