import * as React from "react";
import ReactToolbox from "../index";

export interface NavDrawerTheme {
  /**
   * Used when the drawer is active.
   */
  active?: string;
  /**
   * Used for the content of the drawer.
   */
  drawerContent?: string;
  /**
   * Added to the root class for large drawer.
   */
  lgPermanent?: string;
  /**
   * Added to the root class for large drawer (tablet landscape).
   */
  lgTabletPermanent?: string;
  /**
   * Added to the root class for medium drawer.
   */
  mdPermanent?: string;
  /**
   * Root class for the drawer.
   */
  navDrawer?: string;
  /**
   * Added to the root class if positioning is pinned.
   */
  pinned?: string;
  /**
   * Used as a wrapper for the drawer content.
   */
  scrim?: string;
  /**
   * Added to the drawer content if its scrollable.
   */
  scrollY?: string;
  /**
   * Added to the root class for small drawer.
   */
  smPermanent?: string;
  /**
   * Added to the root class for small drawer (tablet portrait).
   */
  smTabletPermanent?: string;
  /**
   * Added to the root class if width is wide.
   */
  wide?: string;
  /**
   * Added to the root class for extra big drawer.
   */
  xlPermanent?: string;
  /**
   * Added to the root class for super big drawer.
   */
  xxlPermanent?: string;
  /**
   * Added to the root class for largest possible drawer.
   */
  xxxlPermanent?: string;
}

export interface NavDrawerProps extends ReactToolbox.Props {
  /**
   * If true, the drawer will be shown as an overlay.
   * @default false
   */
  active?: boolean;
  /**
   * Children to pass through the component.
   */
  children?: React.ReactNode;
  /**
   * Callback function to be invoked when the overlay is clicked.
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
   * If true, the drawer will vertically scroll all content.
   * @default false
   */
  scrollY?: boolean;
  /**
   * Classnames object defining the component style.
   */
  theme?: NavDrawerTheme;
  /**
   * 320px or 400px. Only applicable above the sm breakpoint.
   * @default normal
   */
  width?: "normal" | "wide";
}

export class NavDrawer extends React.Component<NavDrawerProps, {}> { }
