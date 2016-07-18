import __ReactToolbox from "../index.d.ts";

export interface NavigationTheme {
  button?: string;
  horizontal?: string;
  link?: string;
  vertical?: string;
}

interface NavigationProps extends __ReactToolbox.Props {
  actions?: any[];
  /**
   * Children to pass through the component.
   */
  children?: __React.ReactNode;
  routes?: any[];
  /**
   * Classnames object defining the component style.
   */
  theme?: NavigationTheme;
  type?: "vertical" | "horizontal";
}

export class Navigation extends __React.Component<NavigationProps, {}> { }
