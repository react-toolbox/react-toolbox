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
