import { themr } from 'react-css-themr';
import { LINK } from '../identifiers.js';
import { Link } from './Link.js';
import * as theme from './theme.scss';

const ThemedLink = themr(LINK, theme)(Link);

export default ThemedLink;
export { ThemedLink as Link };
