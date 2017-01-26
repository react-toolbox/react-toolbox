import { themr } from 'react-css-themr';
import { SLIDER } from '../identifiers';
import { ProgressBar } from '../progress_bar';
import { Input } from '../input';
import { sliderFactory } from './Slider';
import theme from './theme.css';

const ThemedSlider = themr(SLIDER, theme)(sliderFactory(ProgressBar, Input));
export default ThemedSlider;
export { ThemedSlider as Slider };
