import { withRippleFactory } from 'react-toolbox-core';
import RippleNode from './RippleNode';
import RippleWrapper from './RippleWrapper';

export default withRippleFactory({
  passthrough: ['overrides'],
  RippleNode,
  RippleWrapper,
});
