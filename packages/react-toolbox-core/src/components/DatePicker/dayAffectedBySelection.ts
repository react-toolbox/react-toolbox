import { isSameMonth, isWithinRange } from 'date-fns';
import { PickerDate } from './types';

export default function monthIsAffected(date: Date, selected: PickerDate): boolean {
  if (!selected) {
    return false;
  }

  if (selected instanceof Date && isSameMonth(date, selected)) {
    return true;
  }

  if (!(selected instanceof Date)) {
    const { from, to } = selected;

    if (from && isSameMonth(date, from)) {
      return true;
    }

    if (to && isSameMonth(date, to)) {
      return true;
    }

    if (from && to && isWithinRange(date, from, to)) {
      return true;
    }
  }

  return false;
}
