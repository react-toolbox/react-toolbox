import * as React from "react";
import { DrawerCommonProps } from '../drawer/Drawer';

export interface SidebarTheme {
  /**
   * Added to the root class when it is clipped.
   */
  clipped?: string;
  /**
   * Added to the root class if sidebar is pinned.
   */
  pinned?: string;
}

export interface SidebarProps extends DrawerCommonProps {
  /**
   * If true, when the `AppBar` gets pinned, it will stand over the `Drawer`.
   * @default false
   */
  clipped?: boolean;
  /**
   * The breakpoint at which the drawer is automatically pinned.
   */
  permanentAt?: "sm" | "smTablet" | "md" | "lg" | "lgTablet" | "xl" | "xxl" | "xxxl";
  /**
   * If true, the sidebar will be pinned open.
   * @default false
   */
  pinned?: boolean;
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
