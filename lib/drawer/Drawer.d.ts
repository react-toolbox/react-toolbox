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
  /**
   * A wrapper class for the top of the root.
   */
  wrapper?: string;
}

export interface DrawerCommonProps {
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
   * If true the Drawer is rendered inside the normal tree.
   * @default false
   */
  insideTree?: boolean;
  /**
   * Callback function to be invoked when the overlay is clicked.
   */
  onOverlayClick?: Function;
  /**
   * Type of drawer. It can be left or right to display the drawer on the left or right side of the screen.
   * @default left
   */
  type?: "left" | "right";
  /**
   * If true display an Overlay that locks the scroll when the Drawer is active.
   * @default true
   */
  withOverlay?: boolean;
}

export interface DrawerProps extends ReactToolbox.Props, DrawerCommonProps {
  /**
   * Classnames object defining the component style.
   */
  theme?: DrawerTheme;
}

export class Drawer extends React.Component<DrawerProps, {}> { }

export default Drawer;
