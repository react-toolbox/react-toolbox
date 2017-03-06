import * as React from "react";
import ReactToolbox from "../index";

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
