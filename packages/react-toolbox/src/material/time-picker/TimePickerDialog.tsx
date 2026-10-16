'use client';
import { mergeStyleSlots } from '../foundations/styles/slots';

import type { TimePickerTheme } from './types';

import React, { useEffect, useRef, useState } from 'react';
import { cn } from '../foundations/styles/cn';
import Dialog, { type DialogProps } from '../dialog/Dialog';
import time, { type TimeFormat } from '../foundations/date-time/calendar';
import Clock, { type ClockHandle } from './Clock';
const buttonClasses = [
  'rt-time-picker-button',
  '[.rt-time-picker-dialog>nav>&:not([disabled])]:text-(--timepicker-primary-color)',
  '[.rt-time-picker-dialog>nav>&:not([disabled]):hover]:[background:var(--timepicker-primary-hover-color)]',
  '[.rt-time-picker-dialog>nav>&:not([disabled]):focus:not(:active)]:[background:var(--timepicker-primary-hover-color)]',
].join(' ');

export type TimePickerSelectEvent = React.MouseEvent<HTMLElement>;
export interface TimePickerDialogProps {
  active?: boolean;
  cancelLabel?: string;
  className?: string;
  id?: string;
  format?: TimeFormat;
  name?: string;
  okLabel?: string;
  onDismiss?: () => void;
  onEscKeyDown?: DialogProps['onEscKeyDown'];
  onOverlayClick?: DialogProps['onOverlayClick'];
  onSelect?: (value: Date, event?: TimePickerSelectEvent) => void;
  /** Classes for the component's rendered parts. Applied after legacy theme overrides. */
  classNames?: TimePickerTheme;
  /** @deprecated Use classNames for style slots; use ThemeProvider for design tokens. */
  theme?: TimePickerTheme;
  value?: Date;
}
export default function TimePickerDialog({
  active = false,
  cancelLabel = 'Cancel',
  className,
  format = '24hr',
  id,
  name,
  okLabel = 'Ok',
  onDismiss,
  onEscKeyDown,
  onOverlayClick,
  onSelect,
  theme: legacyTheme,
  classNames,
  value,
}: TimePickerDialogProps) {
  const theme = mergeStyleSlots(legacyTheme, classNames);
  const [initialTime] = useState(() => new Date());
  const sourceTime = value ?? initialTime;
  const [displayTime, setTime] = useState(() => new Date(sourceTime.getTime()));
  const [display, setDisplay] = useState<'hours' | 'minutes'>('hours');
  const clock = useRef<ClockHandle>(null);
  useEffect(() => setTime(new Date(sourceTime.getTime())), [sourceTime.getTime(), active]);
  useEffect(() => {
    if (active) clock.current?.calculateShape();
  }, [active]);
  const toggleMode = (mode: 'am' | 'pm') =>
    setTime((previous) => {
      const next = new Date(previous.getTime());
      next.setHours((next.getHours() % 12) + (mode === 'pm' ? 12 : 0));
      return next;
    });
  const switchDisplay = (event: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>) =>
    setDisplay(event.currentTarget.id === 'hours' ? 'hours' : 'minutes');
  const keyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      switchDisplay(event);
      return;
    }
    if (!['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const nextDisplay = event.currentTarget.id === 'hours' ? 'hours' : 'minutes';
    const key = event.key;
    setDisplay(nextDisplay);
    setTime((previous) => {
      const next = new Date(previous.getTime());
      const hours = nextDisplay === 'hours',
        twelveHour = hours && format === 'ampm';
      const minimum = twelveHour ? 1 : 0,
        maximum = hours ? (twelveHour ? 12 : 23) : 59;
      const current = hours ? (twelveHour ? next.getHours() % 12 || 12 : next.getHours()) : next.getMinutes();
      const step = key === 'ArrowUp' || key === 'ArrowRight' ? 1 : -1;
      const number =
        key === 'Home'
          ? minimum
          : key === 'End'
            ? maximum
            : minimum + ((current - minimum + step + maximum - minimum + 1) % (maximum - minimum + 1));
      if (hours) next.setHours(twelveHour ? (number % 12) + (next.getHours() >= 12 ? 12 : 0) : number);
      else next.setMinutes(number);
      return next;
    });
  };
  const hours = format === 'ampm' ? displayTime.getHours() % 12 || 12 : displayTime.getHours();
  return (
    <Dialog
      id={id}
      actions={[
        { label: cancelLabel, className: cn(buttonClasses, theme?.button), onClick: onDismiss },
        {
          label: okLabel,
          className: cn(buttonClasses, theme?.button),
          name,
          onClick: (event) => onSelect?.(displayTime, event),
        },
      ]}
      active={active}
      className={cn(
        'rt-time-picker-dialog',
        'w-(--timepicker-dialog-width)',
        '[&>section]:p-0',
        theme?.dialog,
        display === 'hours'
          ? cn('rt-time-picker-hoursDisplay', theme?.hoursDisplay)
          : cn('rt-time-picker-minutesDisplay', theme?.minutesDisplay),
        time.getTimeMode(displayTime) === 'am'
          ? cn('rt-time-picker-amFormat', theme?.amFormat)
          : cn('rt-time-picker-pmFormat', theme?.pmFormat),
        className,
      )}
      onEscKeyDown={onEscKeyDown}
      onOverlayClick={onOverlayClick}
      aria-label="Choose time"
    >
      <header
        className={cn(
          'rt-time-picker-header',
          '[background:var(--timepicker-primary-color)] text-(--timepicker-primary-contrast-color) text-(length:--timepicker-header-font-size) p-(--timepicker-header-padding) relative text-center w-full',
          "[&_[role='spinbutton']:focus-visible]:[outline:2px_solid_currentColor] [&_[role='spinbutton']:focus-visible]:outline-offset-2",
          "[&_[role='button']:focus-visible]:[outline:2px_solid_currentColor] [&_[role='button']:focus-visible]:outline-offset-2",
          theme?.header,
        )}
      >
        <span
          id="hours"
          role="spinbutton"
          tabIndex={0}
          aria-label="Hours"
          aria-valuemin={format === 'ampm' ? 1 : 0}
          aria-valuemax={format === 'ampm' ? 12 : 23}
          aria-valuenow={hours}
          className={cn(
            'rt-time-picker-hours',
            'cursor-pointer inline-block opacity-[0.6]',
            '[.rt-time-picker-dialog.rt-time-picker-hoursDisplay_&]:opacity-[1]',
            theme?.hours,
          )}
          onClick={switchDisplay}
          onKeyDown={keyDown}
        >
          {`0${hours}`.slice(-2)}
        </span>
        <span
          className={cn(
            'rt-time-picker-separator',
            'm-[0_calc(var(--timepicker-header-padding)/2)] opacity-[0.6]',
            theme?.separator,
          )}
        >
          :
        </span>
        <span
          id="minutes"
          role="spinbutton"
          tabIndex={0}
          aria-label="Minutes"
          aria-valuemin={0}
          aria-valuemax={59}
          aria-valuenow={displayTime.getMinutes()}
          className={cn(
            'rt-time-picker-minutes',
            'cursor-pointer inline-block opacity-[0.6]',
            '[.rt-time-picker-dialog.rt-time-picker-minutesDisplay_&]:opacity-[1]',
            theme?.minutes,
          )}
          onClick={switchDisplay}
          onKeyDown={keyDown}
        >
          {`0${displayTime.getMinutes()}`.slice(-2)}
        </span>
        {format === 'ampm' ? (
          <div
            className={cn(
              'rt-time-picker-ampm',
              'text-(length:--timepicker-ampm-font-size) h-[calc(var(--timepicker-ampm-height)*2)] leading-(--timepicker-ampm-height) mt-[calc(-1_*_var(--timepicker-ampm-height))] absolute right-[calc(2*var(--unit))] text-center top-[50%] w-(--timepicker-ampm-width)',
              theme?.ampm,
            )}
          >
            {(['am', 'pm'] as const).map((mode) => (
              <span
                key={mode}
                role="button"
                tabIndex={0}
                aria-pressed={time.getTimeMode(displayTime) === mode}
                className={
                  mode === 'am'
                    ? cn(
                        'rt-time-picker-am',
                        'cursor-pointer block pt-[2px] mt-[-2px] opacity-(--timepicker-period-inactive-opacity)',
                        '[.rt-time-picker-dialog.rt-time-picker-amFormat_&]:opacity-[1]',
                        theme?.am,
                      )
                    : cn(
                        'rt-time-picker-pm',
                        'cursor-pointer block pb-[2px] mb-[-2px] opacity-(--timepicker-period-inactive-opacity)',
                        '[.rt-time-picker-dialog.rt-time-picker-pmFormat_&]:opacity-[1]',
                        theme?.pm,
                      )
                }
                onClick={() => toggleMode(mode)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    toggleMode(mode);
                  }
                }}
              >
                {mode.toUpperCase()}
              </span>
            ))}
          </div>
        ) : null}
      </header>
      <Clock
        ref={clock}
        display={display}
        format={format}
        onChange={setTime}
        onHandMoved={() => setDisplay('minutes')}
        theme={theme}
        time={displayTime}
      />
    </Dialog>
  );
}
