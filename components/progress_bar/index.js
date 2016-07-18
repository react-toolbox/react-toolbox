import { themr } from 'react-css-themr';
import { PROGRESS_BAR } from '../identifiers.js';
import { ProgressBar } from './ProgressBar.js';
import theme from './theme.css';

const ThemedProgressBar = themr(PROGRESS_BAR, theme)(ProgressBar);

export default ThemedProgressBar;
export { ThemedProgressBar as ProgressBar };
