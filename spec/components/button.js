import React from 'react';
import withRipple from '../../src/styled-components/withRipple';
import withRipple2 from '../../components/ripple';
import withRipple3 from '../../src/css-modules/withRipple';
import GithubIcon from './github_icon';
import { Button, IconButton, BrowseButton } from '../../components/button';

const RippledDiv = withRipple({ centered: false })('div');
const RippledDiv2 = withRipple2({ centered: false })('div');
const RippledDiv3 = withRipple3({ centered: false })('div');

const ButtonTest = () => (
  <section>
    <h5>Buttons</h5>
    <p>lorem ipsum...</p>

    <RippledDiv style={{ position: 'relative' }}>Hi!</RippledDiv>
    <RippledDiv2 style={{ position: 'relative' }}>Hi!</RippledDiv2>
    <RippledDiv3 style={{ position: 'relative' }}>Hi!</RippledDiv3>
  </section>
);

function rippleEnded() {
  console.log('Ripple animation ended!');
}

export default ButtonTest;
