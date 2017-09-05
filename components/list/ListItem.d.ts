import * as React from "react";
import ReactToolbox from '../index';
import { ListItemContentTheme } from './ListItemContent';
import { ListItemActionsTheme } from './ListItemActions';
import { ListItemLayoutProps, ListItemLayoutTheme } from './ListItemLayout';

export interface ListItemTheme {
  /**
   * Used for the root element of the list.
   */
  listItem?: string;
}

export interface ListItemProps extends ReactToolbox.Props {
  /**
   * Optional text to add aria-label to <li> DOM element
   */
  ariaLabel?: string;
  /**
   * Optional text to inform of actions and be read by screen readers.
   */
  altText?: string;
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
   * Sets a tabIndex attribute which specifies the tab order of the element.
   */
  tabIndex?: number;
  /**
   * Classnames object defining the component style.
   * @default false
   */
  theme?: ListItemTheme & ListItemActionsTheme & ListItemContentTheme & ListItemLayoutTheme;
  /**
   * In case you want to provide the item as a link, you can pass this property to specify the href.
   */
  to?: string;
}

export class ListItem extends React.Component<ListItemProps & ListItemLayoutProps, {}> { }
