import { themr } from 'react-css-themr';
import { LAYOUT } from '../identifiers';
import { layoutFactory } from './Layout';
import { sidebarFactory } from './Sidebar';
import { navDrawerFactory } from './NavDrawer';
import { Panel } from './Panel';
import { AppBar } from '../app_bar';
import { Drawer } from '../drawer';
import theme from './theme.css';

const injectTheme = component => themr(LAYOUT, theme)(component);
const ThemedNavDrawer = injectTheme(navDrawerFactory(Drawer));
const ThemedSidebar = injectTheme(sidebarFactory(Drawer));
const ThemedPanel = injectTheme(Panel);
const ThemedLayout = injectTheme(layoutFactory(AppBar, ThemedNavDrawer, ThemedSidebar));

export default ThemedLayout;
export { ThemedLayout as Layout };
export { ThemedSidebar as Sidebar };
export { ThemedNavDrawer as NavDrawer };
export { ThemedPanel as Panel };
