import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import FontIcon from 'react-toolbox-sc/lib/FontIcon';
import Avatar from 'react-toolbox-sc/lib/Avatar';
import GithubIcon from './GithubIcon';

class ListExamples extends Component {
  render() {
    return (
      <section>
        <h5>Avatars</h5>
        <p>Provide an image source with a title, or children for example an img, Icon or FontIcon.</p>
        <Avatar style={{ backgroundColor: 'deepskyblue' }}>
          <FontIcon value="folder" />
        </Avatar>
        <Avatar>
          <img src="https://placeimg.com/80/80/animals" alt="This is a test" />
        </Avatar>
        <Avatar image="https://placeimg.com/80/80/animals" alt="This is a test" />
        <Avatar
          alt="foobar"
          image="http://www.thewrap.com/wp-content/uploads/2015/08/margot-robbie-harley-quinn_main.jpg"
          cover
        />
        <Avatar title="Javier" />
        <Avatar
          image="http://www.react-toolbox.com/brokenimage.img"
          title="React Toolbox"
        />
        <Avatar style={{ backgroundColor: 'yellowgreen' }}>
          <GithubIcon />
        </Avatar>
      </section>
    );
  }
}

export default ListExamples;
