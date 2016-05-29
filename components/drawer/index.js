import { themr } from 'react-css-themr';
import { DRAWER } from '../identifiers.js';
import { Overlay } from '../overlay';
import { drawerFactory } from './Drawer.js';
import theme from './theme.scss';

const Drawer = drawerFactory(Overlay);
const ThemedDrawer = themr(DRAWER, theme)(Drawer);

export default ThemedDrawer;
export { ThemedDrawer as Drawer };
