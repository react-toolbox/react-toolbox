import React from 'react';
import { createRenderer } from 'fela';
import { Provider } from 'react-fela';
import ButtonExamples from './ButtonExamples';

const mountNode = document.getElementById('stylesheet');
const renderer = createRenderer({ selectorPrefix: 'rt' });

const Fela = () => (
  <Provider renderer={renderer} mountNode={mountNode}>
    <div>
      <ButtonExamples />
    </div>
  </Provider>
);

export default Fela;
