import * as React from "react";
import ReactToolbox from "../index";

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
   * Label text for navigation header.
   */
  label?: string;
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

export default Tab;
