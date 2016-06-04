import { themr } from 'react-css-themr';
import { SNACKBAR } from '../identifiers.js';
import { snackbarFactory } from './Snackbar.js';
import { Overlay } from '../overlay';
import { Button } from '../button';
import theme from './theme.scss';

const ThemedSnackbar = themr(SNACKBAR, theme)(snackbarFactory(Overlay, Button));

export default ThemedSnackbar;
export { ThemedSnackbar as Snackbar };
