import React from 'react';
import { Link } from 'react-router';

const Navigation = (props) => {
  return (
    <nav className={props.className}>
      <ul>
        <li><Link to='/install'>Installation</Link></li>
        <li><Link to='/components/app_bar'>Components</Link></li>
        <li><a href='http://www.github.com/react-toolbox/react-toolbox' target='_blank'>Github</a></li>
      </ul>
    </nav>
  );
};

export default Navigation;
