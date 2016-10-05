import { themr } from 'react-css-themr';
import { PAGER } from '../identifiers.js';
import { pagerFactory } from './pager.js';
import { Button } from '../button';
import theme from './theme.scss';

const Pager = pagerFactory(Button);

const ThemedPager = themr(PAGER, theme)(Pager);
export default ThemedPager;
export { ThemedPager as Pager };
