import { BUTTON } from '../identifiers.js';
import { themr } from 'react-css-themr';
import { buttonFactory } from './Button.js';
import { iconButtonFactory } from './IconButton.js';
import FontIcon from '../font_icon/FontIcon.js';
import themedRippleFactory from '../ripple';
import theme from './theme.scss';

const Button = buttonFactory(themedRippleFactory({ centered: false }), FontIcon);
const IconButton = iconButtonFactory(themedRippleFactory({centered: true}), FontIcon);
const ThemedButton = themr(BUTTON, theme)(Button);
const ThemedIconButton = themr(BUTTON, theme)(IconButton);

export default ThemedButton;
export { ThemedButton as Button };
export { ThemedIconButton as IconButton };
