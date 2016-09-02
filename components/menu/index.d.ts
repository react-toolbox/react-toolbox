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

interface MenuProps extends ReactToolbox.Props {
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
   * @default false
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
  theme?: MenuTheme;
}

export class Menu extends React.Component<MenuProps, {}> { }

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

interface IconMenuProps extends ReactToolbox.Props {
  /**
   * Children to pass through the component.
   */
  children?: React.ReactNode;
  /**
   * Icon font key string or Element to display the opener icon.
   * @default more_vert
   */
  icon?: React.ReactNode | string;
  /**
   * If true, the icon will show a ripple when is clicked.
   * @default true
   */
  iconRipple?: boolean;
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

export interface MenuDividerTheme {
  /**
   *
   */
  menuDivider?: string;
}

interface MenuDividerProps extends ReactToolbox.Props {
  /**
   * Classnames object defining the component style.
   */
  theme?: MenuDividerTheme;
}

export class MenuDivider extends React.Component<MenuDividerProps, {}> { }

export interface MenuItemTheme {
  /**
   * Used for the caption inside the item.
   */
  caption?: string;
  /**
   * Added to the root element if it's disabled.
   */
  disabled?: string;
  /**
   * Used for the icon element if exists.
   */
  icon?: string;
  /**
   * Used as the root class for the component.
   */
  menuItem?: string;
  /**
   * Added to the root element in case it's selected.
   */
  selected?: string;
  /**
   * Used for the shortcut element if exists.
   */
  shortcut?: string;
}

interface MenuItemProps extends ReactToolbox.Props {
  /**
   * The text to include in the menu item. Required.
   */
  caption: string;
  /**
   * Children to pass through the component.
   */
  children?: React.ReactNode;
  /**
   * If true, the item will be displayed as disabled and is not selectable.
   * @default false
   */
  disabled?: boolean;
  /**
   * Icon font key string or Element to display in the right side of the option.
   */
  icon?: React.ReactNode | string;
  /**
   * Transferred from the Menu component for selectable menus. Indicates if it's the current active option.
   * @default false
   */
  selected?: boolean;
  /**
   * Displays shortcut text on the right side of the caption attribute.
   */
  shortcut?: string;
  /**
   * Classnames object defining the component style.
   */
  theme?: MenuItemTheme;
}

export class MenuItem extends React.Component<MenuItemProps, {}> { }
