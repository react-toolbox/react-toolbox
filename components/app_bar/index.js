import { themr } from 'react-css-themr';
import { AppBar } from './AppBar.js';
import { APP_BAR } from '../identifiers.js';
import theme from './theme.scss';

const ThemedAppBar = themr(APP_BAR, theme)(AppBar);

export default ThemedAppBar;
export { ThemedAppBar as AppBar };
