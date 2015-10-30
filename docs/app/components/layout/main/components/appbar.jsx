import React from 'react';
import { AppBar, Button } from 'react-toolbox';
import { Link } from 'react-router';
import Logo from '../../../logo';
import Navigation from '../../../navigation';
// import PlaygroundArea from '../playground_area';
import style from './appbar.scss';

class MainAppBar extends React.Component {
  handlerPlayGroundClick = () => {
    // this.refs.playground.show();
  }

  render () {
    return (
      <AppBar className={style.appbar} flat fixed>
        <Link to='/'>
          <Logo className={style.logo} />
        </Link>
        <Navigation className={style.navigation}/>
        <Button
          accent
          className={style['playground-button']}
          icon='code'
          kind='floating'
          onClick={this.handlerPlayGroundClick}
        />
      </AppBar>
    );
  }
}

export default MainAppBar;
