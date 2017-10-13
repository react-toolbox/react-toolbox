import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router';

const Navigation = (props) => {
  return (
    <nav className={props.className}>
      <ul>
        <li><Link activeClassName={props.activeClassName} to='/install'>Installation</Link></li>
        <li><Link activeClassName={props.activeClassName} to='/components'>Components</Link></li>
        <li><a href='http://www.github.com/react-toolbox/react-toolbox' target='_blank'>Github</a></li>
      </ul>
    </nav>
  );
};

Navigation.propTypes = {
  activeClassName: PropTypes.string,
  className: PropTypes.string
};


Navigation.defaultProps = {
  activeClassName: '',
  className: ''
};

export default Navigation;
