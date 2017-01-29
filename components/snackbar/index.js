import { themr } from 'react-css-themr';
import { SNACKBAR } from '../identifiers';
import { snackbarFactory } from './Snackbar';
import { Button } from '../Button';
import theme from './theme.css';

const ThemedSnackbar = themr(SNACKBAR, theme)(snackbarFactory(Button));

export default ThemedSnackbar;
export { ThemedSnackbar as Snackbar };
