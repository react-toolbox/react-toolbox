import React from 'react';
import Avatar from '../../components/avatar';
import GithubIcon from './github_icon';
import { cold } from 'react-hot-loader';

const ColdAvatar = cold(Avatar)

const AvatarTest = () => (
  <section>
    <h5>Avatars</h5>
    <p>Provide an image source or object, a font icon, children or a title to use its first letter.</p>
    <ColdAvatar style={{ backgroundColor: 'deepskyblue' }} icon="folder" alt="icon folder" />
    <ColdAvatar icon={<GithubIcon />} />
    <ColdAvatar><img src="https://placeimg.com/80/80/animals" alt="foobar" /></ColdAvatar>
    <ColdAvatar image="https://placeimg.com/80/80/animals" alt="foobar" />
    <ColdAvatar
      alt="foobar"
      image="http://www.thewrap.com/wp-content/uploads/2015/08/margot-robbie-harley-quinn_main.jpg" cover
    />
    <ColdAvatar title="Javier" />
    <ColdAvatar style={{ backgroundColor: 'yellowgreen' }}><GithubIcon /></ColdAvatar>
  </section>
);

export default AvatarTest;
