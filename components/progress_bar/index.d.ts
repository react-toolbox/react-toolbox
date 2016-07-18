import __ReactToolbox from "../index.d.ts";

export interface ProgressBarTheme {
  buffer?: string;
  circle?: string;
  circular?: string;
  indeterminate?: string;
  linear?: string;
  multicolor?: string;
  path?: string;
  value?: string;
}

interface ProgressBarProps extends __ReactToolbox.Props {
  buffer?: number;
  max?: number;
  min?: number;
  mode?: "determinate" | "indeterminate";
  multicolor?: boolean;
  /**
   * Classnames object defining the component style.
   */
  theme?: ProgressBarTheme;
  type?: "linear" | "circular";
  value?: number;
}

export class ProgressBar extends __React.Component<ProgressBarProps, {}> { }

export default ProgressBar;
