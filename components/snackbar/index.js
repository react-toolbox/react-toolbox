import { themr } from 'react-css-themr';
import { SNACKBAR } from '../identifiers.js';
import { snackbarFactory } from './Snackbar.js';
import { Button } from '../button';
import theme from './theme.css';

const ThemedSnackbar = themr(SNACKBAR, theme)(snackbarFactory(Button));

export default ThemedSnackbar;
export { ThemedSnackbar as Snackbar };
