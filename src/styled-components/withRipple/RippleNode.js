import styled from 'styled-components';

const RippleNode = styled.span`
  background-color: currentColor;
  border-radius: 50%;
  left: 50%;
  pointer-events: none;
  position: absolute;
  top: 50%;
  transform-origin: 50% 50%;
  transition-duration: 800ms;
  z-index: 100;
  opacity: ${props => (props.restarting || props.active) ? 0.3 : 0}
  transition-property: ${props => props.restarting
    ? 'none' : (props.active ? 'transform' : 'opacity, transform')};
`;

export default RippleNode;
