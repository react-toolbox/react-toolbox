import { createComponent } from 'react-fela';

const RippleNode = createComponent(() => ({
  bottom: 0,
  display: 'block',
  left: 0,
  pointerEvents: 'none',
  position: 'absolute',
  right: 0,
  top: 0,
  zIndex: 1,
}), 'span');

export default RippleNode;
