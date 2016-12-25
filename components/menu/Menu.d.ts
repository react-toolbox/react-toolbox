import * as React from "react";
import ReactToolbox from "../index";

export interface MenuTheme {
  /**
   * Added to the root element when menu is active.
   */
  active?: string;
  /**
   * Added to the root when position is bottom left.
   */
  bottomLeft?: string;
  /**
   * Added to the root when position is bottom right.
   */
  bottomRight?: string;
  /**
   * Used for the root element of the menu.
   */
  menu?: string;
  /**
   * Used for the inner wrapper.
   */
  menuInner?: string;
  /**
   * Used to draw the outline.
   */
  outline?: string;
  /**
   * Added to the menu in case if should have ripple.
   */
  rippled?: string;
  /**
   * Added to the root in case its static.
   */
  static?: string;
  /**
   * Added to the root when position is top left.
   */
  topLeft?: string;
  /**
   * Added to the root when position is top right.
   */
  topRight?: string;
}

export interface MenuProps extends ReactToolbox.Props {
  /**
   * If true, the menu will be displayed as opened by default.
   * @default false
   */
  active?: boolean;
  /**
   * Children to pass through the component.
   */
  children?: React.ReactNode;
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
   * If true the menu wrapper will show an outline with a soft shadow.
   * @default true
   */
  outline?: boolean;
  /**
   * Determine the position of the menu. With static value the menu will be always shown, auto means that the it will decide the opening direction based on the current position. To force a position use topLeft, topRight, bottomLeft, bottomRight.
   * @default static
   */
  position?: "auto" | "static" | "topLeft" | "topRight" | "bottomLeft" | "bottomRight";
  /**
   * If true, the menu items will show a ripple effect on click.
   * @default true
   */
  ripple?: boolean;
  /**
   * If true, the menu will keep a value to highlight the active child item.
   * @default true
   */
  selectable?: boolean;
  /**
   * Used for selectable menus. Indicates the current selected value so the child item with this value can be highlighted.
   */
  selected?: any;
  /**
   * Classnames object defining the component style.
   */
  theme?: MenuTheme;
}

export class Menu extends React.Component<MenuProps, {}> { }

export default Menu;
