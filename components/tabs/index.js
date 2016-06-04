import { themr } from 'react-css-themr';
import { TABS } from '../identifiers.js';
import { tabsFactory } from './Tabs.js';
import { TabContent } from './TabContent.js';
import { Tab } from './Tab.js';
import theme from './theme.scss';

const applyTheme = (Component) => themr(TABS, theme)(Component);
const ThemedTabContent = applyTheme(TabContent);
const ThemedTab = applyTheme(Tab);
const ThemedTabs = applyTheme(tabsFactory(ThemedTab, ThemedTabContent));

export { ThemedTab as Tab };
export { ThemedTabs as Tabs };
