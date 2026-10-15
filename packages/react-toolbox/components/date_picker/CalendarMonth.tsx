'use client';
import { cn } from '../utils/cn';
import type { DatePickerTheme } from './types';

import React from 'react';
import { range } from '../utils/utils';
import time, { type DatePickerLocale } from '../utils/time';
import CalendarDay from './CalendarDay';
import isDateDisabled, { type DateConstraints } from './is-date-disabled';
export interface CalendarMonthProps extends DateConstraints {
  locale?: DatePickerLocale;
  onDayClick?: (day: number) => void;
  selectedDate: Date;
  sundayFirstDayOfWeek?: boolean;
  theme?: DatePickerTheme;
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
    <div
      ref={nodeRef}
      data-react-toolbox="month"
      className={cn('rt-date-picker-month', 'bg-[var(--calendar-primary-contrast-color)] w-full', theme?.month)}
    >
      <span
        className={cn(
          'rt-date-picker-title',
          'inline-block [font-weight:500] leading-[var(--calendar-row-height)]',
          theme?.title,
        )}
      >{`${time.getFullMonth(viewDate, locale)} ${viewDate.getFullYear()}`}</span>
      <div
        className={cn(
          'rt-date-picker-week',
          'flex [flex-wrap:wrap] text-[length:var(--calendar-day-font-size)] h-[var(--calendar-row-height)] leading-[var(--calendar-row-height)] opacity-[0.5]',
          '[&>span]:[flex:0_0_calc(100%_/_7)]',
          theme?.week,
        )}
      >
        {week.map((day, index) => (
          <span key={index}>{day}</span>
        ))}
      </div>
      <div
        className={cn(
          'rt-date-picker-days',
          'flex [flex-wrap:wrap] text-[length:var(--calendar-day-font-size)]',
          theme?.days,
        )}
      >
        {range(1, time.getDaysInMonth(viewDate) + 1).map((day) => (
          <CalendarDay
            key={day}
            day={day}
            locale={locale}
            disabled={isDateDisabled(new Date(viewDate.getFullYear(), viewDate.getMonth(), day), constraints)}
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
