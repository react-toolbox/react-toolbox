import { themr } from 'react-css-themr';
import { MENU } from '../identifiers';
import { IconButton } from '../button';
import { MenuDivider } from './MenuDivider';
import { menuItemFactory } from './MenuItem';
import { menuFactory } from './Menu';
import { iconMenuFactory } from './IconMenu';
import themedRippleFactory from '../ripple';
import theme from './theme.css';

const applyTheme = Component => themr(MENU, theme)(Component);
const ThemedMenuDivider = applyTheme(MenuDivider);
const ThemedMenuItem = applyTheme(menuItemFactory(themedRippleFactory({})));
const ThemedMenu = applyTheme(menuFactory(ThemedMenuItem));
const ThemedIconMenu = applyTheme(iconMenuFactory(IconButton, ThemedMenu));

export { ThemedMenuDivider as MenuDivider };
export { ThemedMenuItem as MenuItem };
export { ThemedMenu as Menu };
export { ThemedIconMenu as IconMenu };
