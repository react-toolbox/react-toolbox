import { themr } from 'react-css-themr';
import { INPUT } from '../identifiers';
import { inputFactory } from './Input';
import { FontIcon } from '../font_icon/FontIcon';
import theme from './theme.scss';

const Input = inputFactory(FontIcon);
const ThemedInput = themr(INPUT, theme, { withRef: true })(Input);

export default ThemedInput;
export { ThemedInput as Input };
