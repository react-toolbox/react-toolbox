import React from 'react';
import Playground from '../../playground';
import code from '../../../examples/example.txt';

const PlaygroundArea = () => {
  return (
    <section>
      <p>Here should be the playground</p>
      <Playground codeText={code} />
    </section>
  );
};

export default PlaygroundArea;
