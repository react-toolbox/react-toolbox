import React from 'react';
import Button from '../../components/button';
import Drawer from '../../components/drawer';

export default class DrawerTest extends React.Component {
  onClick (ref, method) {
    this.refs[ref][method]();
  }

  render () {
    return (
      <section>
        <h5>Drawer</h5>
        <p>You can navigate using a drawer to the left or right. They can be auto-closable or not.</p>

        <Drawer ref='left' hideable={true}>
          <h5>Officia deserunt mollit.</h5>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </Drawer>

        <Drawer ref='right' type='right'>
          <Button label='Close' onClick={::this.onClick('right', 'hide')} />
        </Drawer>

        <nav>
          <Button className='accent' label='Drawer left hideable' type='raised' onClick={::this.onClick('left', 'show')} />
          <Button className='primary' label='Drawer right' type='raised' onClick={::this.onClick('right', 'show')} />
        </nav>
      </section>
    );
  }
};
