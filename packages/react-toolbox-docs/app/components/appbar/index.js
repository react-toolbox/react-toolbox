import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { AppBar } from 'react-toolbox/lib/app_bar';
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
  className: PropTypes.string
};

MainAppBar.defaultProps = {
  className: ''
};

export default MainAppBar;
