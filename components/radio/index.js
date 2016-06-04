import { themr } from 'react-css-themr';
import { RADIO } from '../identifiers.js';
import themedRippleFactory from '../ripple';
import radioFactory from './Radio.js';
import { radioButtonFactory } from './RadioButton.js';
import { radioGroupFactory } from './RadioGroup.js';
import theme from './theme.scss';

const ThemedRadio = radioFactory(themedRippleFactory({ centered: true, spread: 2.6}));
const ThemedRadioButton = themr(RADIO, theme)(radioButtonFactory(ThemedRadio));
const ThemedRadioGroup = themr(RADIO, theme)(radioGroupFactory(ThemedRadioButton));

export default ThemedRadioButton;
export { ThemedRadioButton as RadioButton };
export { ThemedRadioGroup as RadioGroup };
