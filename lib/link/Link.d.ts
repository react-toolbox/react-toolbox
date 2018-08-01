import * as React from "react";
import ReactToolbox from "../index";

export interface LinkTheme {
  /**
   * Added to the root element if the Link is active.
   */
  active?: string;
  /**
   * Used for the icon element if it's present.
   */
  icon?: string;
  /**
   * Used for the root element.
   */
  link?: string;
}

export interface LinkProps extends ReactToolbox.Props {
  /**
   * If true, adds active style to link.
   * @default false
   */
  active?: boolean;
  /**
   * Children to pass through the component.
   */
  children?: React.ReactNode;
  /**
   * Sets a count number.
   */
  count?: number;
  /**
   * Sets the anchor link.
   */
  href?: string;
  /**
   * An icon key string to include a FontIcon component in front of the text.
   */
  icon?: React.ReactNode;
  /**
   * The text string used for the text content of the link.
   */
  label?: string;
  /**
   * Classnames object defining the component style.
   */
  theme?: LinkTheme;
  /**
   * Additional parameters passed to anchor element.
   */
  [key: string]: any;
}

export class Link extends React.Component<LinkProps, {}> { }

export default Link;
