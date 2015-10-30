import React from 'react';
import style from './drawer_playground.scss';
import Playground from '../../../playground';
import code from '../../../../examples/example.txt';

class PlaygroundArea extends React.Component {
  render () {
    let className = style.root;
    if (this.props.active) className += ` ${style.active}`;

    return (
      <aside className={className}>
        <Playground codeText={code} layout='vertical' />
      </aside>
    );
  }
}

export default PlaygroundArea;
