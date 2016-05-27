import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'react-css-themr';
import { Router, Route, useRouterHistory } from 'react-router';
import createHashHistory from 'history/lib/createHashHistory';
import theme from './theme/theme.js';
import Home from './components/layout/home';
import Install from './components/layout/install';
import Main from './components/layout/main';

ReactDOM.render((
  <ThemeProvider theme={theme}>
    <Router history={useRouterHistory(createHashHistory)({ queryKey: false })}>
      <Route path="/" component={Home} />
      <Route path="/install" component={Install} />
      <Route path="/components" component={Main}>
        <Route path=":component" />
      </Route>
    </Router>
  </ThemeProvider>
), document.getElementById('app'));
