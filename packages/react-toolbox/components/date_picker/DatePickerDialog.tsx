'use client';
import type { DatePickerTheme } from './types';

import React, { useEffect, useState } from 'react';
import { cn } from '../utils/cn';
import Dialog, { type DialogProps } from '../dialog/Dialog';
import time, { type DatePickerLocale } from '../utils/time';
import Calendar from './Calendar';
import isDateDisabled, { dayStamp, type DateConstraints } from './is-date-disabled';
const buttonClasses = [
  'rt-date-picker-button',
  '[.rt-date-picker-dialog>nav>&:not([disabled])]:text-[color:var(--datepicker-primary-color)]',
  '[.rt-date-picker-dialog>nav>&:not([disabled]):hover]:[background:var(--datepicker-primary-hover-color)]',
  '[.rt-date-picker-dialog>nav>&:not([disabled]):focus:not(:active)]:[background:var(--datepicker-primary-hover-color)]',
].join(' ');

export type DatePickerSelectEvent = React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>;
export interface DatePickerDialogProps extends DateConstraints {
  active?: boolean;
  autoOk?: boolean;
  cancelLabel?: string;
  className?: string;
  locale?: DatePickerLocale;
  name?: string;
  okLabel?: string;
  onDismiss?: () => void;
  onEscKeyDown?: DialogProps['onEscKeyDown'];
  onOverlayClick?: DialogProps['onOverlayClick'];
  onSelect?: (date: Date, event?: DatePickerSelectEvent) => void;
  sundayFirstDayOfWeek?: boolean;
  theme?: DatePickerTheme;
  value?: Date;
}
export default function DatePickerDialog({
  active = false,
  autoOk,
  cancelLabel = 'Cancel',
  className = '',
  locale,
  name,
  okLabel = 'Ok',
  onDismiss,
  onEscKeyDown,
  onOverlayClick,
  onSelect,
  sundayFirstDayOfWeek,
  theme,
  value,
  ...constraints
}: DatePickerDialogProps) {
  const [initialDate] = useState(() => new Date());
  const sourceDate = value ?? initialDate;
  const clamp = (date: Date) => {
    if (
      (constraints.minDate && dayStamp(date) < dayStamp(constraints.minDate)) ||
      (constraints.maxDate && dayStamp(date) > dayStamp(constraints.maxDate))
    ) {
      if (constraints.minDate && constraints.maxDate)
        return time.closestDate(date, constraints.maxDate, constraints.minDate);
      return constraints.maxDate || constraints.minDate || date;
    }
    return date;
  };
  const [date, setDate] = useState(() => clamp(sourceDate));
  const [display, setDisplay] = useState<'months' | 'years'>('months');
  useEffect(() => {
    setDate(clamp(sourceDate));
    setDisplay('months');
  }, [sourceDate.getTime(), active, constraints.minDate?.getTime(), constraints.maxDate?.getTime()]);
  const select = (event?: DatePickerSelectEvent) => {
    if (!isDateDisabled(date, constraints)) onSelect?.(date, event);
  };
  const switchDisplay = (event: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>) =>
    setDisplay(event.currentTarget.id === 'years' ? 'years' : 'months');
  const displayKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      switchDisplay(event);
    }
  };
  return (
    <Dialog
      actions={[
        { label: cancelLabel, className: cn(buttonClasses, theme?.button), onClick: onDismiss },
        {
          label: okLabel,
          className: cn(buttonClasses, theme?.button),
          name,
          onClick: select,
          disabled: isDateDisabled(date, constraints),
        },
      ]}
      type="custom"
      active={active}
      className={cn(
        'rt-date-picker-dialog',
        'w-[var(--datepicker-dialog-width)]',
        '[&>section]:p-0',
        theme?.dialog,
        className,
      )}
      onEscKeyDown={onEscKeyDown}
      onOverlayClick={onOverlayClick}
      aria-label="Choose date"
    >
      <header
        className={cn(
          'rt-date-picker-header',
          'bg-[var(--datepicker-primary-color)] text-[color:var(--datepicker-primary-contrast-color)] cursor-pointer p-[calc(1.6_*_var(--unit))_calc(2_*_var(--unit))]',
          "[&_[role='button']:focus-visible]:[outline:2px_solid_currentColor] [&_[role='button']:focus-visible]:[outline-offset:2px]",
          theme?.header,
          display === 'months'
            ? cn('rt-date-picker-monthsDisplay', theme?.monthsDisplay)
            : cn('rt-date-picker-yearsDisplay', theme?.yearsDisplay),
        )}
      >
        <span
          id="years"
          role="button"
          tabIndex={0}
          aria-label="Choose year"
          aria-pressed={display === 'years'}
          className={cn(
            'rt-date-picker-year',
            'inline-block text-[length:var(--datepicker-year-font-size)] [transition:opacity,_font-size_var(--animation-duration)_var(--animation-curve-default)]',
            '[.rt-date-picker-yearsDisplay_&]:text-[length:var(--font-size-normal)]',
            '[.rt-date-picker-monthsDisplay_&]:opacity-[var(--datepicker-inactive-opacity)]',
            theme?.year,
          )}
          onClick={switchDisplay}
          onKeyDown={displayKeyDown}
        >
          {date.getFullYear()}
        </span>
        <h3
          id="months"
          role="button"
          tabIndex={0}
          aria-label="Choose day"
          aria-pressed={display === 'months'}
          className={cn(
            'rt-date-picker-date',
            'block text-[length:calc(3.4_*_var(--unit))] [font-weight:var(--font-weight-semi-bold)] leading-[calc(4_*_var(--unit))] m-0 [text-transform:capitalize] [transition:opacity_var(--animation-duration)_var(--animation-curve-default)]',
            '[.rt-date-picker-yearsDisplay_&]:opacity-[var(--datepicker-inactive-opacity)]',
            theme?.date,
          )}
          onClick={switchDisplay}
          onKeyDown={displayKeyDown}
        >{`${time.getShortDayOfWeek(date.getDay(), locale)}, ${time.getShortMonth(date, locale)} ${date.getDate()}`}</h3>
      </header>
      <div
        className={cn(
          'rt-date-picker-calendarWrapper',
          'p-[var(--unit)_calc(0.5_*_var(--unit))_0]',
          theme?.calendarWrapper,
        )}
      >
        <Calendar
          {...constraints}
          display={display}
          handleSelect={select}
          onChange={(next, dayClick) => {
            const clamped = clamp(next);
            setDate(clamped);
            setDisplay('months');
            if (dayClick && autoOk && !isDateDisabled(clamped, constraints)) onSelect?.(clamped);
          }}
          selectedDate={date}
          theme={theme}
          locale={locale}
          sundayFirstDayOfWeek={sundayFirstDayOfWeek}
        />
      </div>
    </Dialog>
  );
}
