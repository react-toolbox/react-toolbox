import * as React from "react";
import { DrawerCommonProps } from '../drawer/Drawer';

export interface NavDrawerTheme {
  /**
   * Added to the root class when it is pinned.
   */
  pinned?: string;
  /**
   * Added to the root class when it is clipped.
   */
  clipped?: string;
}

export interface NavDrawerProps extends DrawerCommonProps {
  /**
   * If true, the drawer will be shown as an overlay.
   * @default false
   */
  active?: boolean;
  /**
   * If true, when the `AppBar` gets pinned, it will stand over the `Drawer`.
   * @default false
   */
  clipped?: boolean;
  /**
   * Callback function to be invoked when the overlay is clicked. It only works if the `Drawer` is actually displaying and Overlay
   */
  onOverlayClick?: Function;
  /**
   * The breakpoint at which the drawer is automatically pinned.
   */
  permanentAt?: "sm" | "smTablet" | "md" | "lg" | "lgTablet" | "xl" | "xxl" | "xxxl";
  /**
   * If true, the drawer will be pinned open. pinned takes precedence over active.
   * @default false
   */
  pinned?: boolean;
  /**
   * Classnames object defining the component style.
   */
  theme?: NavDrawerTheme;
}

export class NavDrawer extends React.Component<NavDrawerProps, {}> { }
