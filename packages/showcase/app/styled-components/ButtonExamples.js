import React from 'react';
import { css } from 'styled-components';
import { FontIcon } from 'react-toolbox/src/components/font_icon';
import Button from 'react-toolbox-sc/src/Button';
import Github from '../Github';

const ButtonTest = () => (
  <section>
    <h5>Buttons</h5>
    <p>Agnostic + Styled Components</p>

    <Button href="http://github.com/javivelasco" target="_blank" raised>
      <Github /> Github
    </Button>
    <Button accent ben onRippleEnded={rippleEnded} overrides={overrides}>
      <FontIcon value="bookmark" />
      Bookmark
    </Button>
    <Button raised primary rippleMultiple={false} onRippleEnded={rippleEnded}>
      <FontIcon value="bookmark" />
      Bookmark
    </Button>
    <Button flat>
      <FontIcon value="inbox" />
      Inbox
    </Button>
    <Button floating><FontIcon value="add" /></Button>
    <Button floating primary><FontIcon value="add" /></Button>
    <Button
      href="http://github.com/javivelasco"
      target="_blank"
      floating
      accent
    >
      <FontIcon value="link" />
    </Button>
    <Button floating primary disabled><FontIcon value="add" /></Button>
    <Button floating accent mini><FontIcon value="add" /></Button>
    <Button flat primary>
      <FontIcon value="add" />
      Add this
    </Button>
    <Button flat disabled>
      <FontIcon value="add" />
      Add this
    </Button>
  </section>
);

const overrides = {
  RippleWrapper: css`
    overflow: visible;
  `,
  RippleNode: css`
    border-radius: 0;
  `,
  ButtonNode: css`
    color: ${props => props.ben && 'green'};
    &:hover {
      background-color: orange;
    }
  `,
};

function rippleEnded() {
  console.log('Ripple animation ended!'); // eslint-disable-line
}

export default ButtonTest;
