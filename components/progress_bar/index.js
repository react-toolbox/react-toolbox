import { themr } from 'react-css-themr';
import { PROGRESS_BAR } from '../identifiers';
import { ProgressBar } from './ProgressBar';
import theme from './theme.css';

const ThemedProgressBar = themr(PROGRESS_BAR, theme)(ProgressBar);

export default ThemedProgressBar;
export { ThemedProgressBar as ProgressBar };
