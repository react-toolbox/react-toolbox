import React from 'react';
import styled, { css } from 'styled-components';
import withOverride from '../utils/withOverride';
import withStyled from '../utils/withStyled';

const CardMedia = ({ children, ...other }) => (
  <CardMediaNode {...other}>
    <CardMediaContainerNode>{children}</CardMediaContainerNode>
  </CardMediaNode>
);

const CardMediaNode = styled.div`
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  width: 100%;

  ${props =>
    props.image &&
    css`
    background-image: url("${props.image}");
  `};

  ${props => props.color && css`background-color: ${props.color};`};

  ${props =>
    props.aspectRatio === 'wide' &&
    css`
      &::after {
        padding-top: 56.25%;
      }
    `} ${props =>
      props.aspectRatio === 'square' &&
      css`
        &::after {
          padding-top: 100%;
        }
      `} &::after {
    content: '';
    display: block;
    height: 0;
  }

  ${withOverride('CardMediaNode')};
`;

const CardMediaContainerNode = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  left: 0;
  overflow: hidden;
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;

  & > iframe,
  & > video,
  & > img {
    max-width: 100%;
  }

  ${withOverride('CardMediaContainerNode')};
`;

CardMedia.defaultProps = {
  aspectRatio: 'wide',
};

export default withStyled()(CardMedia);
