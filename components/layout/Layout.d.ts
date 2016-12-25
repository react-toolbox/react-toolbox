import * as React from "react";
import ReactToolbox from "../index";
import { NavDrawer } from './NavDrawer';
import { Panel } from './Panel';
import { Sidebar } from './Sidebar';

export interface LayoutTheme {
  /**
   * Class used in the container to position and align inner items.
   */
  layout?: string;
}

export interface LayoutProps extends ReactToolbox.Props {
  /**
   * Children to pass through the component.
   */
  children?: [NavDrawer | Panel | Sidebar];
  /**
   * Classnames object defining the component style.
   */
  theme?: LayoutTheme;
}

export class Layout extends React.Component<LayoutProps, {}> { }
