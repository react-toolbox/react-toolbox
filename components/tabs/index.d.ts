import __ReactToolbox from "../index.d.ts";

export interface TabsTheme {
  active?: string;
  navigation?: string;
  pointer?: string;
  tabs?: string;
  tab?: string;
}

interface TabsProps extends __ReactToolbox.Props {
  /**
   * Children to pass through the component.
   */
  children?: __React.ReactNode;
  disableAnimatedBottomBorder?: boolean;
  index?: number;
  onChange?: Function;
  /**
   * Classnames object defining the component style.
   */
  theme?: TabsTheme;
}

export class Tabs extends __React.Component<TabsProps, {}> { }

export interface TabTheme {
  active?: string;
  disabled?: string;
  hidden?: string;
  label?: string;
}

interface TabProps extends __ReactToolbox.Props {
  active?: boolean;
  activeClassName?: string;
  disabled?: boolean;
  hidden?: boolean;
  label?: string;
  onActive?: Function;
  /**
   * Classnames object defining the component style.
   */
  theme?: TabTheme;
}

export class Tab extends __React.Component<TabProps, {}> { }
