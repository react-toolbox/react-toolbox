import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const Navigation = props => (
  <nav className={props.className}>
    <ul>
      <li><NavLink activeClassName={props.activeClassName} to="/install">Installation</NavLink></li>
      <li><NavLink activeClassName={props.activeClassName} to="/components">Components</NavLink></li>
      <li><a href="http://www.github.com/react-toolbox/react-toolbox" target="_blank">GitHub</a></li>
    </ul>
  </nav>
);

Navigation.propTypes = {
  activeClassName: PropTypes.string,
  className: PropTypes.string
};


Navigation.defaultProps = {
  activeClassName: '',
  className: ''
};

export default Navigation;
