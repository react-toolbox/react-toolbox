import React from 'react';
import style from './style';

const App = ({className, children}) => (
  <div data-react-toolbox='app' className={`${style.root} ${className}`}>
    {children}
  </div>
);

App.propTypes = {
  children: React.PropTypes.node,
  className: React.PropTypes.string
};

App.defaultProps = {
  className: ''
};

export default App;
