import React from 'react';
import Router from 'react-router';
import routes from './routes';

const Docs = props => {
  return (
    <Router history={props.history}>
      {routes}
    </Router>
  );
};

Docs.propTypes = {
  history: React.PropTypes.object
};

export default Docs;
