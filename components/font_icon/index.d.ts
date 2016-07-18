import __ReactToolbox from "../index.d.ts";

interface FontIconProps extends __ReactToolbox.Props {
  /**
   * Children to pass through the component.
   */
  children?: __React.ReactNode;
  value?: __React.ReactNode | string;
}

export class FontIcon extends __React.Component<FontIconProps, {}> { }

export default FontIcon;
