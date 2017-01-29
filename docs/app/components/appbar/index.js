import React from 'react';
import { AppBar } from 'react-toolbox';
import { Link } from 'react-router';
import Logo from '../logo';
import Navigation from '../navigation';
import style from './style.css';

const MainAppBar = (props) => {
  let className = style.appbar;
  if (props.className) className += ` ${props.className}`;

  return (
    <AppBar className={className} flat fixed>
      <Link to="/">
        <Logo className={style.logo} />
      </Link>
      <Navigation activeClassName={style.active} className={style.navigation} />
    </AppBar>
  );
};

MainAppBar.propTypes = {
  className: React.PropTypes.string
};

MainAppBar.defaultProps = {
  className: ''
};

export default MainAppBar;
