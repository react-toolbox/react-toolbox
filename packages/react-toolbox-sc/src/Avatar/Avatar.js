import avatarFactory from 'react-toolbox-core/lib/components/Avatar';
import styled, { css } from 'styled-components';
import withStyled from '../utils/withStyled';

const Avatar = avatarFactory({
  WrapperNode: styled.div`
    background-color: rgb(158, 158, 158);
    border-radius: 50%;
    color: rgb(255, 255, 255);
    display: inline-flex;
    font-size: 24px;
    height: 40px;
    overflow: hidden;
    position: relative;
    text-align: center;
    align-items: center;
    justify-content: center;
    vertical-align: middle;
    width: 40px;

    & > img {
      display: inline-block;
      height: auto;
      max-width: 100%;
    }

    & > svg {
      fill: currentColor;
      height: 40px;
      width: 1em;
    }

    ${props =>
      props.cover &&
      props.image &&
      css`
        background-color: transparent;
        background-image: url(${props.image});
        background-position: center;
        background-size: cover;
      `};
  `,
  ImgNode: styled.img`
    display: inline-block;
    height: auto;
    max-width: 100%;

    ${props => props.cover && css`visibility: hidden;`};
  `,
});

export default withStyled()(Avatar);
