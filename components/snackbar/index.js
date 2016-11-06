import { themr } from 'react-css-themr';
import { SNACKBAR } from '../identifiers';
import { snackbarFactory } from './Snackbar';
import { Overlay } from '../overlay';
import { Button } from '../button';
import theme from './theme.scss';

const ThemedSnackbar = themr(SNACKBAR, theme)(snackbarFactory(Overlay, Button));

export default ThemedSnackbar;
export { ThemedSnackbar as Snackbar };
