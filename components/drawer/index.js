import { themr } from 'react-css-themr';
import { DRAWER } from '../identifiers';
import { Overlay } from '../overlay';
import { drawerFactory } from './Drawer';
import theme from './theme.css';

const Drawer = drawerFactory(Overlay);
const ThemedDrawer = themr(DRAWER, theme)(Drawer);

export default ThemedDrawer;
export { ThemedDrawer as Drawer };
