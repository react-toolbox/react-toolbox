export interface DateRange {
  from?: Date;
  to?: Date;
}

export type PickerDate = DateRange | Date | undefined;
export type DateChecker = (date: Date) => boolean;
export type FocusedInput = 'START_DATE' | 'END_DATE';
export type PickerMode = 'SINGLE' | 'RANGE';
export type SelectedSource = 'from' | 'to' | null;
