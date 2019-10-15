import { themr } from 'react-css-themr';
import { OVERLAY } from '../identifiers';
import { Overlay } from './Overlay';
import theme from './theme.module.css';

const ThemedOverlay = themr(OVERLAY, theme)(Overlay);
export default ThemedOverlay;
export { ThemedOverlay as Overlay };
