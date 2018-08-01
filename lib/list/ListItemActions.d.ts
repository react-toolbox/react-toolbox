import * as React from "react";
import ReactToolbox from "../index";
import { ListItemActionTheme } from './ListItemAction';

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
