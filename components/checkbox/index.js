import { themr } from 'react-css-themr';
import { CHECKBOX } from '../identifiers.js';
import themedRippleFactory from '../ripple';
import { checkboxFactory } from './Checkbox.js';
import checkFactory from './Check.js';
import theme from './theme.scss';

const ThemedCheck = checkFactory(themedRippleFactory({ centered: true, spread: 2.6}));
const ThemedCheckbox = themr(CHECKBOX, theme)(checkboxFactory(ThemedCheck));

export default ThemedCheckbox;
export { ThemedCheckbox as Checkbox };
