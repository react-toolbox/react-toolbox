import React from 'react';
import Avatar from '../../components/avatar';
import GithubIcon from './github_icon';

const AvatarTest = () => (
  <section>
    <h5>Avatars</h5>
    <p>Provide an image source or object, a font icon, children or a title to use its first letter.</p>
    <Avatar style={{backgroundColor: 'deepskyblue'}} icon="folder" />
    <Avatar icon={<GithubIcon />}/>
    <Avatar image="https://placeimg.com/80/80/animals" />
    <Avatar title="Javier" img="https://placeimg.com/80/80/animals"/>
    <Avatar style={{backgroundColor: 'yellowgreen'}}><GithubIcon /></Avatar>
  </section>
);

export default AvatarTest;
