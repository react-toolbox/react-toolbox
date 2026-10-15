'use client';

import React from 'react';
import { range } from '../utils/utils';
import time, { type DatePickerLocale } from '../utils/time';
import CalendarDay from './CalendarDay';
import isDateDisabled, { type DateConstraints } from './is-date-disabled';
import defaults from './theme';
export interface CalendarMonthProps extends DateConstraints {
  locale?: DatePickerLocale;
  onDayClick?: (day: number) => void;
  selectedDate: Date;
  sundayFirstDayOfWeek?: boolean;
  theme: typeof defaults;
  viewDate: Date;
  nodeRef?: React.Ref<HTMLDivElement>;
}
export default function CalendarMonth({
  locale,
  onDayClick,
  selectedDate,
  sundayFirstDayOfWeek,
  theme,
  viewDate,
  nodeRef,
  ...constraints
}: CalendarMonthProps) {
  const days = range(0, 7).map((day) => time.getDayOfWeekLetter(day, locale));
  const week = sundayFirstDayOfWeek ? days : [...days.slice(1), days[0]];
  return (
    <div ref={nodeRef} data-react-toolbox="month" className={theme.month}>
      <span
        className={theme.title}
      >{`${time.getFullMonth(viewDate, locale)} ${viewDate.getFullYear()}`}</span>
      <div className={theme.week}>
        {week.map((day, index) => (
          <span key={index}>{day}</span>
        ))}
      </div>
      <div className={theme.days}>
        {range(1, time.getDaysInMonth(viewDate) + 1).map((day) => (
          <CalendarDay
            key={day}
            day={day}
            locale={locale}
            disabled={isDateDisabled(
              new Date(viewDate.getFullYear(), viewDate.getMonth(), day),
              constraints,
            )}
            onClick={onDayClick}
            selectedDate={selectedDate}
            theme={theme}
            viewDate={viewDate}
            sundayFirstDayOfWeek={sundayFirstDayOfWeek}
          />
        ))}
      </div>
    </div>
  );
}
