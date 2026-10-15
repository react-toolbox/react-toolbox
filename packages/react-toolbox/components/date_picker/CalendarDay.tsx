'use client';

import React from 'react';
import classnames from 'classnames';
import time, { type DatePickerLocale } from '../utils/time';
import defaults from './theme';
export interface CalendarDayProps {
  day: number;
  disabled?: boolean;
  onClick?: (day: number) => void;
  selectedDate: Date;
  sundayFirstDayOfWeek?: boolean;
  theme: typeof defaults;
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
      className={classnames(theme.day, { [theme.active]: selected, [theme.disabled]: disabled })}
      style={
        day === 1 ? { marginLeft: `${(firstDay >= 0 ? firstDay : 6) * (100 / 7)}%` } : undefined
      }
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
