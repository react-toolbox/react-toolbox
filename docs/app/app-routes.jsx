/*eslint-disable no-unused-vars*/
import React from 'react';
import { App } from 'react-toolbox';
import { Route, IndexRoute } from 'react-router';
import Home from './components/layout/home';
import Main from './components/layout/main';
import Playground from './components/layout/main/playground';
import Component from './components/layout/main/component';

const Routes = (
  <Route component={App}>
    <Route path="/" component={Home} />
    <Route component={Main}>
      <Route path="/components/:component" component={Component} />
      <Route path="/playground" component={Playground} />
    </Route>
    <IndexRoute component={Home}/>
  </Route>
);

export default Routes;
