import * as React from "react";
import ReactToolbox from "../index";

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

export interface MenuItemProps extends ReactToolbox.Props {
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
  icon?: React.ReactNode;
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
  /**
   * Passed down to the root element
   */
  value?: any;
}

export class MenuItem extends React.Component<MenuItemProps, {}> { }

export default MenuItem;
