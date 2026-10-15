/** Optional class overrides for the component's rendered parts. */
export type DatePickerTheme = Partial<
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
