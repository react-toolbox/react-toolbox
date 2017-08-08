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
  /**
   * Used as the app bar title.
   */
  title?: string;
  /**
   * Added to the left icon app bar element.
   */
  leftIcon?: string;
  /**
   * Added to the right icon app bar element.
   */
  rightIcon?: string;
  /**
   * Added to the root element when the app bar is hidden during scroll.
   */
  scrollHide?: string;
}

export interface AppBarProps extends ReactToolbox.Props {
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
   * If true, the AppBar doesn't show a shadow.
   * @default false
   */
  flat?: boolean;
  /**
   * If it exists it is used as the AppBar title
   */
  title?: string;
  /**
   * If it exists it is used as the AppBar left icon
   */
  leftIcon?: React.ReactNode;
  /**
   * Called when the left icon is clicked
   */
  onLeftIconClick?: Function;
  /**
   * If it exists it is used as the AppBar right icon
   */
  rightIcon?: React.ReactNode;
  /**
   * Called when the righticon is clicked
   */
  onRightIconClick?: Function;
  /**
   * Whether AppBar should be hidden during scroll.
   * @default false
   */
  scrollHide?: boolean;
  /**
   * Classnames object defining the component style.
   */
  theme?: AppBarTheme;
}

export class AppBar extends React.Component<AppBarProps, {}> { }

export default AppBar;
