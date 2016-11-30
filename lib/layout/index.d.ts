import * as React from "react";
import ReactToolbox from "../index";

export interface LayoutTheme {
  /**
   * Class used in the container to position and align inner items.
   */
  layout?: string;
}

interface LayoutProps extends ReactToolbox.Props {
  /**
   * Children to pass through the component.
   */
  children?: [NavDrawer | Panel | Sidebar];
  /**
   * Classnames object defining the component style.
   */
  theme?: LayoutTheme;
}

export class Layout extends React.Component<LayoutProps, {}> { }

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
  lgPermangent?: string;
  /**
   * Added to the root class for medium drawer.
   */
  mdPermangent?: string;
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
  xxlPermangent?: string;
  /**
   * Added to the root class for largest possible drawer.
   */
  xxxlPermangent?: string;
}

interface NavDrawerProps extends ReactToolbox.Props {
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
  permanentAt?: "sm" | "md" | "lg" | "xl" | "xxl" | "xxxl";
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

export interface PanelTheme {
  /**
   * Used as the root class of the panel component.
   */
  panel?: string;
  /**
   * Used in case the panel is scrollable.
   */
  scrollY?: string;
}

interface PanelProps extends ReactToolbox.Props {
  /**
   * Children to pass through the component.
   */
  children?: React.ReactNode;
  /**
   * If true, the panel will vertically scroll all content.
   * @default false
   */
  scrollY?: boolean;
  /**
   * Classnames object defining the component style.
   */
  theme?: PanelTheme;
}

export class Panel extends React.Component<PanelProps, {}> { }

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

interface SidebarProps extends ReactToolbox.Props {
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
