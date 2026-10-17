'use client';
import './tokens.css';

import { cn } from '../foundations/styles/cn';
import type { DatePickerClassNames } from './types';

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
  /** Classes for the component's rendered parts. */
  classNames?: DatePickerClassNames;
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
  classNames,
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
      className={cn('rt-date-picker-month', 'bg-(--calendar-background) w-full', classNames?.month)}
    >
      <span
        aria-live="polite"
        aria-atomic="true"
        className={cn(
          'rt-date-picker-title',
          'inline-block [font-weight:500] leading-(--calendar-row-height)',
          classNames?.title,
        )}
      >{`${time.getFullMonth(viewDate, locale)} ${viewDate.getFullYear()}`}</span>
      <div
        className={cn(
          'rt-date-picker-week',
          'flex flex-wrap text-(length:--calendar-day-font-size) h-(--calendar-row-height) leading-(--calendar-row-height) opacity-[0.5]',
          '[&>span]:flex-[0_0_calc(100%/7)]',
          classNames?.week,
        )}
      >
        {week.map((day, index) => (
          <span key={index}>{day}</span>
        ))}
      </div>
      <div
        className={cn('rt-date-picker-days', 'flex flex-wrap text-(length:--calendar-day-font-size)', classNames?.days)}
      >
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
            classNames={classNames}
            viewDate={viewDate}
            sundayFirstDayOfWeek={sundayFirstDayOfWeek}
          />
        ))}
      </div>
    </div>
  );
}
