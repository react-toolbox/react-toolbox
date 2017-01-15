import tooltipFactory from './Tooltip.js';
import theme from './theme.css';

const themedTooltipFactory = (options) => tooltipFactory({ ...options, theme });
export default tooltipFactory({ theme });
export { themedTooltipFactory as tooltipFactory };
