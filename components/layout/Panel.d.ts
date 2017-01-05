import * as React from "react";
import ReactToolbox from "../index";

export interface PanelTheme {
  /**
   * Used in the root class in case the panel has bodyScroll.
   */
  bodyScroll?: string;
  /**
   * Used as the root class of the panel component.
   */
  panel?: string;
}

export interface PanelProps extends ReactToolbox.Props {
  /**
   * You can set it to true in case you are using a pinned Sidebar so it takes an scrolled `div` instead of using the document scroll.
   */
  bodyScroll?: boolean;
  /**
   * Classnames object defining the component style.
   */
  theme?: PanelTheme;
}

export class Panel extends React.Component<PanelProps, {}> { }
