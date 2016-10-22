import * as React from "react";
import ReactToolbox from "../index";

export interface ListTheme {
  /**
   * Used for the root element of the list.
   */
  list?: string;
}

interface ListProps extends ReactToolbox.Props {
  /**
   * Children to pass through the component.
   */
  children?: React.ReactNode;
  /**
   * If true, each element in the list will have a ripple effect on click
   * @default false
   */
  ripple?: boolean;
  /**
   * If true, the elements in the list will display a hover effect and a pointer cursor.
   * @default false
   */
  selectable?: boolean;
  /**
   * Classnames object defining the component style.
   */
  theme?: ListTheme;
}

export class List extends React.Component<ListProps, {}> { }

export interface ListCheckboxTheme {
  /**
   * Used as a wrapper class for the subheader element.
   */
  checkbox?: string;
  /**
   * Added to the checkbox element.
   */
  checkboxItem?: string;
  /**
   * Added to the inner content if its a disabled item.
   */
  disabled?: string;
  /**
   * Used for the inner content of a list item.
   */
  item?: string;
  /**
   * Used for the content wrapper element in list item.
   */
  itemContentRoot?: string;
  /**
   * Added to the text inside of the list item.
   */
  itemText?: string;
  /**
   * Added to the content wrapper element if size is large.
   */
  large?: string;
  /**
   * Added to the text inside of the list item if its primary.
   */
  primary?: string;
}

interface ListCheckboxProps extends ReactToolbox.Props {
  /**
   * Main text of the item. Required.
   */
  caption?: string;
  /**
   * If true the checkbox appears checked by default.
   * @default false
   */
  checked?: boolean;
  /**
   * If true, the item is displayed as disabled and it's not clickable.
   * @default false
   */
  disabled?: boolean;
  /**
   * Secondary text to display under the caption.
   */
  legend?: string;
  /**
   * Name for the checkbox input item.
   */
  name?: string;
  /**
   * Callback called when the input element is blurred.
   */
  onBlur?: Function;
  /**
   * Callback called when the input element is changed.
   */
  onChange?: Function;
  /**
   * Callback called when the input element is focused.
   */
  onFocus?: Function;
  /**
   * Classnames object defining the component style.
   */
  theme?: ListCheckboxTheme;
}

export class ListCheckbox extends React.Component<ListCheckboxProps, {}> { }

export interface ListDividerTheme {
  /**
   * Added to the root element.
   */
  divider?: string;
  /**
   * Added to root element if inset is true.
   */
  inset?: string;
}

interface ListDividerProps extends ReactToolbox.Props {
  /**
   * If true, will leave a space at the left side.
   */
  inset?: boolean;
  /**
   * Classnames object defining the component style.
   */
  theme?: ListDividerTheme;
}

export class ListDivider extends React.Component<ListDividerProps, {}> { }

export interface ListItemTheme {
  /**
   * Added to the inner content if its a disabled item.
   */
  disabled?: string;
  /**
   * Used for the inner content of a list item.
   */
  item?: string;
  /**
   * Used for each action element (left/right).
   */
  itemAction?: string;
  /**
   * Used for the content wrapper element in list item.
   */
  itemContentRoot?: string;
  /**
   * Added to the text inside of the list item.
   */
  itemText?: string;
  /**
   * Added to the content wrapper element if size is large.
   */
  large?: string;
  /**
   * Added for the element that wraps left actions.
   */
  left?: string;
  /**
   * Used for the root element of the list.
   */
  listItem?: string;
  /**
   * Added to the text inside of the list item if its primary.
   */
  primary?: string;
  /**
   * Added for the element that wraps right actions.
   */
  right?: string;
  /**
   * Added to the inner content if its a selectable item.
   */
  selectable?: string;
}

interface ListItemProps extends ReactToolbox.Props {
  /**
   * A string URL to specify an avatar in the left side of the item.
   */
  avatar?: React.ReactNode | string;
  /**
   * Main text of the item.
   */
  caption?: string;
  /**
   * Children to pass through the component.
   */
  children?: React.ReactNode;
  /**
   * If true, the item is displayed as disabled and is not clickable.
   * @default false
   */
  disabled?: boolean;
  /**
   * An element that will be displayed as the item. If set, this will override caption and legend.
   */
  itemContent?: React.ReactNode;
  /**
   * A list of elements that are placed on the left side of the item and after the avatar attribute.
   */
  leftActions?: React.ReactNode;
  /**
   * A string key of a font icon or element to display an icon in the left side of the item.
   */
  leftIcon?: React.ReactNode | string;
  /**
   * Secondary text to display under the caption.
   */
  legend?: string;
  /**
   * A list of elements that are placed on the right side of the item and after the rightIcon attribute.
   */
  rightActions?: React.ReactNode;
  /**
   * The same as the leftIcon but in this case the icon is displayed in the right side.
   */
  rightIcon?: React.ReactNode | string;
  /**
   * If true, the item displays a ripple effect on click. By default it's inherited from the parent element.
   */
  ripple?: boolean;
  /**
   * If true, the elements in the list will display a hover effect and a pointer cursor. Inherited from the parent.
   * @default false
   */
  selectable?: boolean;
  /**
   * Classnames object defining the component style.
   * @default false
   */
  theme?: ListItemTheme;
  /**
   * In case you want to provide the item as a link, you can pass this property to specify the href.
   */
  to?: string;
}

export class ListItem extends React.Component<ListItemProps, {}> { }

export interface ListSubHeaderTheme {
  /**
   * Used as a wrapper class for the subheader element.
   */
  subheader?: string;
}

interface ListSubHeaderProps extends ReactToolbox.Props {
  /**
   * Text that will be displayed.
   */
  caption?: string;
  /**
   * Classnames object defining the component style.
   */
  theme?: ListSubHeaderTheme;
}

export class ListSubHeader extends React.Component<ListSubHeaderProps, {}> { }
