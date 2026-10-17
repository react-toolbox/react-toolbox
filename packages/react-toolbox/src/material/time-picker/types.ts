/** Optional class overrides for the component's rendered parts. */
export type TimePickerClassNames = Partial<
  Record<
    | 'container'
    | 'active'
    | 'am'
    | 'amFormat'
    | 'ampm'
    | 'button'
    | 'clock'
    | 'clockWrapper'
    | 'dialog'
    | 'disabled'
    | 'face'
    | 'hand'
    | 'header'
    | 'hours'
    | 'hoursDisplay'
    | 'input'
    | 'inputElement'
    | 'knob'
    | 'minutes'
    | 'minutesDisplay'
    | 'number'
    | 'placeholder'
    | 'pm'
    | 'pmFormat'
    | 'separator'
    | 'small'
    | 'zoomInEnter'
    | 'zoomInEnterActive'
    | 'zoomInExit'
    | 'zoomInExitActive'
    | 'zoomOutEnter'
    | 'zoomOutEnterActive'
    | 'zoomOutExit'
    | 'zoomOutExitActive',
    string
  >
>;

/** Accessible names and period labels for the time picker. */
export interface TimePickerLabels {
  dialog: string;
  hours: string;
  minutes: string;
  am: string;
  pm: string;
  clear: string;
  unavailable: string;
}
