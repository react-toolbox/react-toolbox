import { createComponent } from 'react-fela';
import buttonFactory from 'react-toolbox-core/lib/components/Button';
import withRippleFactory from 'react-toolbox-core/lib/hoc/withRipple';
import RippleNode from '../withRipple/RippleNode';
import RippleWrapper from '../withRipple/RippleWrapper';
import getFilterProps from '../utils/getFilterProps';
import withOverrides from '../utils/withOverrides';
import ButtonNode from './ButtonNode';
import LinkNode from './LinkNode';

export default buttonFactory({
  passthrough: ['overrides', 'floating'],
  ButtonNode,
  LinkNode,
  ripple: withRippleFactory({
    passthrough,
    RippleNode,
    RippleWrapper: createComponent(withOverrides('RippleWrapper', props => ({
      borderRadius: props.floating ? '50px' : '2px',
      overflow: 'hidden',
    })), RippleWrapper, getFilterProps(['floating'])),
  })(),
});

function passthrough(props, name) {
  if (name === 'RippleWrapper') {
    return {
      overrides: props.overrides,
      floating: props.floating,
    };
  }

  return undefined;
}
