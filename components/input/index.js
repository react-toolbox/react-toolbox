import { INPUT } from '../identifiers.js';
import { themr } from 'react-css-themr';
import { inputFactory } from './Input.js';
import FontIcon from '../font_icon/FontIcon.js';
import theme from './theme.scss';

const Input = inputFactory(FontIcon);
const ThemedInput = themr(INPUT, theme, { withRef: true })(Input);

export default ThemedInput;
export { ThemedInput as Input };
