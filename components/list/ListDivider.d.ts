import * as React from "react";
import ReactToolbox from "../index";

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
