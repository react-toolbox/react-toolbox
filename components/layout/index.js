import { themr } from 'react-css-themr';
import { LAYOUT } from '../identifiers.js';
import { Layout } from './Layout.js';
import { Panel } from './Panel.js';
import { NavDrawer } from './NavDrawer.js';
import { Sidebar } from './Sidebar.js';
import theme from './theme.scss';

const ThemedLayout = themr(LAYOUT, theme)(Layout);
const ThemedPanel = themr(LAYOUT, theme)(Panel);
const ThemedNavDrawer = themr(LAYOUT, theme)(NavDrawer);
const ThemedSidebar = themr(LAYOUT, theme)(Sidebar);

export { ThemedLayout as Layout };
export { ThemedPanel as Panel };
export { ThemedNavDrawer as NavDrawer };
export { ThemedSidebar as Sidebar };
