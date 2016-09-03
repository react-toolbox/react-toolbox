import * as React from "react";
import ReactToolbox from "../index";

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

interface AppBarProps extends ReactToolbox.Props {
  /**
   * Children to pass through the component.
   */
  children?: React.ReactNode;
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

export class AppBar extends React.Component<AppBarProps, {}> { }

export default AppBar;
