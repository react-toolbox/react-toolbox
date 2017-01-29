import * as React from "react";
import ReactToolbox from "../index";
import { TabTheme } from './Tab';
import { TabContentTheme } from './TabContent';

export interface TabsTheme extends TabTheme, TabContentTheme {
  /**
   * Class used for arrows.
   */
  arrow?: string;
  /**
   * Class used for arrow container.
   */
  arrowContainer?: string;
  /**
   * Class used when 'disableAnimatedBottomBorder' is true.
   */
  disableAnimation?: string;
  /**
   * Used to make the 'fixed tabs'.
   */
  fixed?: string;
  /**
   * Used to invert the colors.
   */
  inverse?: string;
  /**
   * Used for the navigation element.
   */
  navigation?: string;
  /**
   * Used for navigation container.
   */
  navigationContainer?: string;
  /**
   * Used for the moving underline element.
   */
  pointer?: string;
  /**
   * Used as a root classname for the component.
   */
  tabs?: string;
}

export interface TabsProps extends ReactToolbox.Props {
  /**
   * Children to pass through the component.
   */
  children?: React.ReactNode;
  /**
   * Disable the animation below the active tab.
   * @default false
   */
  disableAnimatedBottomBorder?: boolean;
  /**
   * Current
   * @default 0
   */
  index?: number;
  /**
   * `unmounted` mode will not mount the tab content of inactive tabs.
   * `display` mode will mount but hide inactive tabs.
   * Consider holding state outside of the Tabs component before using `display` mode
   * @default unmounted
   */
  hideMode?: 'display' | 'unmounted';
  /**
   * If True, the tabs will have an inverse style.
   */
  inverse?: boolean;
  /**
   * If True, the tabs will be fixed, covering the whole width.
   */
  fixed?: boolean;
  /**
   * Callback function that is fired when the tab changes.
   */
  onChange?: Function;
  /**
   * Classnames object defining the component style.
   */
  theme?: TabsTheme;
}

export class Tabs extends React.Component<TabsProps, {}> { }

export default Tabs;
