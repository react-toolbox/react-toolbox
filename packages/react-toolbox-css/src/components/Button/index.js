import { themr } from 'react-css-themr';
import { buttonFactory, withRippleFactory } from 'react-toolbox-core';
import RippleNode from '../../hoc/withRipple/RippleNode';
import RippleWrapper from '../../hoc/withRipple/RippleWrapper';
import createComponent from '../../utils/createComponent';
import getNamespacedTheme from '../../utils/getNamespacedTheme';
import ButtonNode from './ButtonNode';
import LinkNode from './LinkNode';
import theme from './Button.css';

const Button = buttonFactory({
  passthrough: ['theme'],
  LinkNode,
  ButtonNode,
});

const withRipple = withRippleFactory({
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
})

export default themr('RTButton', theme)(
  withRipple()(Button)
);
