import React from 'react';
import GithubIcon from './github_icon';
import { Button, IconButton } from '../../components/button';

const ButtonTest = () => (
  <section>
    <h5>Buttons</h5>
    <p>lorem ipsum...</p>

    <Button href='http://github.com/javivelasco' target='_blank' raised>
      <GithubIcon /> Github
    </Button>
    <Button icon='bookmark' label='Bookmark' accent />
    <Button icon='bookmark' label='Bookmark' raised primary />
    <Button icon='inbox' label='Inbox' flat />
    <Button icon={<GithubIcon />} label='Github' flat />
    <Button icon='add' floating />
    <Button icon='add' floating primary />
    <Button icon='add' floating primary disabled />
    <Button icon='add' floating accent mini />
    <IconButton icon='favorite' accent />
    <IconButton icon='favorite' inverse />
    <IconButton icon='favorite' />
    <IconButton icon='favorite' disabled />
    <IconButton icon={<GithubIcon />} />
    <IconButton primary><GithubIcon/></IconButton>
    <Button icon='add' label='Add this' flat primary />
    <Button icon='add' label='Add this' flat disabled />
  </section>
);

export default ButtonTest;
