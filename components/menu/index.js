import { themr } from 'react-css-themr';
import { MENU } from '../identifiers.js';
import { IconButton } from '../button';
import { MenuDivider } from './MenuDivider.js';
import { menuItemFactory } from './MenuItem.js';
import { menuFactory } from './Menu.js';
import { iconMenuFactory } from './IconMenu.js';
import themedRippleFactory from '../ripple';
import theme from './theme.scss';

const applyTheme = (Component) => themr(MENU, theme)(Component);
const ThemedMenuDivider = applyTheme(MenuDivider);
const ThemedMenuItem = applyTheme(menuItemFactory(themedRippleFactory({})));
const ThemedMenu = applyTheme(menuFactory(ThemedMenuItem));
const ThemedIconMenu = applyTheme(iconMenuFactory(IconButton, ThemedMenu));

export { ThemedMenuDivider as MenuDivider };
export { ThemedMenuItem as MenuItem };
export { ThemedMenu as Menu };
export { ThemedIconMenu as IconMenu };
