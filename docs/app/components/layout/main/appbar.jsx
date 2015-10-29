import React from 'react';
import { AppBar, Button } from 'react-toolbox';
import { Link } from 'react-router';
import Logo from '../../logo';
import Navigation from '../../navigation';
import PlaygroundArea from './playground_area';
import style from './appbar.scss';

class MainAppBar extends React.Component {
  handlerPlayGroundClick = () => {
    this.refs.playground.show();
  }

  render () {
    return (
      <AppBar className={style.appbar} flat fixed>
        <Link to='/' className={style.brand}>
          <Logo className={style.logo} /> React Toolbox
        </Link>
        <Navigation className={style.navigation}/>
        <Button
          accent
          className={style['playground-button']}
          icon='code'
          kind='floating'
          onClick={this.handlerPlayGroundClick}
        />
        <PlaygroundArea ref='playground' />
      </AppBar>
    );
  }
}

export default MainAppBar;
