/*eslint-disable no-unused-vars*/
import React from 'react';
import Layout from './pages/layout';
import Home from './pages/home';
import Playground from './pages/playground';
import Components from './pages/components';
import { Route, IndexRoute } from 'react-router';

const Routes = (
  <Route path="/" component={Layout}>
    <Route path="home" component={Home} />
    <Route path="components" component={Components} />
    <Route path="playground" component={Playground} />
    <IndexRoute component={Home}/>
  </Route>
);

export default Routes;
