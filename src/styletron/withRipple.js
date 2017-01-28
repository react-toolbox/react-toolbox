import { styled } from 'styletron-react';
import withRippleFactory from '../core/withRipple/withRipple';

const RippleNode = styled('span', props => ({
  backgroundColor: 'currentColor',
  borderRadius: '50%',
  left: '50%',
  pointerEvents: 'none',
  position: 'absolute',
  top: '50%',
  transformOrigin: '50% 50%',
  transitionDuration: '800ms',
  zIndex: 100,
  opacity: (props.restarting || props.active) ? 0.3 : 0,
  transitionProperty: !props.restarting
    ? (props.active ? 'transform' : 'opacity, transform')
    : 'none',
}));

const RippleWrapper = styled('span', () => ({
  bottom: 0,
  display: 'block',
  left: 0,
  pointerEvents: 'none',
  position: 'absolute',
  right: 0,
  top: 0,
  zIndex: 1,
}));

const withRipple = withRippleFactory({ RippleNode, RippleWrapper });
export default withRipple;
