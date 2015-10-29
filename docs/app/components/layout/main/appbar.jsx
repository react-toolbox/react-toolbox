import React from 'react';
import { AppBar } from 'react-toolbox';
import { Link } from 'react-router';
import Logo from '../../logo';
import Navigation from '../../navigation';
import style from './style';

const MainAppBar = () => {
  return (
    <AppBar className={style.appbar} flat fixed>
      <Link to='/' className={style.brand}>
        <Logo className={style.logo} /> React Toolbox
      </Link>
      <Navigation className={style.navigation}/>
    </AppBar>
  );
};

export default MainAppBar;

