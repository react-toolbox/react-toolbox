/*eslint-disable no-unused-vars*/
import React from 'react';
import code from '../examples/example.txt';
import Playground from '../components/playground';

const Components = () => {
  return (
    <section>
      <p>Here should be the playground</p>
      <Playground codeText={code} />
    </section>
  );
};

export default Components;
