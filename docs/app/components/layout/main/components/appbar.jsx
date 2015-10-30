import React from 'react';
import { AppBar } from 'react-toolbox';
import { Link } from 'react-router';
import Logo from '../../../logo';
import Navigation from '../../../navigation';
import style from './appbar.scss';

class MainAppBar extends React.Component {

  render () {
    return (
      <AppBar className={style.appbar} flat fixed>
        <Link to='/'>
          <Logo className={style.logo} />
        </Link>
        <Navigation className={style.navigation}/>
      </AppBar>
    );
  }
}

export default MainAppBar;
