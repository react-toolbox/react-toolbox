import React from 'react';
import Avatar from '../../components/avatar';
import GithubIcon from './github_icon';

const AvatarTest = () => (
  <section>
    <h5>Avatars</h5>
    <Avatar image="https://placeimg.com/80/80/animals" />
    <Avatar title="Javier Velasco" image="https://javivelasco.com/avatar404" />
    <Avatar icon="folder" />
    <Avatar><GithubIcon /></Avatar>
    <Avatar><img src="https://placeimg.com/80/80/animals" /></Avatar>
  </section>
);

export default AvatarTest;
