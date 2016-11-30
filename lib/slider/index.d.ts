import * as React from "react";
import ReactToolbox from "../index";

export interface SliderTheme {
  /**
   * Used as an inner container of the root component.
   */
  container?: string;
  /**
   * Added to the root of in case the Slider is editable.
   */
  editable?: string;
  /**
   * Used to style the inner element of the knob.
   */
  innerknob?: string;
  /**
   * Provided to the ProgressBar component.
   */
  innerprogress?: string;
  /**
   * Provided to the Input element in case it's editable.
   */
  input?: string;
  /**
   * Used to style the outer layer of the knob.
   */
  knob?: string;
  /**
   * Added to the root in case the Slider is pinned.
   */
  pinned?: string;
  /**
   * Added to the root in case the state is pressed.
   */
  pressed?: string;
  /**
   * Used as an outer wrapper for the ProgressBar.
   */
  progress?: string;
  /**
   * Used in the root when the knob should be a ring.
   */
  ring?: string;
  /**
   * Class used for the root element.
   */
  slider?: string;
  /**
   * Used for every individual snap element.
   */
  snap?: string;
  /**
   * Used as a wrapper for the group of snaps when it's snapped.
   */
  snaps?: string;
}

interface SliderProps extends ReactToolbox.Props {
  /**
   * If true, an input is shown and the user can set the slider from keyboard value.
   * @default false
   */
  editable?: boolean;
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
   * Callback function that will be invoked when the slider value changes.
   */
  onChange?: Function;
  /**
   * If true, a pin with numeric value label is shown when the slider thumb is pressed. Use for settings for which users need to know the exact value of the setting.
   * @default false
   */
  pinned?: boolean;
  /**
   * If true, the slider thumb snaps to tick marks evenly spaced based on the step property value.
   * @default false
   */
  snaps?: boolean;
  /**
   * Amount to vary the value when the knob is moved or increase/decrease is called.
   * @default 0.01
   */
  step?: number;
  /**
   * Classnames object defining the component style.
   */
  theme?: SliderTheme;
  /**
   * Current value of the slider.
   * @default 0
   */
  value?: number;
}

export class Slider extends React.Component<SliderProps, {}> { }

export default Slider;
