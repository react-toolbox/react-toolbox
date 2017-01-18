import * as React from "react";
import ReactToolbox from "../index";

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
