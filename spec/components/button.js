import React from 'react';
import { createRenderer } from 'fela';
import { Provider } from 'react-fela';
import Styletron from 'styletron-client';
import { StyletronProvider } from 'styletron-react';

import withRipple from '../../src/styled-components/withRipple';
import withRipple2 from '../../components/ripple';
import withRipple3 from '../../src/css-modules/withRipple';
import withRipple4 from '../../src/fela/withRipple';
import withRipple5 from '../../src/styletron/withRipple';
import withRipple6 from '../../src/styled-jsx/withRipple';
import Button from '../../src/styled-components/Button';

const renderer = createRenderer({
  selectorPrefix: 'x',
});
const mountNode = document.getElementById('stylesheet');
const RippledDiv = withRipple({ centered: false })('div');
const RippledDiv2 = withRipple2({ passthrough: false, centered: false })('div');
const RippledDiv3 = withRipple3({ centered: false })('div');
const RippledDiv4 = withRipple4({ centered: false })('div');
const RippledDiv5 = withRipple5({ centered: false })('div');
const RippledDiv6 = withRipple6({ centered: false })('div');

const style = { border: '1px solid orange', position: 'relative', height: '60px', width: '200px' };
const styleElements = document.getElementsByClassName('_styletron_hydrate_');

const ButtonTest = () => (
  <StyletronProvider styletron={new Styletron(styleElements)}>
    <Provider renderer={renderer} mountNode={mountNode}>
      <section>
        <h5>Ripples</h5>
        <Button>This is styled!</Button>

        <p style={{ marginBottom: 20 }}>Same core implementation, 5 different styling libraries:</p>
        <RippledDiv2 style={style}>Classic React Toolbox</RippledDiv2>
        <RippledDiv style={style}>Styled Components</RippledDiv>
        <RippledDiv4 style={style}>Fela</RippledDiv4>
        <RippledDiv5 style={style}>Styletron</RippledDiv5>
        <RippledDiv6 style={style}>Styled JSX</RippledDiv6>
      </section>
    </Provider>
  </StyletronProvider>
);

export default ButtonTest;
