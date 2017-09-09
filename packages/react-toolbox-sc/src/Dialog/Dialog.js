import { path } from 'ramda';
import styled, { css } from 'styled-components';
import dialogFactory from 'react-toolbox-core/lib/components/Dialog';
import withActiveMount from 'react-toolbox-core/lib/hoc/withActiveMount';
import withOverride from '../utils/withOverride';
import Overlay from '../Overlay';

export const SIZES = {
  FULLSCREEN: 'fullscreen',
  LARGE: 'large',
  NORMAL: 'normal',
  SMALL: 'small',
};

const Dialog = dialogFactory({
  passthrough: function(props, nodeName) {
    switch (nodeName) {
      case 'Overlay':
        return { overrides: props.overrides };
      case 'WrapperNode': {
        return { overrides: props.overrides, size: props.size };
      }
    }
  },
  Overlay: styled(Overlay)`
    align-items: center;
    display: flex;
    justify-content: center;
    ${withOverride('Overlay')};
  `,
  WrapperNode: styled.div`
    background-color: rgb(255, 255, 255);
    border-radius: 2px;
    box-shadow: 0 19px 60px rgba(0, 0, 0, 0.3), 0 15px 20px rgba(0, 0, 0, 0.22);
    max-height: 96vh;
    max-width: 96vw;
    opacity: 0;
    transform: translateY(-40px);
    transition-delay: ${0.35 / 5}s;
    transition: opacity 0.35s cubic-bezier(0.4, 0, 0.2, 1),
      transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);

    ${getActiveStyle};
    ${getSizeStyle};
    ${withOverride('WrapperNode')};
  `,
});

function getActiveStyle(props) {
  if (props.active) {
    return css`
      opacity: 1;
      transform: translateY(0%);
    `;
  }
}

function getSizeStyle(props) {
  switch (props.size) {
    case SIZES.SMALL:
      return css`
        width: 30vw;

        @media screen and (max-width: 720px) {
          width: 50vw;
        }

        @media screen and (max-width: 600px) {
          width: 75vw;
        }
      `;
    case SIZES.LARGE:
      return css`
        width: 96vw;
      `;
    case SIZES.FULLSCREEN:
      return css`
        width: 96vw;

        @media screen and (max-width: 600px) {
          border-radius: 0;
          max-height: 100vh;
          max-width: 100vw;
          min-height: 100vh;
          width: 100vw;
        }
      `;
    case SIZES.NORMAL:
    default:
      return css`
        width: 50vw;

        @media screen and (max-width: 600px) {
          width: 96vw;
        }
      `;
  }
}

export default withActiveMount({
  delay: 400,
})(Dialog);
