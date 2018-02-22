import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import Home from './components/layout/home';
import Install from './components/layout/install';
import Main from './components/layout/main';
import './index.css';

ReactDOM.render((
  <HashRouter>
    <Switch>
      <Route exact path="/" render={() => <Home />} />
      <Route exact path="/install" render={() => <Install />} />
      <Route
        exact
        path="/components"
        render={({ match }) => <Main params={match.params} />}
      />
      <Route
        path="/components/:component"
        render={({ match }) => <Main params={match.params} />}
      />
      <Route component={() => <Redirect to="/" />} />
    </Switch>
  </HashRouter>
), document.getElementById('app'));
