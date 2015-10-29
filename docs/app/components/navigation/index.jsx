import React from 'react';
import { Link } from 'react-router';

const Navigation = (props) => {
  return (
    <nav className={props.className}>
      <ul>
        <li><Link to='/components/autocomplete'>Components</Link></li>
        <li><Link to='/playground'>Playground</Link></li>
        <li><a href='http://www.github.com/react-toolbox/react-toolbox' target='_blank'>Github</a></li>
      </ul>
    </nav>
  );
};

export default Navigation;
