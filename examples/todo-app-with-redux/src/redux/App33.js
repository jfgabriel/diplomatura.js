import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router-dom';

import { App } from './App';
import { Foo } from './Foo';
import { Bar } from './Bar';
import createStore from './createReduxStore';

const store = createStore();

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route exact path="/" component={App} />
      <Route path="/foo" component={Foo} />
      <Route path="/bar" component={Bar} />
    </Router>
  </Provider>,
  document.getElementById('root')
);
