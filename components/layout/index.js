import { themr } from 'react-css-themr';
import { LAYOUT } from '../identifiers';
import { Layout } from './Layout';
import { Panel } from './Panel';
import { NavDrawer } from './NavDrawer';
import { Sidebar } from './Sidebar';
import theme from './theme.scss';

const ThemedLayout = themr(LAYOUT, theme)(Layout);
const ThemedPanel = themr(LAYOUT, theme)(Panel);
const ThemedNavDrawer = themr(LAYOUT, theme)(NavDrawer);
const ThemedSidebar = themr(LAYOUT, theme)(Sidebar);

export { ThemedLayout as Layout };
export { ThemedPanel as Panel };
export { ThemedNavDrawer as NavDrawer };
export { ThemedSidebar as Sidebar };
