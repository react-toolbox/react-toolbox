/*eslint-disable no-unused-vars*/
import React from 'react';
import style from 'react-toolbox/commons';
import { Link } from 'react-router';

const Layout = (props) => {
  return (
    <app className={style.app}>
      <h5>React Toolbox</h5>
      <ul>
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/playground">Playground</Link></li>
        <li><Link to="/components">Components</Link></li>
      </ul>
      {props.children}
    </app>
  );
};

export default Layout;
