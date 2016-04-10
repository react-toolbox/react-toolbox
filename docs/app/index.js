import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';

import 'react-toolbox/commons';

import Home from './components/layout/home';
import Install from './components/layout/install';
import Main from './components/layout/main';

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={Home} />
    <Route path="/install" component={Install} />
    <Route path="/components" component={Main}>
      <Route path=":component" />
    </Route>
  </Router>
), document.getElementById('app'));
