import rippleFactory from './Ripple';
import theme from './theme.css';

export const Ripple = (options) => rippleFactory({ ...options, theme });
export default Ripple;
