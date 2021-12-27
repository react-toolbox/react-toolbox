import * as React from "react";
import ReactToolbox from "../index";

export interface LayoutTheme {
  appbarFixed?: string;
  /**
   * The root class that wraps the whole layout.
   */
  layout?: string;
  /**
   * Added to the root if there is a pinned `NavDrawer`
   */
  navDrawerPinned?: string;
  /**
   * Added to the root if there is a clipped NavDrawer.
   */
  navDrawerClipped?: string;
  /**
   * Added to the root if there is a pinned sidebar.
   */
  sidebarPinned?: string;
  /**
   * Added to the root if there is a clipped sidebar.
   */
  sidebarClipped?: string;

  /**
   * Added to the root element in case there is a sidebar present. width correspond to the value passed to the `Sidebar`.
   */
  sidebarWidth1?: string;
  sidebarWidth2?: string;
  sidebarWidth3?: string;
  sidebarWidth4?: string;
  sidebarWidth5?: string;
  sidebarWidth6?: string;
  sidebarWidth7?: string;
  sidebarWidth8?: string;
  sidebarWidth9?: string;
  sidebarWidth10?: string;
  sidebarWidth11?: string;
  sidebarWidth12?: string;
  sidebarWidth25?: string;
  sidebarWidth33?: string;
  sidebarWidth50?: string;
  sidebarWidth66?: string;
  sidebarWidth75?: string;
  sidebarWidth100?: string;
}

export interface LayoutProps extends ReactToolbox.Props {
  /**
   * Children to pass through the component.
   */
  children?: JSX.Element | JSX.Element[];
  /**
   * Classnames object defining the component style.
   */
  theme?: LayoutTheme;
}

export class Layout extends React.Component<LayoutProps, {}> { }
