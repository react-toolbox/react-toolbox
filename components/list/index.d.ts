import * as React from "react";
import ReactToolbox from "../index";

export interface ListTheme {
  /**
   * Used for the root element of the list.
   */
  list?: string;
}

export interface ListProps extends ReactToolbox.Props {
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
}

export interface ListCheckboxProps extends ReactToolbox.Props {
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

export interface ListDividerProps extends ReactToolbox.Props {
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
   * Used for the root element of the list.
   */
  listItem?: string;
}

export interface ListItemProps extends ReactToolbox.Props {
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
   * If true, the item displays a ripple effect on click. By default it's inherited from the parent element.
   */
  ripple?: boolean;
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

export interface ListSubHeaderProps extends ReactToolbox.Props {
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

export interface ListItemActionTheme {
  /**
   * Used for each action element (left/right).
   */
  itemAction?: string;
}

export interface ListItemActionProps {
  /**
   * List item action.
   */
  action?: React.ReactNode;
  /**
   * Object defining the component class name mappings.
   */
  theme?: ListItemActionTheme;
}

export class ListItemAction extends React.Component<ListItemActionProps, {}> { }

export interface ListItemActionsTheme {
  /**
   * Added for the element that wraps left actions.
   */
  left?: string;
  /**
   * Added for the element that wraps right actions.
   */
  right?: string;
}

export interface ListItemActionsProps {
  /**
   * Children to pass through the component.
   */
  children?: React.ReactNode;
  /**
   * Object defining the component class name mappings.
   */
  theme?: ListItemActionsTheme & ListItemActionTheme;
  /**
   * List item action type.
   */
  type?: "left" | "right";
}

export class ListItemActions extends React.Component<ListItemActionsProps, {}> { }

export interface ListItemContentTheme {
  /**
   * Added to the content wrapper element if type is "auto".
   */
  auto?: string;
  /**
   * Used for the content wrapper element in list item.
   */
  itemContentRoot?: string;
  /**
   * Added to the content wrapper element if type is "large".
   */
  large?: string;
  /**
   * Added to the content wrapper element if type is "normal".
   */
  normal?: string;
}

export interface ListItemContentProps {
  /**
   * Main text of the item.
   */
  caption?: React.ReactNode;
  /**
   * Children to pass through the component.
   */
  children?: React.ReactNode;
  /**
   * Secondary text to display under the caption.
   */
  legend?: string;
  /**
   * Object defining the component class name mappings.
   */
  theme?: ListItemContentTheme;
  /**
   * List item content type.
   */
  type?: "auto" | "normal" | "large";
}

export class ListItemContent extends React.Component<ListItemContentProps, {}> { }

export interface ListItemLayoutTheme {
  /**
   * Added to the inner content if its a disabled item.
   */
  disabled?: string;
  /**
   * Used for the inner content of a list item.
   */
  item?: string;
  /**
   * Added when layout is selectable.
   */
  selectable?: string;
}

export interface ListItemLayoutProps extends ReactToolbox.Props {
  /**
   * A string URL to specify an avatar in the left side of the item.
   */
  avatar?: string | React.ReactElement<any>;
  /**
   * Main text of the item.
   */
  caption?: string;
    /**
   * Children to pass through the component.
   */
  children?: React.ReactNode;
  /**
   * If true, the item is displayed as disabled and it's not clickable.
   * @default false
   */
  disabled?: boolean;
  /**
   * Layout content.
   */
  itemContent?: React.ReactChild;
  /**
   * A list of elements that are placed on the left side of the item and after the avatar attribute.
   */
  leftActions?: React.ReactNode[];
  /**
   * A string key of a font icon or element to display an icon in the left side of the item.
   */
  leftIcon?: string | React.ReactElement<any>;
  /**
   * Secondary text to display under the caption.
   */
  legend?: string;
  /**
   * A list of elements that are placed on the right side of the item and after the rightIcon attribute.
   */
  rightActions?: React.ReactNode[];
  /**
   * The same as the leftIcon but in this case the icon is displayed in the right side.
   */
  rightIcon?: string | React.ReactElement<any>;
  /**
   * If true, the elements in the list will display a hover effect and a pointer cursor. Inherited from the parent.
   * @default false
   */
  selectable?: boolean;
  /**
   * Object defining the component class name mappings.
   */
  theme?: ListItemLayoutTheme & ListItemContentTheme & ListItemActionsTheme;
  /**
   * In case you want to provide the item as a link, you can pass this property to specify the href.
   */
  to?: string;
}

export class ListItemLayout extends React.Component<ListItemLayoutProps, {}> { }

export interface ListItemTextTheme {
  /**
   * Added to the text inside of the list item.
   */
  itemText?: string;
  /**
   * Added to the text inside of the list item if its primary.
   */
  primary?: string;
}

export interface ListItemTextProps extends ReactToolbox.Props {
  /**
   * Children to pass through the component.
   */
  children?: React.ReactNode;
  /**
   * Whether list item text should have 'primary' look.
   * @default
   */
  primary?: boolean;
  /**
   * Object defining the component class name mappings.
   */
  theme?: ListItemTextTheme;
  /**
   * Additional properties passed to root container.
   */
  [key: string]: any;
}

export class ListItemText extends React.Component<ListItemTextProps, {}> { }
