import __ReactToolbox from "../index.d.ts";

export interface ListTheme {
  list?: string;
}

interface ListProps extends __ReactToolbox.Props {
  /**
   * Children to pass through the component.
   */
  children?: __React.ReactNode;
  ripple?: boolean;
  selectable?: boolean;
  /**
   * Classnames object defining the component style.
   */
  theme?: ListTheme;
}

export class List extends __React.Component<ListProps, {}> { }

export interface ListCheckboxTheme {
  checkbox?: string;
  checkboxItem?: string;
  disabled?: string;
  item?: string;
  itemContentRoot?: string;
  itemText?: string;
  large?: string;
  primary?: string;
}

interface ListCheckboxProps extends __ReactToolbox.Props {
  caption?: string;
  checked?: boolean;
  disabled?: boolean;
  legend?: string;
  name?: string;
  onBlur?: __React.FocusEventHandler;
  onChange?: __React.FormEventHandler;
  onFocus?: __React.FocusEventHandler;
  /**
   * Classnames object defining the component style.
   */
  theme?: ListCheckboxTheme;
}

export class ListCheckbox extends __React.Component<ListCheckboxProps, {}> { }

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

export interface ListItemTheme {
  disabled?: string;
  item?: string;
  itemAction?: string;
  large?: string;
  left?: string;
  listItem?: string;
  primary?: string;
  right?: string;
  selectable?: string;
}

interface ListItemProps extends __ReactToolbox.Props {
  avatar?: __React.ReactNode | string;
  caption?: string;
  /**
   * Children to pass through the component.
   */
  children?: __React.ReactNode;
  disabled?: boolean;
  itemContent?: __React.ReactNode;
  leftActions?: __React.ReactNode;
  leftIcon?: __React.ReactNode | string;
  rightIcon?: __React.ReactNode | string;
  ripple?: boolean;
  selectable?: boolean;
  /**
   * Classnames object defining the component style.
   */
  theme?: ListItemTheme;
  to?: string;
}

export class ListItem extends __React.Component<ListItemProps, {}> { }

export interface ListSubHeaderTheme {
  subheader?: string;
}

interface ListSubHeaderProps extends __ReactToolbox.Props {
  caption?: boolean;
  /**
   * Classnames object defining the component style.
   */
  theme?: ListSubHeaderTheme;
}

export class ListSubHeader extends __React.Component<ListSubHeaderProps, {}> { }
