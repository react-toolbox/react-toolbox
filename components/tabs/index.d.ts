import * as React from "react";
import ReactToolbox from "../index";

export interface TabsTheme extends TabTheme, TabContentTheme {
  /**
   * Class used for arrows.
   */
  arrow?: string;
  /**
   * Class used for arrow container.
   */
  arrowContainer?: string;
  /**
   * Class used when 'disableAnimatedBottomBorder' is true.
   */
  disableAnimation?: string;
  /**
   * Used to make the 'fixed tabs'.
   */
  fixed?: string;
  /**
   * Used to invert the colors.
   */
  inverse?: string;
  /**
   * Used for the navigation element.
   */
  navigation?: string;
  /**
   * Used for navigation container.
   */
  navigationContainer?: string;
  /**
   * Used for the moving underline element.
   */
  pointer?: string;
  /**
   * Used as a root classname for the component.
   */
  tabs?: string;
}

export interface TabsProps extends ReactToolbox.Props {
  /**
   * Children to pass through the component.
   */
  children?: React.ReactNode;
  /**
   * Disable the animation below the active tab.
   * @default false
   */
  disableAnimatedBottomBorder?: boolean;
  /**
   * Current
   * @default 0
   */
  index?: number;
  /**
   * `unmounted` mode will not mount the tab content of inactive tabs.
   * `display` mode will mount but hide inactive tabs.
   * Consider holding state outside of the Tabs component before using `display` mode
   * @default unmounted
   */
  hideMode?: 'display' | 'unmounted';
  /**
   * If True, the tabs will have an inverse style.
   */
  inverse?: boolean;
  /**
   * If True, the tabs will be fixed, covering the whole width.
   */
  fixed?: boolean;
  /**
   * Callback function that is fired when the tab changes.
   */
  onChange?: Function;
  /**
   * Classnames object defining the component style.
   */
  theme?: TabsTheme;
}

export class Tabs extends React.Component<TabsProps, {}> { }

export interface TabTheme {
  /**
   * Added to the navigation tab element in case it's active.
   */
  active?: string;
  /**
   * Added to the navigation tab element in case it's disabled.
   */
  disabled?: string;
  /**
   * Added to the navigation tab element in case it's hidden.
   */
  hidden?: string;
  /**
   * Added to the navigation tab element in case it's active.
   */
  label?: string;
  /**
   * Class added when icon is set.
   */
  withIcon?: string;
  /**
   * Class added when label is set.
   */
  withText?: string;
}

export interface TabProps extends ReactToolbox.Props {
  /**
   * If true, the current component is visible.
   */
  active?: boolean;
  /**
   * Additional class name to provide custom styling for the active tab.
   */
  activeClassName?: string;
  /**
   * If true, the current component is not clickable.
   * @default false
   */
  disabled?: boolean;
  /**
   * If true, the current component is not visible.
   * @default false
   */
  hidden?: boolean;
  /**
   * Icon to be used in inner FontIcon.
   */
  icon?: React.ReactNode;
  /**
   * Label text for navigation header. Required.
   */
  label: string;
  /**
   * Callback function that is fired when the tab is activated.
   */
  onActive?: Function;
  /**
   * Classnames object defining the component style.
   */
  theme?: TabTheme;
  /**
   * Additional properties passed to Tab root container.
   */
  [key: string]: any;
}

export class Tab extends React.Component<TabProps, {}> { }

export interface TabContentTheme {
  /**
   * Added when tab is active.
   */
  active?: string;
  /**
   * Used for the tab content element.
   */
  tab?: string;
}

export interface TabContentProps extends ReactToolbox.Props {
  /**
   * Whether tab is active.
   */
  active?: boolean;
  /**
   * Tab content.
   */
  children?: React.ReactNode;
  /**
   * Current tab index.
   */
  tabIndex?: number;
  /**
   * Classnames object defining the component style.
   */
  theme?: TabContentTheme;
}

export class TabContent extends React.Component<TabContentProps, {}> { }
