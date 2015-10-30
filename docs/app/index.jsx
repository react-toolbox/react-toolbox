import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute } from 'react-router';
import { App } from 'react-toolbox';
import { createHashHistory } from 'history';

import Home from './components/layout/home';
import Main from './components/layout/main';
import Playground from './components/layout/playground';
import Documentation from './components/layout/main/components/documentation';

ReactDOM.render((
  <Router history={createHashHistory()}>
    <Route component={App}>
      <Route path="/" component={Home} />
      <Route component={Main}>
        <Route path="/components/:component" component={Documentation} />
        <Route path="/playground" component={Playground} />
      </Route>
      <IndexRoute component={Home}/>
    </Route>
  </Router>
), document.getElementById('app'));
