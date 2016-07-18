import __ReactToolbox from "../index.d.ts";

export interface LayoutTheme {
  layout?: string;
}

interface LayoutProps extends __ReactToolbox.Props {
  /**
   * Children to pass through the component.
   */
  children?: [NavDrawer | Panel | Sidebar];
  /**
   * Classnames object defining the component style.
   */
  theme?: LayoutTheme;
}

export class Layout extends __React.Component<LayoutProps, {}> { }

export interface NavDrawerTheme {
  active?: string;
  drawerContent?: string;
  lgPermangent?: string;
  mdPermangent?: string;
  navDrawer?: string;
  pinned?: string;
  scrim?: string;
  scrollY?: string;
  smPermanent?: string;
  wide?: string;
  xlPermanent?: string;
  xxlPermangent?: string;
  xxxlPermangent?: string;
}

interface NavDrawerProps extends __ReactToolbox.Props {
  active?: boolean;
  /**
   * Children to pass through the component.
   */
  children?: __React.ReactNode;
  onOverlayClick?: __React.MouseEventHandler;
  permanentAt?: "sm" | "md" | "lg" | "xl" | "xxl" | "xxxl";
  pinned?: boolean;
  scrollY?: boolean;
  /**
   * Classnames object defining the component style.
   */
  theme?: NavDrawerTheme;
  width?: "normal" | "wide";
}

export class NavDrawer extends __React.Component<NavDrawerProps, {}> { }

export interface PanelTheme {
  panel?: string;
  scrollY?: string;
}

interface PanelProps extends __ReactToolbox.Props {
  /**
   * Children to pass through the component.
   */
  children?: __React.ReactNode;
  scrollY?: boolean;
  /**
   * Classnames object defining the component style.
   */
  theme?: PanelTheme;
}

export class Panel extends __React.Component<PanelProps, {}> { }

export interface SidebarTheme {
  pinned?: string;
  scrollY?: string;
  sidebar?: string;
  sidebarContent?: string;
}

interface SidebarProps extends __ReactToolbox.Props {
  /**
   * Children to pass through the component.
   */
  children?: __React.ReactNode;
  pinned?: boolean;
  scrollY?: boolean;
  /**
   * Classnames object defining the component style.
   */
  theme?: SidebarTheme;
  width?: number; // 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 25 | 33 | 50 | 66 | 75 | 100;
}

export class Sidebar extends __React.Component<SidebarProps, {}> { }
