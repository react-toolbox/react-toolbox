import withRippleFactory from 'react-toolbox-core/lib/hoc/withRipple';
import RippleNode from './RippleNode';
import RippleWrapper from './RippleWrapper';

export default withRippleFactory({
  passthrough: ['overrides'],
  RippleNode,
  RippleWrapper,
});
