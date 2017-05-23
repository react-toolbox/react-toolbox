import React from 'react';
import { FontIcon } from 'react-toolbox/src/components/font_icon';
import Button from 'react-toolbox-fela/src/Button';
import Github from '../Github';

const ButtonExamples = () => (
  <section>
    <h5>Buttons</h5>
    <p>Agnostic + Fela</p>

    <Button href="http://github.com/javivelasco" target="_blank" raised>
      <Github /> Github
    </Button>
    <Button accent overrides={overrides}>
      <FontIcon value="bookmark" />
      Bookmark
    </Button>
    <Button raised primary rippleMultiple={false}>
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
  RippleNode: props => ({
    backgroundColor: props.primary ? 'green' : 'black',
  }),
};

export default ButtonExamples;
