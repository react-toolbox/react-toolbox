import React from 'react';
import Playground from '../../playground';
import code from '../../../examples/example.txt';

const PlaygroundArea = () => {
  return (
    <section>
      <Playground codeText={code} layout='horizontal'/>
    </section>
  );
};

export default PlaygroundArea;
