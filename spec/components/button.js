import React from 'react';
import GithubIcon from './github_icon';
import { Button, IconButton, BrowseButton } from '../../components/button';

const ButtonTest = () => (
  <section>
    <h5>Buttons</h5>
    <p>lorem ipsum...</p>

    <Button href='http://github.com/javivelasco' target='_blank' raised>
      <GithubIcon /> Github
    </Button>
    <Button icon='bookmark' label='Bookmark' accent onRippleEnded={rippleEnded} />
    <Button icon='bookmark' label='Bookmark' raised primary rippleMultiple={false} onRippleEnded={rippleEnded} />
    <Button icon='inbox' label='Inbox' flat />
    <Button icon='add' floating />
    <Button icon='add' floating primary />
    <Button icon='add' floating primary disabled />
    <Button icon='add' floating accent mini />
    <IconButton icon='favorite' accent />
    <IconButton icon='favorite' inverse />
    <IconButton icon='favorite' />
    <IconButton icon='favorite' disabled />
    <IconButton primary><GithubIcon/></IconButton>
    <Button icon='add' label='Add this' flat primary />
    <Button icon='add' label='Add this' flat disabled />
    <h5>Icon Button Alignment</h5>
    <p>
      Icon Buttons should align in the vertical center, to see this we need to
      put them next to text or highlight thier background color.
    </p>
    <IconButton icon='menu' style={{backgroundColor: 'red'}} inverse />
    <span style={{verticalAlign: 'middle'}}>Menu</span>
    <IconButton icon='menu' />
    <span style={{verticalAlign: 'middle'}}>Menu</span>
    <IconButton><GithubIcon /></IconButton>
    <span style={{verticalAlign: 'middle'}}>Github</span>
    <h5>Browse Button</h5>
    <br/>
    <BrowseButton icon='folder_open' label='BROWSE' raised primary />
    &nbsp;
    <BrowseButton label='BROWSE' raised />
</section>
);

function rippleEnded () {
  console.log('Ripple animation ended!');
}

export default ButtonTest;
