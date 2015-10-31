import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute } from 'react-router';
import { App } from 'react-toolbox';
import { createHashHistory } from 'history';

import Home from './components/layout/home';
import Main from './components/layout/main';

ReactDOM.render((
  <Router history={createHashHistory({queryKey: false})}>
    <Route component={App}>
      <Route path="/" component={Home} />
      <Route path="/components" component={Main}>
        <Route path=":component" />
      </Route>
      <IndexRoute component={Home}/>
    </Route>
  </Router>
), document.getElementById('app'));
