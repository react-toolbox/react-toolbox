import __ReactToolbox from "../index.d.ts";

export interface SliderTheme {
  container?: string;
  editable?: string;
  innerknob?: string;
  innerprogress?: string;
  input?: string;
  knob?: string;
  pinned?: string;
  pressed?: string;
  progress?: string;
  ring?: string;
  slider?: string;
  snap?: string;
  snaps?: string;
}

interface SliderProps extends __ReactToolbox.Props {
  editable?: boolean;
  max?: number;
  min?: number;
  onChange?: Function;
  pinned?: boolean;
  snaps?: boolean;
  step?: number;
  /**
   * Classnames object defining the component style.
   */
  theme?: SliderTheme;
  value?: number;
}

export class Slider extends __React.Component<SliderProps, {}> { }

export default Slider;
