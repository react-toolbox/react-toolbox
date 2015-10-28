import React from 'react';
import { App } from 'react-toolbox';
import { Route, IndexRoute } from 'react-router';

import Home from './components/layout/home';
import Main from './components/layout/main';
import Playground from './components/layout/playground';
import Components from './components/layout/components';

const Routes = (
  <Route component={App}>
    <Route path="/" component={Home} />
    <Route component={Main}>
      <Route path="/components" component={Components} />
      <Route path="/playground" component={Playground} />
    </Route>
    <IndexRoute component={Home}/>
  </Route>
);

export default Routes;
