import styled, { css } from 'styled-components';
import { withHandlers } from 'recompose';
import overlayFactory from 'react-toolbox-core/lib/components/Overlay';
import { addPortal, removePortal } from './bodyLocker';
import withOverride from '../utils/withOverride';
import Portal from '../Portal';

const addPortalHandlers = withHandlers({
  onMount: props => event => {
    addPortal();
    if (props.onMount) {
      props.onMount(event);
    }
  },
  onUnmount: props => event => {
    removePortal();
    if (props.onUnmount) {
      props.onUnmount(event);
    }
  },
});

const Overlay = overlayFactory({
  passthrough: ['overrides'],
  BackdropNode: styled.div`
    background-color: rgb(0, 0, 0);
    bottom: 0;
    height: 100%;
    left: 0;
    opacity: 0;
    pointer-events: none;
    position: fixed;
    top: 0;
    transition: opacity 0.35s cubic-bezier(0.4, 0, 0.2, 1);
    width: 100%;
    z-index: -1;

    ${getActiveStyle};
    ${withOverride('BackdropNode')};
  `,
  ContainerNode: styled.div`
    min-height: 100%;
    position: absolute;
    top: 0;
    width: 100%;
    ${withOverride('ContainerNode')};
  `,
  Portal: addPortalHandlers(styled(Portal)`
    align-content: center;
    align-items: center;
    display: flex;
    flex-direction: column;
    height: 100vh;
    justify-content: center;
    left: 0;
    overflow: auto;
    position: fixed;
    top: 0;
    width: 100vw;
    z-index: 200;
    ${withOverride('Portal')};
  `),
});

function getActiveStyle(props) {
  if (props.active) {
    return css`
      opacity: 0.6;
      pointer-events: all;
    `;
  }
}

export default Overlay;
