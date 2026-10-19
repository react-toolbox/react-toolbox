'use client';
import './tokens.css';

import type { TimePickerLabels } from './types';

import React, { useEffect, useRef, useState } from 'react';
import { cn } from '../foundations/styles/cn';
import Dialog, { type DialogProps } from '../dialog/Dialog';
import * as time from '../foundations/date-time/time';
import type { TimeFormat } from '../foundations/date-time/time';
import { constrainTime, isTimeUnavailable, minuteStep, type TimeConstraints } from './constraints';
import Clock, { type ClockHandle } from './Clock';
const buttonClasses = [
  'rt-time-picker-button',
  '[.rt-time-picker-dialog>nav>&:not([disabled])]:text-(--timepicker-primary-color)',
  '[.rt-time-picker-dialog>nav>&:not([disabled]):hover]:[background:var(--timepicker-primary-hover-color)]',
  '[.rt-time-picker-dialog>nav>&:not([disabled]):focus:not(:active)]:[background:var(--timepicker-primary-hover-color)]',
].join(' ');

export type TimePickerSelectEvent = React.MouseEvent<HTMLElement>;
export interface TimePickerDialogProps extends TimeConstraints {
  active?: boolean;
  cancelLabel?: string;
  labels?: Partial<TimePickerLabels>;
  layout?: 'portrait' | 'landscape' | 'responsive';
  className?: string;
  id?: string;
  format?: TimeFormat;
  name?: string;
  okLabel?: string;
  onDismiss?: () => void;
  onEscKeyDown?: DialogProps['onEscKeyDown'];
  onOverlayClick?: DialogProps['onOverlayClick'];
  onSelect?: (value: Date, event?: TimePickerSelectEvent) => void;
  value?: Date;
}
export default function TimePickerDialog({
  active = false,
  cancelLabel = 'Cancel',
  labels,
  layout = 'portrait',
  className,
  format = '24hr',
  id,
  name,
  okLabel = 'Ok',
  onDismiss,
  onEscKeyDown,
  onOverlayClick,
  onSelect,
  value,
  minTime,
  maxTime,
  minuteStep: suppliedStep,
}: TimePickerDialogProps) {
  const [initialTime] = useState(() => new Date());
  const sourceTime = value ?? initialTime;
  const constraints = { minTime, maxTime, minuteStep: suppliedStep };
  const [displayTime, setTime] = useState(() => constrainTime(new Date(sourceTime.getTime()), constraints));
  const [display, setDisplay] = useState<'hours' | 'minutes'>('hours');
  const clock = useRef<ClockHandle>(null);
  useEffect(
    () => setTime(constrainTime(new Date(sourceTime.getTime()), constraints)),
    [sourceTime.getTime(), active, minTime?.getTime(), maxTime?.getTime(), suppliedStep],
  );
  useEffect(() => {
    if (active) clock.current?.calculateShape();
  }, [active]);
  const toggleMode = (mode: 'am' | 'pm') =>
    setTime((previous) => {
      const next = new Date(previous.getTime());
      next.setHours((next.getHours() % 12) + (mode === 'pm' ? 12 : 0));
      return constrainTime(next, constraints);
    });
  const switchDisplay = (event: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>) =>
    setDisplay(event.currentTarget.dataset.display === 'hours' ? 'hours' : 'minutes');
  const keyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      switchDisplay(event);
      return;
    }
    if (!['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const nextDisplay = event.currentTarget.dataset.display === 'hours' ? 'hours' : 'minutes';
    const key = event.key;
    setDisplay(nextDisplay);
    setTime((previous) => {
      const next = new Date(previous.getTime());
      const hours = nextDisplay === 'hours',
        twelveHour = hours && format === 'ampm';
      const minimum = twelveHour ? 1 : 0,
        maximum = hours ? (twelveHour ? 12 : 23) : 59;
      const current = hours ? (twelveHour ? next.getHours() % 12 || 12 : next.getHours()) : next.getMinutes();
      const direction = key === 'ArrowUp' || key === 'ArrowRight' ? 1 : -1;
      if (hours) {
        const number =
          key === 'Home'
            ? minimum
            : key === 'End'
              ? maximum
              : minimum + ((current - minimum + direction + maximum - minimum + 1) % (maximum - minimum + 1));
        next.setHours(twelveHour ? (number % 12) + (next.getHours() >= 12 ? 12 : 0) : number);
      } else {
        /** The final minute mark may be below 59; wrap through marks, not modulo arithmetic on minutes. */
        const step = minuteStep(constraints);
        const marks = Array.from({ length: Math.ceil(60 / step) }, (_, index) => index * step);
        const index = marks.indexOf(current);
        const number =
          key === 'Home'
            ? marks[0]
            : key === 'End'
              ? marks[marks.length - 1]
              : marks[(index + direction + marks.length) % marks.length];
        next.setMinutes(number);
      }
      return constrainTime(next, constraints, key === 'Home' ? 1 : key === 'End' ? -1 : direction);
    });
  };
  const hours = format === 'ampm' ? displayTime.getHours() % 12 || 12 : displayTime.getHours();
  return (
    <Dialog
      id={id}
      type="custom"
      actions={[
        { label: cancelLabel, className: buttonClasses, onClick: onDismiss },
        {
          label: okLabel,
          className: buttonClasses,
          name,
          disabled: isTimeUnavailable(displayTime, constraints),
          onClick: (event) => onSelect?.(displayTime, event),
        },
      ]}
      active={active}
      className={cn(
        'rt-time-picker-dialog',
        'w-(--timepicker-dialog-width)',
        '[&>section]:p-0',
        layout === 'landscape' &&
          '[&&]:grid [&&]:w-[calc(var(--timepicker-dialog-width)+var(--picker-landscape-header-width))] [&&]:grid-cols-[var(--picker-landscape-header-width)_minmax(0,1fr)] [&&]:grid-rows-[1fr_auto] [&&]:overflow-y-auto [&>section]:contents [&>section>header]:col-start-1 [&>section>header]:row-span-2 [&>section>header]:row-start-1 [&>section>:not(header)]:col-start-2 [&>section>:not(header)]:row-start-1 [&>nav]:col-start-2 [&>nav]:row-start-2 [&>section>header]:content-center [&>section>header]:flex [&>section>header]:flex-wrap [&>section>header]:items-center [&>section>header]:justify-center [&_.rt-time-picker-ampm]:static [&_.rt-time-picker-ampm]:mt-4 [&_.rt-time-picker-ampm]:flex [&_.rt-time-picker-ampm]:h-auto [&_.rt-time-picker-ampm]:w-full [&_.rt-time-picker-ampm]:justify-center [&_.rt-time-picker-ampm]:gap-4',
        layout === 'responsive' &&
          '[@media_(orientation:_landscape)_and_(min-width:_600px)]:[&&]:grid [@media_(orientation:_landscape)_and_(min-width:_600px)]:[&&]:w-[calc(var(--timepicker-dialog-width)+var(--picker-landscape-header-width))] [@media_(orientation:_landscape)_and_(min-width:_600px)]:[&&]:grid-cols-[var(--picker-landscape-header-width)_minmax(0,1fr)] [@media_(orientation:_landscape)_and_(min-width:_600px)]:[&&]:grid-rows-[1fr_auto] [@media_(orientation:_landscape)_and_(min-width:_600px)]:[&&]:overflow-y-auto [@media_(orientation:_landscape)_and_(min-width:_600px)]:[&>section]:contents [@media_(orientation:_landscape)_and_(min-width:_600px)]:[&>section>header]:col-start-1 [@media_(orientation:_landscape)_and_(min-width:_600px)]:[&>section>header]:row-span-2 [@media_(orientation:_landscape)_and_(min-width:_600px)]:[&>section>header]:row-start-1 [@media_(orientation:_landscape)_and_(min-width:_600px)]:[&>section>:not(header)]:col-start-2 [@media_(orientation:_landscape)_and_(min-width:_600px)]:[&>section>:not(header)]:row-start-1 [@media_(orientation:_landscape)_and_(min-width:_600px)]:[&>nav]:col-start-2 [@media_(orientation:_landscape)_and_(min-width:_600px)]:[&>nav]:row-start-2 [@media_(orientation:_landscape)_and_(min-width:_600px)]:[&>section>header]:content-center [@media_(orientation:_landscape)_and_(min-width:_600px)]:[&>section>header]:flex [@media_(orientation:_landscape)_and_(min-width:_600px)]:[&>section>header]:flex-wrap [@media_(orientation:_landscape)_and_(min-width:_600px)]:[&>section>header]:items-center [@media_(orientation:_landscape)_and_(min-width:_600px)]:[&>section>header]:justify-center [@media_(orientation:_landscape)_and_(min-width:_600px)]:[&_.rt-time-picker-ampm]:static [@media_(orientation:_landscape)_and_(min-width:_600px)]:[&_.rt-time-picker-ampm]:mt-4 [@media_(orientation:_landscape)_and_(min-width:_600px)]:[&_.rt-time-picker-ampm]:flex [@media_(orientation:_landscape)_and_(min-width:_600px)]:[&_.rt-time-picker-ampm]:h-auto [@media_(orientation:_landscape)_and_(min-width:_600px)]:[&_.rt-time-picker-ampm]:w-full [@media_(orientation:_landscape)_and_(min-width:_600px)]:[&_.rt-time-picker-ampm]:justify-center [@media_(orientation:_landscape)_and_(min-width:_600px)]:[&_.rt-time-picker-ampm]:gap-4',
        display === 'hours' ? 'rt-time-picker-hoursDisplay' : 'rt-time-picker-minutesDisplay',
        time.getTimeMode(displayTime) === 'am' ? 'rt-time-picker-amFormat' : 'rt-time-picker-pmFormat',
        className,
      )}
      onEscKeyDown={onEscKeyDown}
      onOverlayClick={onOverlayClick}
      aria-label={labels?.dialog ?? 'Choose time'}
    >
      <header
        className={cn(
          'rt-time-picker-header',
          '[background:var(--timepicker-primary-color)] text-(--timepicker-primary-contrast-color) text-(length:--timepicker-header-font-size) leading-normal p-(--timepicker-header-padding) relative text-center w-full',
          "[&_[role='spinbutton']:focus-visible]:[outline:2px_solid_currentColor] [&_[role='spinbutton']:focus-visible]:outline-offset-2",
          "[&_[role='button']:focus-visible]:[outline:2px_solid_currentColor] [&_[role='button']:focus-visible]:outline-offset-2",
        )}
      >
        <span
          data-display="hours"
          role="spinbutton"
          tabIndex={0}
          aria-label={labels?.hours ?? 'Hours'}
          aria-valuemin={format === 'ampm' ? 1 : 0}
          aria-valuemax={format === 'ampm' ? 12 : 23}
          aria-valuenow={hours}
          className={cn(
            'rt-time-picker-hours',
            'cursor-pointer inline-block opacity-[0.6]',
            '[.rt-time-picker-dialog.rt-time-picker-hoursDisplay_&]:opacity-[1]',
          )}
          onClick={switchDisplay}
          onKeyDown={keyDown}
        >
          {`0${hours}`.slice(-2)}
        </span>
        <span
          className={cn('rt-time-picker-separator', 'm-[0_calc(var(--timepicker-header-padding)/2)] opacity-[0.6]')}
        >
          :
        </span>
        <span
          data-display="minutes"
          role="spinbutton"
          tabIndex={0}
          aria-label={labels?.minutes ?? 'Minutes'}
          aria-valuemin={0}
          aria-valuemax={59}
          aria-valuenow={displayTime.getMinutes()}
          className={cn(
            'rt-time-picker-minutes',
            'cursor-pointer inline-block opacity-[0.6]',
            '[.rt-time-picker-dialog.rt-time-picker-minutesDisplay_&]:opacity-[1]',
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
                      )
                    : cn(
                        'rt-time-picker-pm',
                        'cursor-pointer block pb-[2px] mb-[-2px] opacity-(--timepicker-period-inactive-opacity)',
                        '[.rt-time-picker-dialog.rt-time-picker-pmFormat_&]:opacity-[1]',
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
                {labels?.[mode] ?? mode.toUpperCase()}
              </span>
            ))}
          </div>
        ) : null}
      </header>
      <Clock
        ref={clock}
        display={display}
        format={format}
        onChange={(next) => setTime(constrainTime(next, constraints))}
        onHandMoved={() => setDisplay('minutes')}
        time={displayTime}
      />
    </Dialog>
  );
}
