import React from 'react';
import Playground from '../../playground';
import code from '../../../examples/example.txt';

const PlaygroundArea = () => {
  return (
    <section>
      <h1>Playground</h1>
      <p>
        lorem ipsum...
      </p>
      <Playground codeText={code} />
    </section>
  );
};

export default PlaygroundArea;
