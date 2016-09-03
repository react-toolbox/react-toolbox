import * as React from "react";
import ReactToolbox from "../index";

export interface NavigationTheme {
  /**
   * Used for buttons provided in the component.
   */
  button?: string;
  /**
   * Used for the root element if the layout is horizontal.
   */
  horizontal?: string;
  /**
   * Used for links provided in the component.
   */
  link?: string;
  /**
   * Used for the root element if the layout is vertical.
   */
  vertical?: string;
}

interface NavigationProps extends ReactToolbox.Props {
  /**
   * Array of objects that will be represented as <Button/> so the keys will be transferred as properties the Button Component.
   */
  actions?: any[];
  /**
   * Children to pass through the component.
   */
  children?: React.ReactNode;
  /**
   * Array of objects similar to actions but that will be rendered as <Link/> component definition.
   */
  routes?: any[];
  /**
   * Classnames object defining the component style.
   */
  theme?: NavigationTheme;
  /**
   * Type of the navigation, it can be vertical or horizontal.
   * @default horizontal
   */
  type?: "vertical" | "horizontal";
}

export class Navigation extends React.Component<NavigationProps, {}> { }
