/*eslint-disable no-unused-vars*/
import React from 'react';
import ReactDOM from 'react-dom';
import Router from 'react-router';
import AppRoutes from './app-routes';
import createHashHistory from 'history/lib/createHashHistory';

ReactDOM.render(
  <Router history={createHashHistory({queryKey: false})}>
    {AppRoutes}
  </Router>
, document.getElementById('app'));
