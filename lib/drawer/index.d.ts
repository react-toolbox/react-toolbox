import __ReactToolbox from "../index.d.ts";

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

interface DrawerProps extends __ReactToolbox.Props {
  /**
   * If true, the drawer will be visible.
   * @default false
   */
  active?: boolean;
  /**
   * Children to pass through the component.
   */
  children?: __React.ReactNode;
  /**
   * Callback function to be invoked when the overlay is clicked.
   */
  onOverlayClick?: __React.MouseEventHandler;
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

export class Drawer extends __React.Component<DrawerProps, {}> { }

export default Drawer;
