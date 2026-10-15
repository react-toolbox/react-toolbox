'use client';
import type { TimePickerTheme } from './types';

import React, { useEffect, useRef, useState } from 'react';
import { cn } from '../utils/cn';
import Dialog, { type DialogProps } from '../dialog/Dialog';
import time, { type TimeFormat } from '../utils/time';
import Clock, { type ClockHandle } from './Clock';
const buttonClasses = [
  'rt-time-picker-button',
  '[.rt-time-picker-dialog>nav>&:not([disabled])]:text-[color:var(--timepicker-primary-color)]',
  '[.rt-time-picker-dialog>nav>&:not([disabled]):hover]:[background:var(--timepicker-primary-hover-color)]',
  '[.rt-time-picker-dialog>nav>&:not([disabled]):focus:not(:active)]:[background:var(--timepicker-primary-hover-color)]',
].join(' ');

export type TimePickerSelectEvent = React.MouseEvent<HTMLElement>;
export interface TimePickerDialogProps {
  active?: boolean;
  cancelLabel?: string;
  className?: string;
  format?: TimeFormat;
  name?: string;
  okLabel?: string;
  onDismiss?: () => void;
  onEscKeyDown?: DialogProps['onEscKeyDown'];
  onOverlayClick?: DialogProps['onOverlayClick'];
  onSelect?: (value: Date, event?: TimePickerSelectEvent) => void;
  theme?: TimePickerTheme;
  value?: Date;
}
export default function TimePickerDialog({
  active = false,
  cancelLabel = 'Cancel',
  className,
  format = '24hr',
  name,
  okLabel = 'Ok',
  onDismiss,
  onEscKeyDown,
  onOverlayClick,
  onSelect,
  theme,
  value,
}: TimePickerDialogProps) {
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
        'w-[var(--timepicker-dialog-width)]',
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
          '[background:var(--timepicker-primary-color)] text-[color:var(--timepicker-primary-contrast-color)] text-[length:var(--timepicker-header-font-size)] p-[var(--timepicker-header-padding)] relative text-center w-full',
          "[&_[role='spinbutton']:focus-visible]:[outline:2px_solid_currentColor] [&_[role='spinbutton']:focus-visible]:[outline-offset:2px]",
          "[&_[role='button']:focus-visible]:[outline:2px_solid_currentColor] [&_[role='button']:focus-visible]:[outline-offset:2px]",
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
            'm-[0_calc(var(--timepicker-header-padding)_/_2)] opacity-[0.6]',
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
              'text-[length:var(--timepicker-ampm-font-size)] h-[calc(var(--timepicker-ampm-height)_*_2)] leading-[var(--timepicker-ampm-height)] mt-[calc(-1_*_var(--timepicker-ampm-height))] absolute right-[calc(2_*_var(--unit))] text-center top-[50%] w-[var(--timepicker-ampm-width)]',
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
                        'cursor-pointer block opacity-[0.6]',
                        '[.rt-time-picker-dialog.rt-time-picker-amFormat_&]:opacity-[1]',
                        theme?.am,
                      )
                    : cn(
                        'rt-time-picker-pm',
                        'cursor-pointer block opacity-[0.6]',
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
