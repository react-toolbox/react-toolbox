import __ReactToolbox from "../index.d.ts";

export interface AppBarTheme {
  /**
   * Used for the component root element.
   */
  appBar?: string;
  /**
   * Added to the root element when the app bar is fixed.
   */
  fixed?: string;
  /**
   * Added to the root element when the app bar is flat.
   */
  flat?: string;
}

interface AppBarProps extends __ReactToolbox.Props {
  /**
   * Children to pass through the component.
   */
  children?: __React.ReactNode;
  /**
   * Determine if the bar should have position fixed or relative.
   * @default false
   */
  fixed?: boolean;
  /**
   * If true, the AppBar shows a shadow.
   * @default false
   */
  flat?: boolean;
  /**
   * Classnames object defining the component style.
   */
  theme?: AppBarTheme;
}

export class AppBar extends __React.Component<AppBarProps, {}> { }

export default AppBar;
