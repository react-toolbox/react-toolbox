import React from 'react';
import { Button, Drawer } from 'react-toolbox';
import style from './drawer_playground.scss';
import Playground from '../../playground';
import code from '../../../../examples/example.txt';

class PlaygroundArea extends React.Component {
  render () {
    return (
      <Drawer className={style.drawer} ref='drawer' type='right'>
        <Button label='Close' onClick={this.hide} />
        <Playground codeText={code} layout='vertical' />
      </Drawer>
    );
  }

  show = () => {
    this.refs.drawer.show();
  };

  hide = () => {
    this.refs.drawer.hide();
  };
}

export default PlaygroundArea;
