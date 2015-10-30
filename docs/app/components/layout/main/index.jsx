import React from 'react';
import { AppBar, Button } from 'react-toolbox';
import Appbar from './components/appbar';
import DrawerComponents from './components/drawer_components';
import DrawerPlayground from './components/drawer_playground';
import style from './style';

class Main extends React.Component {

  state = {
    playground: false
  };

  handlerPlayGroundClick = () => {
    this.setState({ playground: !this.state.playground})
  }

  render () {
    console.log('aaa', this.state.playground);
    return (
      <div>
        <Appbar />
        <Button
          accent
          className={style.playground_button}
          icon={this.state.playground ? 'close' : 'code'}
          kind='floating'
          onClick={this.handlerPlayGroundClick}
        />
        <section className={style.content}>
          <DrawerComponents active={!this.state.playground}/>
          { this.props.children }
          <DrawerPlayground active={this.state.playground} />
        </section>
      </div>
    );
  }
}
export default Main;
