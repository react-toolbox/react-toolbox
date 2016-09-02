import * as React from "react";
import ReactToolbox from "../index";

export interface TabsTheme {
  /**
   * Added to the active tab content and header.
   */
  active?: string;
  /**
   * Used for the navigation element.
   */
  navigation?: string;
  /**
   * Used for the moving underline element.
   */
  pointer?: string;
  /**
   * Used as a root classname for the component.
   */
  tabs?: string;
  /**
   * Used for the tab content element.
   */
  tab?: string;
}

interface TabsProps extends ReactToolbox.Props {
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
}

interface TabProps extends ReactToolbox.Props {
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
}

export class Tab extends React.Component<TabProps, {}> { }
