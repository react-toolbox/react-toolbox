import { themr } from 'react-css-themr';
import { SLIDER } from '../identifiers.js';
import { ProgressBar } from '../progress_bar';
import { Input} from '../input';
import { sliderFactory } from './Slider.js';
import theme from './theme.scss';

const ThemedSlider = themr(SLIDER, theme)(sliderFactory(ProgressBar, Input));
export default ThemedSlider;
export { ThemedSlider as Slider };
