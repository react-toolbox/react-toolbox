import * as React from "react";
import ReactToolbox from "../index";

export interface ProgressBarTheme {
  /**
   * Used to style the buffer element in the linear progress.
   */
  buffer?: string;
  /**
   * Used for the circle element in the circular progress.
   */
  circle?: string;
  /**
   * Used for the root element when the type is circular.
   */
  circular?: string;
  /**
   * Added to the root element if mode is indeterminate.
   */
  indeterminate?: string;
  /**
   * Used for the root element when the type is linear.
   */
  linear?: string;
  /**
   * Added to the root if the component is multicolor (circular).
   */
  multicolor?: string;
  /**
   * Used for the inner path in the circular progress.
   */
  path?: string;
  /**
   * Used to style the value element in the linear progress.
   */
  value?: string;
}

interface ProgressBarProps extends ReactToolbox.Props {
  /**
   * Value of a secondary progress bar useful for buffering.
   * @default 0
   */
  buffer?: number;
  /**
   * If true, component will be disabled.
   * @default false
   */
  disabled?: boolean;
  /**
   * Maximum value permitted.
   * @default 100
   */
  max?: number;
  /**
   * Minimum value permitted.
   * @default 0
   */
  min?: number;
  /**
   * Mode of the progress bar, it can be determinate or indeterminate.
   * @default indeterminate
   */
  mode?: "determinate" | "indeterminate";
  /**
   * If true, the circular progress bar will be changing its color.
   * @default false
   */
  multicolor?: boolean;
  /**
   * Classnames object defining the component style.
   */
  theme?: ProgressBarTheme;
  /**
   * Type of the progress bar, it can be circular or linear.
   * @default linear
   */
  type?: "linear" | "circular";
  /**
   * Value of the current progress.
   * @default 0
   */
  value?: number;
}

export class ProgressBar extends React.Component<ProgressBarProps, {}> { }

export default ProgressBar;
