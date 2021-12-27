import * as React from "react";
import ReactToolbox from "../index";

export interface MenuDividerTheme {
  /**
   *
   */
  menuDivider?: string;
}

export interface MenuDividerProps extends ReactToolbox.Props {
  /**
   * Classnames object defining the component style.
   */
  theme?: MenuDividerTheme;
}

export class MenuDivider extends React.Component<MenuDividerProps, {}> { }

export default MenuDivider;
