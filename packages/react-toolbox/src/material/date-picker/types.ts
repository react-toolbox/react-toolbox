/** Optional class overrides for the component's rendered parts. */
export type DatePickerClassNames = Partial<
  Record<
    | 'container'
    | 'active'
    | 'button'
    | 'calendar'
    | 'calendarWrapper'
    | 'date'
    | 'day'
    | 'days'
    | 'dialog'
    | 'disabled'
    | 'header'
    | 'input'
    | 'inputElement'
    | 'month'
    | 'monthsDisplay'
    | 'next'
    | 'prev'
    | 'slideLeftEnter'
    | 'slideLeftEnterActive'
    | 'slideLeftExit'
    | 'slideLeftExitActive'
    | 'slideRightEnter'
    | 'slideRightEnterActive'
    | 'slideRightExit'
    | 'slideRightExitActive'
    | 'title'
    | 'week'
    | 'year'
    | 'years'
    | 'yearsDisplay',
    string
  >
>;

/** Accessible names for the picker and calendar controls. */
export interface DatePickerLabels {
  dialog: string;
  calendar: string;
  chooseYear: string;
  chooseDay: string;
  previousMonth: string;
  nextMonth: string;
  clear: string;
  unavailable: string;
}
