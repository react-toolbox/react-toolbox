export interface DateRange {
  from?: Date,
  to?: Date,
};

export type DateChecker = (date: Date) => boolean;
export type PickerDate = DateRange | Date;
export type SelectedSource = 'from' | 'to' | null;
export type FocusedInput = 'START_DATE' | 'END_DATE';
