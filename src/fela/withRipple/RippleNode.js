import { createComponent } from 'react-fela';

const RippleNode = createComponent(props => ({
  backgroundColor: 'currentColor',
  borderRadius: '50%',
  left: '50%',
  opacity: getOpacity(props),
  pointerEvents: 'none',
  position: 'absolute',
  top: '50%',
  transformOrigin: '50% 50%',
  transitionDuration: '800ms',
  transitionProperty: getTransitionProperty(props),
  zIndex: 100,
}), 'span');

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
