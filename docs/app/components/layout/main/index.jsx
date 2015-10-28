/*eslint-disable no-unused-vars*/
import React from 'react';
import { AppBar, List, ListItem, ListSubHeader } from 'react-toolbox';
import { Link } from 'react-router';
import Logo from './../../logo';
import Navigation from './../../navigation';
import style from './style';

const Main = (props) => {
  return (
    <div>
      <AppBar className={style.appbar} flat fixed>
        <Link to='/' className={style.brand}>
          <Logo className={style.logo} />
          React Toolbox
        </Link>
        <Navigation className={style.navigation}/>
      </AppBar>

      <div className={style['content-wrapper']}>
        <List className={style.drawer} selectable ripple>
          <ListItem className={style['drawer-option']} caption='AppBar' />
          <ListItem className={style['drawer-option']} caption='Autocomplete' />
          <ListItem className={style['drawer-option']} caption='Button' />
          <ListItem className={style['drawer-option']} caption='Cards' />
        </List>

        <div className={style.content}>
          { props.children }
        </div>
      </div>
    </div>
  );
};

export default Main;
