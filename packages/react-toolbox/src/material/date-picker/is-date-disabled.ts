import time from '../foundations/date-time/calendar';
export interface DateConstraints {
  minDate?: Date;
  maxDate?: Date;
  enabledDates?: readonly Date[];
  disabledDates?: readonly Date[];
}
// Picker constraints describe calendar days, regardless of the time carried by a Date.
export const dayStamp = (date: Date) => time.cloneAsDate(date).getTime();
export default function isDateDisabled(
  date: Date,
  { minDate, maxDate, enabledDates = [], disabledDates = [] }: DateConstraints,
) {
  const value = dayStamp(date);
  return Boolean(
    (minDate && value < dayStamp(minDate)) ||
      (maxDate && value > dayStamp(maxDate)) ||
      (enabledDates.length > 0 && !enabledDates.some((day) => dayStamp(day) === value)) ||
      disabledDates.some((day) => dayStamp(day) === value),
  );
}
