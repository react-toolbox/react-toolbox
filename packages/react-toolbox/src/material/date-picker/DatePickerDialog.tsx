'use client';
import { mergeStyleSlots } from '../foundations/styles/slots';

import type { DatePickerTheme } from './types';

import React, { useEffect, useState } from 'react';
import { cn } from '../foundations/styles/cn';
import Dialog, { type DialogProps } from '../dialog/Dialog';
import time, { type DatePickerLocale } from '../foundations/date-time/calendar';
import Calendar from './Calendar';
import isDateDisabled, { dayStamp, type DateConstraints } from './is-date-disabled';
const buttonClasses = [
  'rt-date-picker-button',
  '[.rt-date-picker-dialog>nav>&:not([disabled])]:text-(--datepicker-primary-color)',
  '[.rt-date-picker-dialog>nav>&:not([disabled]):hover]:[background:var(--datepicker-primary-hover-color)]',
  '[.rt-date-picker-dialog>nav>&:not([disabled]):focus:not(:active)]:[background:var(--datepicker-primary-hover-color)]',
].join(' ');

export type DatePickerSelectEvent = React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>;
export interface DatePickerDialogProps extends DateConstraints {
  active?: boolean;
  autoOk?: boolean;
  cancelLabel?: string;
  className?: string;
  id?: string;
  locale?: DatePickerLocale;
  name?: string;
  okLabel?: string;
  onDismiss?: () => void;
  onEscKeyDown?: DialogProps['onEscKeyDown'];
  onOverlayClick?: DialogProps['onOverlayClick'];
  onSelect?: (date: Date, event?: DatePickerSelectEvent) => void;
  sundayFirstDayOfWeek?: boolean;
  /** Classes for the component's rendered parts. Applied after legacy theme overrides. */
  classNames?: DatePickerTheme;
  /** @deprecated Use classNames for style slots; use ThemeProvider for design tokens. */
  theme?: DatePickerTheme;
  value?: Date;
}
export default function DatePickerDialog({
  active = false,
  autoOk,
  cancelLabel = 'Cancel',
  className = '',
  id,
  locale,
  name,
  okLabel = 'Ok',
  onDismiss,
  onEscKeyDown,
  onOverlayClick,
  onSelect,
  sundayFirstDayOfWeek,
  theme: legacyTheme,
  classNames,
  value,
  ...constraints
}: DatePickerDialogProps) {
  const theme = mergeStyleSlots(legacyTheme, classNames);
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
    setDisplay(event.currentTarget.dataset.display === 'years' ? 'years' : 'months');
  const displayKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      switchDisplay(event);
    }
  };
  return (
    <Dialog
      id={id}
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
        'w-(--datepicker-dialog-width)',
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
          'bg-(--datepicker-primary-color) text-(--datepicker-primary-contrast-color) cursor-pointer p-[calc(1.6*var(--unit))_calc(2*var(--unit))]',
          "[&_[role='button']:focus-visible]:[outline:2px_solid_currentColor] [&_[role='button']:focus-visible]:outline-offset-2",
          theme?.header,
          display === 'months'
            ? cn('rt-date-picker-monthsDisplay', theme?.monthsDisplay)
            : cn('rt-date-picker-yearsDisplay', theme?.yearsDisplay),
        )}
      >
        <span
          data-display="years"
          role="button"
          tabIndex={0}
          aria-label="Choose year"
          aria-pressed={display === 'years'}
          className={cn(
            'rt-date-picker-year',
            'inline-block text-(length:--datepicker-year-font-size) pt-[8px] -mt-[8px] [transition:opacity,font-size_var(--animation-duration)_var(--animation-curve-default)]',
            '[.rt-date-picker-yearsDisplay_&]:text-(length:--font-size-normal)',
            '[.rt-date-picker-monthsDisplay_&]:opacity-(--datepicker-year-inactive-opacity)',
            theme?.year,
          )}
          onClick={switchDisplay}
          onKeyDown={displayKeyDown}
        >
          {date.getFullYear()}
        </span>
        <h3
          data-display="months"
          role="button"
          tabIndex={0}
          aria-label="Choose day"
          aria-pressed={display === 'months'}
          className={cn(
            'rt-date-picker-date',
            'block text-[calc(3.4*var(--unit))] font-(--font-weight-semi-bold) leading-[calc(4*var(--unit))] m-0 capitalize [transition:opacity_var(--animation-duration)_var(--animation-curve-default)]',
            '[.rt-date-picker-yearsDisplay_&]:opacity-(--datepicker-inactive-opacity)',
            theme?.date,
          )}
          onClick={switchDisplay}
          onKeyDown={displayKeyDown}
        >{`${time.getShortDayOfWeek(date.getDay(), locale)}, ${time.getShortMonth(date, locale)} ${date.getDate()}`}</h3>
      </header>
      <div
        className={cn(
          'rt-date-picker-calendarWrapper',
          'p-[var(--unit)_calc(0.5*var(--unit))_0]',
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
