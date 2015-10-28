/*eslint-disable no-unused-vars*/
import React from 'react';
import { AppBar } from 'react-toolbox';
import { Link } from 'react-router';
import Logo from './../../logo';
import Navigation from './../../navigation';
import style from './style';

const Main = (props) => {
  return (
    <div>
      <AppBar className={style.appbar}>
        <Link to='/' className={style.brand}>
          <Logo className={style.logo} />
          React Toolbox
        </Link>
        <Navigation className={style.navigation}/>
      </AppBar>

      { props.children }
    </div>
  );
};

export default Main;
