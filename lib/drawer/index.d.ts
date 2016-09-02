import * as React from "react";
import ReactToolbox from "../index";

export interface DrawerTheme {
  /**
   * Used for the root class when the drawer is active.
   */
  active?: string;
  /**
   * Used for the drawer content.
   */
  content?: string;
  /**
   * Root class.
   */
  drawer?: string;
  /**
   * Added to the root class when drawer is to the left.
   */
  left?: string;
  /**
   * Added to the root class when drawer is to the right.
   */
  right?: string;
}

interface DrawerProps extends ReactToolbox.Props {
  /**
   * If true, the drawer will be visible.
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
   * Classnames object defining the component style.
   */
  theme?: DrawerTheme;
  /**
   * Type of drawer. It can be left or right to display the drawer on the left or right side of the screen.
   * @default left
   */
  type?: "left" | "right";
}

export class Drawer extends React.Component<DrawerProps, {}> { }

export default Drawer;
