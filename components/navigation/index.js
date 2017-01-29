import { themr } from 'react-css-themr';
import { NAVIGATION } from '../identifiers';
import { navigationFactory } from './Navigation';
import { Button } from '../button';
import { Link } from '../link';
import theme from './theme.css';

const ThemedNavigation = themr(NAVIGATION, theme)(navigationFactory(Button, Link));
export default ThemedNavigation;
export { ThemedNavigation as Navigation };
