import React from 'react';
import { FontIcon } from 'react-toolbox/src/components/font_icon';
import Button from 'react-toolbox-css/src/components/Button';
import Github from '../Github';

const ButtonTest = () => (
  <section>
    <h5>Buttons</h5>
    <p>Agnostic + CSS Modules</p>

    <Button href="http://github.com/javivelasco" target="_blank" raised>
      <Github /> Github
    </Button>
    <Button accent>
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

export default ButtonTest;
