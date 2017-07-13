import { themr } from 'react-css-themr';
import { TABS } from '../identifiers';
import { tabsFactory } from './Tabs';
import { TabContent } from './TabContent';
import { tabFactory } from './Tab';
import themedRippleFactory from '../ripple';
import { FontIcon } from '../font_icon/FontIcon';
import theme from './theme.css';

const applyTheme = Component => themr(TABS, theme)(Component);
const ThemedTabContent = applyTheme(TabContent);
const ThemedTab = applyTheme(tabFactory(themedRippleFactory({ centered: false }), FontIcon));
const ThemedTabs = applyTheme(tabsFactory(ThemedTab, ThemedTabContent, FontIcon));

export { ThemedTab as Tab };
export { ThemedTabs as Tabs };
