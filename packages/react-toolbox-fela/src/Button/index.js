import { createComponent } from 'react-fela';
import { buttonFactory, withRippleFactory } from 'react-toolbox-core';
import RippleNode from '../withRipple/RippleNode';
import RippleWrapper from '../withRipple/RippleWrapper';
import getFilterProps from '../utils/getFilterProps';
import withOverrides from '../utils/withOverrides';
import ButtonNode from './ButtonNode';
import LinkNode from './LinkNode';

const Button = buttonFactory({
  passthrough: ['overrides', 'floating'],
  ButtonNode,
  LinkNode,
});

const withRipple = withRippleFactory({
  passthrough: function passthrough(props, name) {
    if (name === 'RippleWrapper') {
      return {
        overrides: props.overrides,
        floating: props.floating,
      };
    }
    return {};
  },
  RippleNode,
  RippleWrapper: createComponent(withOverrides('RippleWrapper', props => ({
    borderRadius: props.floating ? '50px' : '2px',
    overflow: 'hidden',
  })), RippleWrapper, getFilterProps(['floating'])),
});

export default withRipple()(Button);
