import tooltipFactory from './Tooltip';
import theme from './theme.module.css';

const themedTooltipFactory = options => tooltipFactory({ ...options, theme });
export default tooltipFactory({ theme });
export { themedTooltipFactory as tooltipFactory };
