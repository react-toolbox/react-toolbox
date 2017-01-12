import * as React from "react";
import ReactToolbox from "../index";

export interface FontIconProps extends ReactToolbox.Props {
  /**
   * Children to pass through the component.
   */
  children?: React.ReactNode;
  /**
   * The key string for the icon you want be displayed.
   */
  value?: React.ReactNode;
  /**
   * Additional properties passed to component root.
   */
  [key: string]: any
}

export class FontIcon extends React.Component<FontIconProps, {}> { }

export default FontIcon;
