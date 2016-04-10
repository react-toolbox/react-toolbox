import React from 'react';
import Button from '../../components/button';
import Drawer from '../../components/drawer';

class DrawerTest extends React.Component {
  state = {
    leftActive: false,
    rightActive: false
  };

  handleToggleLeft = () => {
    this.setState({leftActive: !this.state.leftActive});
  };

  handleToggleRight = () => {
    this.setState({rightActive: !this.state.rightActive});
  };

  render () {
    return (
      <section>
        <h5>Drawer</h5>
        <p>You can navigate using a drawer to the left or right.</p>

        <Drawer active={this.state.leftActive} onOverlayClick={this.handleToggleLeft}>
          <h5>Officia deserunt mollit.</h5>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </Drawer>

        <Drawer active={this.state.rightActive} type='right'>
          <Button primary label='Close' onClick={this.handleToggleRight} />
        </Drawer>

        <nav>
          <Button label='Drawer left' raised primary onClick={this.handleToggleLeft} />
          <Button label='Drawer right' raised accent onClick={this.handleToggleRight} />
        </nav>
      </section>
    );
  }
}

export default DrawerTest;
