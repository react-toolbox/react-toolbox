'use client';
import { activeClasses } from './styles';
import type { DatePickerTheme } from './types';

import { cn } from '../utils/cn';
import time, { type DatePickerLocale } from '../utils/time';
export interface CalendarDayProps {
  day: number;
  disabled?: boolean;
  onClick?: (day: number) => void;
  selectedDate: Date;
  sundayFirstDayOfWeek?: boolean;
  theme?: DatePickerTheme;
  viewDate: Date;
  locale?: DatePickerLocale;
}
export default function CalendarDay({
  day,
  disabled,
  onClick,
  selectedDate,
  sundayFirstDayOfWeek,
  theme,
  viewDate,
  locale,
}: CalendarDayProps) {
  const date = time.setDay(viewDate, day);
  const today = time.cloneAsDate(date).getTime() === time.cloneAsDate(new Date()).getTime();
  const selected =
    viewDate.getFullYear() === selectedDate.getFullYear() &&
    viewDate.getMonth() === selectedDate.getMonth() &&
    day === selectedDate.getDate();
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
        '[flex:0_0_calc(100%_/_7)] p-[var(--calendar-day-padding-topbottom)_var(--calendar-day-padding-leftright)]',
        '[&>span]:rounded-[50%] [&>span]:inline-block [&>span]:h-[var(--calendar-row-height)] [&>span]:leading-[var(--calendar-row-height)] [&>span]:w-[var(--calendar-row-height)]',
        '[&[data-today]:not(.rt-date-picker-active)>span]:text-[color:var(--calendar-primary-color)] [&[data-today]:not(.rt-date-picker-active)>span]:[font-weight:500]',
        '[&>span:focus-visible]:[outline:2px_solid_var(--calendar-primary-color)] [&>span:focus-visible]:[outline-offset:2px]',
        '[&:hover:not(.rt-date-picker-disabled)>span]:cursor-pointer',
        '[&:hover:not(.rt-date-picker-active):not(.rt-date-picker-disabled)>span]:[background:var(--calendar-primary-hover-color)] [&:hover:not(.rt-date-picker-active):not(.rt-date-picker-disabled)>span]:text-[color:var(--calendar-primary-contrast-color)]',
        theme?.day,
        selected && cn(activeClasses, theme?.active),
        disabled &&
          cn(
            'rt-date-picker-disabled',
            '[.rt-date-picker-day&]:opacity-[var(--calendar-day-disable-opacity)]',
            theme?.disabled,
          ),
      )}
      style={day === 1 ? { marginLeft: `${(firstDay >= 0 ? firstDay : 6) * (100 / 7)}%` } : undefined}
    >
      <span
        role="button"
        tabIndex={!disabled && selected ? 0 : -1}
        aria-label={time.formatDate(date, locale)}
        aria-current={today ? 'date' : undefined}
        aria-pressed={selected}
        aria-disabled={disabled || undefined}
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
