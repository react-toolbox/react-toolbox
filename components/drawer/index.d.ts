import __ReactToolbox from "../index.d.ts";

export interface DrawerTheme {
  active?: string;
  content?: string;
  drawer?: string;
  left?: string;
  right?: string;
}

interface DrawerProps extends __ReactToolbox.Props {
  active?: boolean;
  /**
   * Children to pass through the component.
   */
  children?: __React.ReactNode;
  onOverlayClick?: __React.MouseEventHandler;
  /**
   * Classnames object defining the component style.
   */
  theme?: DrawerTheme;
  type?: "left" | "right";
}

export class Drawer extends __React.Component<DrawerProps, {}> { }

export default Drawer;
