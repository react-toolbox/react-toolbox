import styled from 'styled-components';
import { withHandlers } from 'recompose';
import overlayFactory from 'react-toolbox-core/lib/components/Overlay';
import { addPortal, removePortal } from './bodyLocker';
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
  }
})

const Overlay = overlayFactory({
  passthrough: ['overrides'],
  BackdropNode: styled.div`
    background-color: #000;
    height: 100%;
    left: 0;
    opacity: ${props => (props.active ? 0.7 : 0)};
    position: absolute;
    top: 0;
    transition-delay: ${props => (props.active ? '0' : '100ms')};
    transition: opacity 200ms ease-in-out;
    width: 100%;
    z-index: -1;
  `,
  ContainerNode: styled.div`
    min-height: 100%;
    pointer-events: ${props => (props.active ? 'all' : 'none')};
    position: absolute;
    top: 0;
    width: 100%;
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
  `),
});

export default Overlay;
