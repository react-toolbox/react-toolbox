import * as React from "react";
import ReactToolbox from "../index";

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

export default TabContent;
