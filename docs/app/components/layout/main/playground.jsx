/*eslint-disable no-unused-vars*/
import React from 'react';
import Playground from '../../playground';
import code from '../../../examples/example.txt';
import style from './style';

const PlaygroundArea = () => {
  return (
    <section className={style.documentation}>
      <h1>Playground</h1>
      <p>
        lorem ipsum...
      </p>
      <Playground codeText={code} />
    </section>
  );
};

export default PlaygroundArea;
