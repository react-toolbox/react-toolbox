'use client';
import './tokens.css';

import { cn } from '../foundations/styles/cn';

import React from 'react';
import { range } from '../foundations/collections/range';
import time, { type DatePickerLocale } from '../foundations/date-time/calendar';
import CalendarDay from './CalendarDay';
import isDateDisabled, { dayStamp, type DateConstraints } from './is-date-disabled';
export interface CalendarMonthProps extends DateConstraints {
  className?: string;
  locale?: DatePickerLocale;
  onDayClick?: (day: number) => void;
  selectedDate: Date;
  focusedDate?: Date;
  onDayFocus?: (day: number) => void;
  sundayFirstDayOfWeek?: boolean;
  viewDate: Date;
}
export default function CalendarMonth({
  className,
  locale,
  onDayClick,
  selectedDate,
  focusedDate = selectedDate,
  onDayFocus,
  sundayFirstDayOfWeek,
  viewDate,
  ...constraints
}: CalendarMonthProps) {
  const days = range(0, 7).map((day) => time.getDayOfWeekLetter(day, locale));
  const week = sundayFirstDayOfWeek ? days : [...days.slice(1), days[0]];
  return (
    <div
      data-react-toolbox="month"
      className={cn('rt-date-picker-month', 'bg-(--calendar-background) w-full', className)}
    >
      <span
        aria-live="polite"
        aria-atomic="true"
        className={cn('rt-date-picker-title', 'inline-block [font-weight:500] leading-(--calendar-row-height)')}
      >{`${time.getFullMonth(viewDate, locale)} ${viewDate.getFullYear()}`}</span>
      <div
        className={cn(
          'rt-date-picker-week',
          'flex flex-wrap text-(length:--calendar-day-font-size) h-(--calendar-row-height) leading-(--calendar-row-height) opacity-[0.5]',
          '[&>span]:flex-[0_0_calc(100%/7)]',
        )}
      >
        {week.map((day, index) => (
          <span key={index}>{day}</span>
        ))}
      </div>
      <div className={cn('rt-date-picker-days', 'flex flex-wrap text-(length:--calendar-day-font-size)')}>
        {range(1, time.getDaysInMonth(viewDate) + 1).map((day) => {
          const date = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
          const withinBounds =
            (!constraints.minDate || dayStamp(date) >= dayStamp(constraints.minDate)) &&
            (!constraints.maxDate || dayStamp(date) <= dayStamp(constraints.maxDate));
          return (
            <CalendarDay
              key={day}
              day={day}
              focusableDisabled={withinBounds}
              locale={locale}
              disabled={isDateDisabled(date, constraints)}
              onClick={onDayClick}
              onFocus={onDayFocus}
              focused={
                focusedDate.getFullYear() === viewDate.getFullYear() &&
                focusedDate.getMonth() === viewDate.getMonth() &&
                focusedDate.getDate() === day
              }
              selectedDate={selectedDate}
              viewDate={viewDate}
              sundayFirstDayOfWeek={sundayFirstDayOfWeek}
            />
          );
        })}
      </div>
    </div>
  );
}
