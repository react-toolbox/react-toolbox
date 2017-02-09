import { createComponent } from 'react-fela';
import buttonFactory from '../../core/components/Button';
import withRippleFactory from '../../core/hoc/withRipple';
import RippleNode from '../withRipple/RippleNode';
import RippleWrapper from '../withRipple/RippleWrapper';
import withOverrides from '../utils/withOverrides';
import ButtonNode from './ButtonNode';
import LinkNode from './LinkNode';

export default buttonFactory({
  passthrough: ['overrides', 'floating'],
  ButtonNode,
  LinkNode,
  ripple: withRippleFactory({
    passthrough: ['overrides', 'floating'],
    RippleNode,
    RippleWrapper: createComponent(withOverrides('RippleWrapper', props => ({
      borderRadius: props.floating ? '50px' : '2px',
      overflow: 'hidden',
    })), RippleWrapper),
  })(),
});
