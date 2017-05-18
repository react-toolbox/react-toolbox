import { PickerDate, SelectedSource } from './types';
import {
  isBefore,
  isSameDay,
  isSameMonth,
  isWithinRange,
  startOfMonth,
  endOfMonth,
} from 'date-fns';

export interface SelectionMatch {
  inRange: boolean;
  selected: boolean;
  source: SelectedSource;
}

export function equalSelectionMatch(match1: SelectionMatch, match2: SelectionMatch): boolean {
  return (match1.inRange === match2.inRange) &&
    (match1.selected === match2.selected) &&
    (match1.source === match2.source);
}

export default function getSelectionMatch(
  day: Date,
  selected: PickerDate,
  viewDate: Date,
): SelectionMatch {
  if (!selected) {
    return { inRange: false, selected: false, source: null };
  }

  if (selected instanceof Date && isSameDay(selected, day)) {
    return { inRange: false, selected: true, source: null };
  }

  if (!(selected instanceof Date)) {
    const { from, to } = selected;
    const isOutOfRange = from && to && !isSameMonth(day, viewDate);
    const dayToCompare = isOutOfRange ? getDayToCompare(day, viewDate) : day;

    // Check if it is selected
    if (from && isSameDay(day, from) && !isOutOfRange) {
      return { inRange: false, selected: true, source: 'from' };
    }

    if (to && isSameDay(day, to) && !isOutOfRange) {
      return { inRange: false, selected: true, source: 'to' };
    }

    // Check when it is a day out of range
    if (isOutOfRange) {
      if (isBefore(day, viewDate)) {
        if (from && isSameDay(dayToCompare, from)) {
          return { inRange: false, selected: false, source: null };
        }
      } else if (to && isSameDay(dayToCompare, to)) {
        return { inRange: false, selected: false, source: null };
      }
    }

    // Check when it is within range
    if (from && to && isWithinRange(dayToCompare, from, to)) {
      return { inRange: true, selected: false, source: null };
    }
  }

  return { inRange: false, selected: false, source: null };
}

function getDayToCompare(day: Date, viewDate: Date): Date {
  return isBefore(day, viewDate)
    ? startOfMonth(viewDate)
    : endOfMonth(viewDate);
}
