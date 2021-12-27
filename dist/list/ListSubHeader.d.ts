import * as React from "react";
import ReactToolbox from "../index";

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
