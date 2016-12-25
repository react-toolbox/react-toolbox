import * as React from "react";
import ReactToolbox from "../index";

export interface SidebarTheme {
  /**
   * Added to the root class if sidebar is pinned.
   */
  pinned?: string;
  /**
   * Add to the content of sidebar if its scrollable.
   */
  scrollY?: string;
  /**
   * Root class of the sidebar.
   */
  sidebar?: string;
  /**
   * Used in for the content element of the sidebar.
   */
  sidebarContent?: string;
}

export interface SidebarProps extends ReactToolbox.Props {
  /**
   * Children to pass through the component.
   */
  children?: React.ReactNode;
  /**
   * If true, the sidebar will be pinned open.
   * @default false
   */
  pinned?: boolean;
  /**
   * If true, the sidebar will vertically scroll all content
   * @default false
   */
  scrollY?: boolean;
  /**
   * Classnames object defining the component style.
   */
  theme?: SidebarTheme;
  /**
   * Width in standard increments (1-12) or percentage (25, 33, 50, 66, 75, 100)
   * @default 5
   */
  width?: number; // 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 25 | 33 | 50 | 66 | 75 | 100;
}

export class Sidebar extends React.Component<SidebarProps, {}> { }
