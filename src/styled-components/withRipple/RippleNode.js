import styled from 'styled-components';
import withOverride from '../utils/withOverride';

const RippleNode = styled.span`
  background-color: currentColor;
  border-radius: 50%;
  left: 50%;
  pointer-events: none;
  outline: none;
  position: absolute;
  top: 50%;
  transform-origin: 50% 50%;
  transition-duration: 800ms;
  z-index: 100;
  opacity: ${getOpacity}
  transition-property: ${getTransitionProperty};
  ${withOverride('RippleNode')}
`;

function getOpacity(props) {
  return props.restarting || props.active
    ? 0.3
    : 0;
}

function getTransitionProperty(props) {
  if (props.restarting) return 'none';
  return props.active
    ? 'transform'
    : 'opacity, transform';
}

export default RippleNode;
