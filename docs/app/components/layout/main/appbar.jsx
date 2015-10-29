import React from 'react';
import { AppBar, Button } from 'react-toolbox';
import { Link } from 'react-router';
import Logo from '../../logo';
import Navigation from '../../navigation';
import style from './style';

const handlerPlayGroundClick = (event) => {
  window.location = '/#/playground';
};

const MainAppBar = () => {
  return (
    <AppBar className={style.appbar} flat fixed>
      <Link to='/' className={style.brand}>
        <Logo className={style.logo} /> React Toolbox
      </Link>
      <Navigation className={style.navigation}/>
      <Button accent className={style.playground_button} icon='code' kind='floating' onClick={handlerPlayGroundClick} />
    </AppBar>
  );
};

export default MainAppBar;
