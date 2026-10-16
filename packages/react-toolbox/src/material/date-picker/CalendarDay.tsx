'use client';
import './tokens.css';
import { mergeStyleSlots } from '../foundations/styles/slots';

import { activeClasses } from './styles';
import type { DatePickerTheme } from './types';

import { cn } from '../foundations/styles/cn';
import time, { type DatePickerLocale } from '../foundations/date-time/calendar';
export interface CalendarDayProps {
  day: number;
  disabled?: boolean;
  onClick?: (day: number) => void;
  onFocus?: (day: number) => void;
  focused?: boolean;
  selected?: boolean;
  /** Table calendars provide their own leading empty cells. */
  withOffset?: boolean;
  /** Keep unavailable dates discoverable with calendar keyboard navigation. */
  focusableDisabled?: boolean;
  selectedDate: Date;
  sundayFirstDayOfWeek?: boolean;
  /** Classes for the component's rendered parts. Applied after legacy theme overrides. */
  classNames?: DatePickerTheme;
  /** @deprecated Use classNames for style slots; use ThemeProvider for design tokens. */
  theme?: DatePickerTheme;
  viewDate: Date;
  locale?: DatePickerLocale;
}
export default function CalendarDay({
  day,
  disabled,
  onClick,
  onFocus,
  focused,
  selected: selectedOverride,
  withOffset = true,
  focusableDisabled = false,
  selectedDate,
  sundayFirstDayOfWeek,
  theme: legacyTheme,
  classNames,
  viewDate,
  locale,
}: CalendarDayProps) {
  const theme = mergeStyleSlots(legacyTheme, classNames);
  const date = time.setDay(viewDate, day);
  const today = time.cloneAsDate(date).getTime() === time.cloneAsDate(new Date()).getTime();
  const selected =
    selectedOverride ??
    (viewDate.getFullYear() === selectedDate.getFullYear() &&
      viewDate.getMonth() === selectedDate.getMonth() &&
      day === selectedDate.getDate());
  const firstDay = time.getFirstWeekDay(viewDate) - (sundayFirstDayOfWeek ? 0 : 1);
  const click = () => {
    if (!disabled) onClick?.(day);
  };
  return (
    <div
      data-react-toolbox="day"
      data-today={today || undefined}
      className={cn(
        'rt-date-picker-day',
        'flex-[0_0_calc(100%/7)] p-[var(--calendar-day-padding-topbottom)_var(--calendar-day-padding-leftright)]',
        '[&>span]:rounded-[50%] [&>span]:inline-block [&>span]:h-(--calendar-row-height) [&>span]:leading-(--calendar-row-height) [&>span]:w-(--calendar-row-height)',
        '[&[data-today]:not(.rt-date-picker-active)>span]:text-(--calendar-primary-color) [&[data-today]:not(.rt-date-picker-active)>span]:[font-weight:500]',
        '[&>span:focus-visible]:[outline:2px_solid_var(--calendar-primary-color)] [&>span:focus-visible]:outline-offset-2',
        '[&:hover:not(.rt-date-picker-disabled)>span]:cursor-pointer',
        '[&:hover:not(.rt-date-picker-active):not(.rt-date-picker-disabled)>span]:[background:var(--calendar-primary-hover-color)] [&:hover:not(.rt-date-picker-active):not(.rt-date-picker-disabled)>span]:text-(--calendar-primary-contrast-color)',
        theme?.day,
        selected && cn(activeClasses, theme?.active),
        disabled &&
          cn(
            'rt-date-picker-disabled',
            '[.rt-date-picker-day&]:opacity-(--calendar-day-disable-opacity)',
            theme?.disabled,
          ),
      )}
      style={withOffset && day === 1 ? { marginLeft: `${(firstDay >= 0 ? firstDay : 6) * (100 / 7)}%` } : undefined}
    >
      <span
        role="button"
        tabIndex={(!disabled || focusableDisabled) && (focused ?? selected) ? 0 : -1}
        aria-label={time.formatDate(date, locale)}
        aria-current={today ? 'date' : undefined}
        aria-pressed={selected}
        aria-disabled={disabled || undefined}
        onFocus={() => onFocus?.(day)}
        onClick={click}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            event.stopPropagation();
            click();
          }
        }}
      >
        {day}
      </span>
    </div>
  );
}
