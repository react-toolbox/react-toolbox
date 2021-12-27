import * as React from "react";
import ReactToolbox from "../index";

export interface RadioGroupProps extends ReactToolbox.Props {
  /**
   * Children to pass through the component.
   */
  children?: React.ReactNode;
  /**
   * If true, the group will be displayed as disabled.
   * @default false
   */
  disabled?: boolean;
  /**
   * Name for the input element group.
   */
  name?: string;
  /**
   * Callback function that will be invoked when the value changes.
   */
  onChange?: Function;
  /**
   * Default value selected in the radio group.
   */
  value?: any;
}

export class RadioGroup extends React.Component<RadioGroupProps, {}> { }
