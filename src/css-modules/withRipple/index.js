import withRippleFactory from '../../core/withRipple/withRipple';
import RippleNode from './RippleNode';
import RippleWrapper from './RippleWrapper';

const withRipple = withRippleFactory({ RippleNode, RippleWrapper });
export default withRipple;
