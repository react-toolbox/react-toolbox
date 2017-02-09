import { themr } from 'react-css-themr';
import buttonFactory from '../../core/components/Button';
import withRippleFactory from '../../core/hoc/withRipple';
import RippleNode from '../withRipple/RippleNode';
import RippleWrapper from '../withRipple/RippleWrapper';
import createComponent from '../utils/createComponent';
import getNamespacedTheme from '../utils/getNamespacedTheme';
import ButtonNode from './ButtonNode';
import LinkNode from './LinkNode';
import theme from './Button.css';

export default themr('RTButton', theme)(buttonFactory({
  passthrough: ['theme'],
  LinkNode,
  ButtonNode,
  ripple: withRippleFactory({
    passthrough: props => ({
      floating: props.floating,
      theme: getNamespacedTheme('ripple', props.theme),
    }),
    RippleNode: createComponent(RippleNode, {
      modifiers: ['floating'],
    }),
    RippleWrapper: createComponent(RippleWrapper, {
      modifiers: ['floating'],
    }),
  })(),
}));
