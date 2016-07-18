import __ReactToolbox from "../index.d.ts";

export interface MenuTheme {
  active?: string;
  bottomLeft?: string;
  bottomRight?: string;
  menu?: string;
  menuInner?: string;
  outline?: string;
  rippled?: string;
  static?: string;
  topLeft?: string;
  topRight?: string;
}

interface MenuProps extends __ReactToolbox.Props {
  active?: boolean;
  /**
   * Children to pass through the component.
   */
  children?: __React.ReactNode;
  onHide?: Function;
  onSelect?: Function;
  onShow?: Function;
  position?: "auto" | "static" | "topLeft" | "topRight" | "bottomLeft" | "bottomRight";
  ripple?: boolean;
  selectable?: boolean;
  selected?: any;
  /**
   * Classnames object defining the component style.
   */
  theme?: MenuTheme;
}

export class Menu extends __React.Component<MenuProps, {}> { }

export interface IconMenuTheme {
  icon?: string;
  iconMenu?: string;
}

interface IconMenuProps extends __ReactToolbox.Props {
  /**
   * Children to pass through the component.
   */
  children?: __React.ReactNode;
  icon?: __React.ReactNode | string;
  iconRipple?: boolean;
  menuRipple?: boolean;
  onSelect?: Function;
  onShow?: Function;
  position?: "auto" | "static" | "topLeft" | "topRight" | "bottomLeft" | "bottomRight";
  selectable?: boolean;
  selected?: any;
  /**
   * Classnames object defining the component style.
   */
  theme?: IconMenuTheme;
}

export class IconMenu extends __React.Component<IconMenuProps, {}> { }

export interface MenuDividerTheme {
  menuDivider?: string;
}

interface MenuDividerProps extends __ReactToolbox.Props {
  /**
   * Classnames object defining the component style.
   */
  theme?: MenuDividerTheme;
}

export class MenuDivider extends __React.Component<MenuDividerProps, {}> { }

export interface ListDividerTheme {
  divider?: string;
  inset?: string;
}

interface ListDividerProps extends __ReactToolbox.Props {
  inset?: boolean;
  /**
   * Classnames object defining the component style.
   */
  theme?: ListDividerTheme;
}

export class ListDivider extends __React.Component<ListDivider, {}> { }

export interface MenuItemTheme {
  caption?: string;
  disabled?: string;
  icon?: string;
  menuItem?: string;
  selected?: string;
  shortcut?: string;
}

interface MenuItemProps extends __ReactToolbox.Props {
  caption?: string;
  /**
   * Children to pass through the component.
   */
  children?: __React.ReactNode;
  disabled?: boolean;
  icon?: __React.ReactNode | string;
  selected?: boolean;
  /**
   * Classnames object defining the component style.
   */
  theme?: MenuItemTheme;
}

export class MenuItem extends __React.Component<MenuItemProps, {}> { }
