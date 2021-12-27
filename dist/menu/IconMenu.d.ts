import * as React from "react";
import ReactToolbox from "../index";

export interface IconMenuTheme {
  /**
   * Used for the icon element.
   */
  icon?: string;
  /**
   * Used for the root element of the icon menu.
   */
  iconMenu?: string;
}

export interface IconMenuProps extends ReactToolbox.Props {
  /**
   * If true, the inner Menu component will be active.
   * @default false
   */
  active?: boolean;
  /**
   * Children to pass through the component.
   */
  children?: React.ReactNode;
  /**
   * Icon font key string or Element to display the opener icon.
   * @default more_vert
   */
  icon?: React.ReactNode;
  /**
   * If true, the icon will show a ripple when is clicked.
   * @default true
   */
  iconRipple?: boolean;
  /**
   * If true, the neutral colors are inverted. Useful if the icon is over a dark background.
   * @default false
   */
  inverse?: boolean;
  /**
   * Transferred to the Menu component.
   * @default true
   */
  menuRipple?: boolean;
  /**
   * Callback that will be called when the menu is being hidden.
   */
  onHide?: Function;
  /**
   * Callback that will be invoked when a menu item is selected.
   */
  onSelect?: Function;
  /**
   * Callback that will be invoked when the menu is being shown.
   */
  onShow?: Function;
  /**
   * Determines the position of the menu. This property is transferred to the inner Menu component.
   * @default auto
   */
  position?: "auto" | "static" | "topLeft" | "topRight" | "bottomLeft" | "bottomRight";
  /**
   * If true, the menu will keep a value to highlight the active child item.
   * @default false
   */
  selectable?: boolean;
  /**
   * Used for selectable menus. Indicates the current selected value so the child item with this value can be highlighted.
   */
  selected?: any;
  /**
   * Classnames object defining the component style.
   */
  theme?: IconMenuTheme;
}

export class IconMenu extends React.Component<IconMenuProps, {}> { }

export default IconMenu;
