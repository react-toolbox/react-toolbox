import rippleFactory from './Ripple';
import theme from './theme.module.css';

export const Ripple = (options) => rippleFactory({ ...options, theme });
export default Ripple;
