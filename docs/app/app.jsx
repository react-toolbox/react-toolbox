/*eslint-disable no-unused-vars*/
import React from 'react';
import ReactDOM from 'react-dom';
import Router from 'react-router';
import AppRoutes from './app-routes';
import createHashHistory from 'history/lib/createHashHistory';

const Docs = () => {
  return (
    <Router history={createHashHistory({queryKey: false})}>
      {AppRoutes}
    </Router>
  );
};

ReactDOM.render(<Docs/>, document.getElementById('app'));
