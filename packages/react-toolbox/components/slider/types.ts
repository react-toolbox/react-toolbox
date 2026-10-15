/** Optional class overrides for the component's rendered parts. */
export type SliderTheme = Partial<
  Record<
    | 'container'
    | 'editable'
    | 'innerknob'
    | 'innerprogress'
    | 'input'
    | 'knob'
    | 'pinned'
    | 'pressed'
    | 'progress'
    | 'ring'
    | 'slider'
    | 'snap'
    | 'snaps',
    string
  >
>;
