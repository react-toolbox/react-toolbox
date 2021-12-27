import * as React from "react";
import ReactToolbox from "../index";
import { ListItemContentTheme } from './ListItemContent';
import { ListItemActionsTheme } from './ListItemActions';

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
