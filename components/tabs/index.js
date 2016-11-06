import { themr } from 'react-css-themr';
import { TABS } from '../identifiers';
import { tabsFactory } from './Tabs';
import { TabContent } from './TabContent';
import { Tab } from './Tab';
import theme from './theme.scss';

const applyTheme = Component => themr(TABS, theme)(Component);
const ThemedTabContent = applyTheme(TabContent);
const ThemedTab = applyTheme(Tab);
const ThemedTabs = applyTheme(tabsFactory(ThemedTab, ThemedTabContent));

export { ThemedTab as Tab };
export { ThemedTabs as Tabs };
