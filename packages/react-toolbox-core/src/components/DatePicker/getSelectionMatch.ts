import { PickerDate, SelectedSource } from './types';
import {
  addMonths,
  endOfMonth,
  startOfMonth,
  isBefore,
  isSameDay,
  isSameMonth,
  isWithinRange,
} from 'date-fns';


export interface SelectionMatch {
  inRange: boolean;
  selected: boolean;
  source: SelectedSource;
}

export function getDayToCompare(day: Date, viewDate: Date): Date {
  if (isSameMonth(day, viewDate)) {
    return day;
  }

  if (isBefore(day, viewDate)) {
    return startOfMonth(viewDate);
  }

  return endOfMonth(viewDate);
}

export function equalSelectionMatch(match1: SelectionMatch, match2: SelectionMatch): boolean {
  return (match1.inRange === match2.inRange) &&
    (match1.selected === match2.selected) &&
    (match1.source === match2.source);
}

export default function getSelectionMatch(day: Date, selected: PickerDate): SelectionMatch {
  if (!selected) {
    return { inRange: false, selected: false, source: null };
  }

  if (selected instanceof Date && isSameDay(selected, day)) {
    return { inRange: false, selected: true, source: null };
  }

  if (!(selected instanceof Date)) {
    const { from, to } = selected;

    if (from && isSameDay(day, from)) {
      return { inRange: false, selected: true, source: 'from' };
    }

    if (to && isSameDay(day, to)) {
      return { inRange: false, selected: true, source: 'to' };
    }

    if (from && to && isWithinRange(day, from, to)) {
      return { inRange: true, selected: false, source: null };
    }
  }

  return { inRange: false, selected: false, source: null };
}
