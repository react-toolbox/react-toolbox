import * as React from "react";
import ReactToolbox from "../index";

export interface PanelTheme {
  /**
   * Used as the root class of the panel component.
   */
  panel?: string;
  /**
   * Used in case the panel is scrollable.
   */
  scrollY?: string;
}

export interface PanelProps extends ReactToolbox.Props {
  /**
   * Children to pass through the component.
   */
  children?: React.ReactNode;
  /**
   * Callback function to be invoked when the component scrolls.
   */
  onScroll?: Function;
  /**
   * If true, the panel will vertically scroll all content.
   * @default false
   */
  scrollY?: boolean;
  /**
   * Classnames object defining the component style.
   */
  theme?: PanelTheme;
}

export class Panel extends React.Component<PanelProps, {}> { }
