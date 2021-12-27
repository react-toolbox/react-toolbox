import * as React from "react";
import ReactToolbox from "../index";

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
