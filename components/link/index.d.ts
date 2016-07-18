import __ReactToolbox from "../index.d.ts";

export interface LinkTheme {
  active?: string;
  icon?: string;
  link?: string;
}

interface LinkProps extends __ReactToolbox.Props {
  active?: boolean;
  /**
   * Children to pass through the component.
   */
  children?: __React.ReactNode;
  count?: number;
  href?: string;
  icon?: __React.ReactNode | string;
  label?: string;
  /**
   * Classnames object defining the component style.
   */
  theme?: LinkTheme;
}

export class Link extends __React.Component<LinkProps, {}> { }
