'use client';
import './tokens.css';
import { mergeStyleSlots } from '../foundations/styles/slots';

import { cn } from '../foundations/styles/cn';
import type { DatePickerTheme } from './types';

import React from 'react';
import { range } from '../foundations/collections/range';
import time, { type DatePickerLocale } from '../foundations/date-time/calendar';
import CalendarDay from './CalendarDay';
import isDateDisabled, { type DateConstraints } from './is-date-disabled';
export interface CalendarMonthProps extends DateConstraints {
  locale?: DatePickerLocale;
  onDayClick?: (day: number) => void;
  selectedDate: Date;
  focusedDate?: Date;
  onDayFocus?: (day: number) => void;
  sundayFirstDayOfWeek?: boolean;
  /** Classes for the component's rendered parts. Applied after legacy theme overrides. */
  classNames?: DatePickerTheme;
  /** @deprecated Use classNames for style slots; use ThemeProvider for design tokens. */
  theme?: DatePickerTheme;
  viewDate: Date;
  nodeRef?: React.Ref<HTMLDivElement>;
}
export default function CalendarMonth({
  locale,
  onDayClick,
  selectedDate,
  focusedDate = selectedDate,
  onDayFocus,
  sundayFirstDayOfWeek,
  theme: legacyTheme,
  classNames,
  viewDate,
  nodeRef,
  ...constraints
}: CalendarMonthProps) {
  const theme = mergeStyleSlots(legacyTheme, classNames);
  const days = range(0, 7).map((day) => time.getDayOfWeekLetter(day, locale));
  const week = sundayFirstDayOfWeek ? days : [...days.slice(1), days[0]];
  return (
    <div
      ref={nodeRef}
      data-react-toolbox="month"
      className={cn('rt-date-picker-month', 'bg-(--calendar-background) w-full', theme?.month)}
    >
      <span
        aria-live="polite"
        aria-atomic="true"
        className={cn(
          'rt-date-picker-title',
          'inline-block [font-weight:500] leading-(--calendar-row-height)',
          theme?.title,
        )}
      >{`${time.getFullMonth(viewDate, locale)} ${viewDate.getFullYear()}`}</span>
      <div
        className={cn(
          'rt-date-picker-week',
          'flex flex-wrap text-(length:--calendar-day-font-size) h-(--calendar-row-height) leading-(--calendar-row-height) opacity-[0.5]',
          '[&>span]:flex-[0_0_calc(100%/7)]',
          theme?.week,
        )}
      >
        {week.map((day, index) => (
          <span key={index}>{day}</span>
        ))}
      </div>
      <div className={cn('rt-date-picker-days', 'flex flex-wrap text-(length:--calendar-day-font-size)', theme?.days)}>
        {range(1, time.getDaysInMonth(viewDate) + 1).map((day) => (
          <CalendarDay
            key={day}
            day={day}
            locale={locale}
            disabled={isDateDisabled(new Date(viewDate.getFullYear(), viewDate.getMonth(), day), constraints)}
            onClick={onDayClick}
            onFocus={onDayFocus}
            focused={
              focusedDate.getFullYear() === viewDate.getFullYear() &&
              focusedDate.getMonth() === viewDate.getMonth() &&
              focusedDate.getDate() === day
            }
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
