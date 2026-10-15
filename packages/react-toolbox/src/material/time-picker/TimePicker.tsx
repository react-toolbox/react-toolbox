'use client';
import { mergeStyleSlots } from '../foundations/styles/slots';

import type { TimePickerTheme } from './types';

import React, { useEffect, useId, useState } from 'react';
import { cn } from '../foundations/styles/cn';
import Input, { type InputProps, type InputElement } from '../input/Input';
import time, { type TimeFormat } from '../foundations/date-time/calendar';
import TimePickerDialog, { type TimePickerDialogProps, type TimePickerSelectEvent } from './TimePickerDialog';
export type { TimePickerTheme, TimePickerClassNames } from './types';
export interface TimePickerProps
  extends Omit<InputProps, 'value' | 'defaultValue' | 'onChange' | 'theme' | 'classNames'> {
  active?: boolean;
  cancelLabel?: string;
  format?: TimeFormat;
  inputClassName?: string;
  okLabel?: string;
  onChange?: (time: Date, event?: TimePickerSelectEvent) => void;
  onDismiss?: () => void;
  onEscKeyDown?: TimePickerDialogProps['onEscKeyDown'];
  onOverlayClick?: TimePickerDialogProps['onOverlayClick'];
  readonly?: boolean;
  /** Classes for the component's rendered parts. Applied after legacy theme overrides. */
  classNames?: TimePickerTheme;
  /** @deprecated Use classNames for style slots; use ThemeProvider for design tokens. */
  theme?: TimePickerTheme;
  value?: Date;
}
export function TimePicker({
  active: controlledActive = false,
  cancelLabel,
  className = '',
  disabled,
  format = '24hr',
  inputClassName,
  okLabel,
  onChange,
  onClick,
  onDismiss,
  onEscKeyDown,
  onKeyDown,
  onKeyPress,
  onOverlayClick,
  readonly,
  theme: legacyTheme,
  classNames,
  value,
  ref,
  ...others
}: TimePickerProps) {
  const theme = mergeStyleSlots(legacyTheme, classNames);
  const dialogId = `time-picker-dialog-${useId()}`;
  const [active, setActive] = useState(controlledActive);
  useEffect(() => setActive(controlledActive), [controlledActive]);
  const dismiss = () => {
    setActive(false);
    onDismiss?.();
  };
  const open = (event: React.SyntheticEvent<InputElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setActive(true);
  };
  return (
    <div data-react-toolbox="time-picker" className={theme?.container}>
      <Input
        {...others}
        ref={ref}
        className={cn('rt-time-picker-input', theme?.input, inputClassName)}
        disabled={readonly || disabled}
        role="combobox"
        aria-haspopup="dialog"
        aria-controls={active ? dialogId : undefined}
        aria-expanded={active}
        onKeyPress={(event) => {
          if (event.charCode === 13 && !disabled && !readonly) open(event);
          onKeyPress?.(event);
        }}
        onKeyDown={(event) => {
          onKeyDown?.(event);
          if (
            !event.defaultPrevented &&
            !disabled &&
            !readonly &&
            (event.key === 'Enter' || event.key === ' ' || event.key === 'ArrowDown')
          )
            open(event);
        }}
        onClick={(event) => {
          if (!disabled && !readonly) {
            open(event);
            onClick?.(event);
          }
        }}
        theme={{
          input: cn('rt-time-picker-input', theme?.input),
          inputElement: cn(
            'rt-time-picker-inputElement',
            '[.rt-time-picker-input:not(.rt-time-picker-disabled)>&]:cursor-pointer',
            theme?.inputElement,
          ),
        }}
        readOnly
        type="text"
        value={value ? time.formatTime(value, format) : ''}
      />
      <TimePickerDialog
        id={dialogId}
        active={active}
        cancelLabel={cancelLabel}
        className={className}
        format={format}
        name={others.name}
        okLabel={okLabel}
        onDismiss={dismiss}
        onEscKeyDown={onEscKeyDown || dismiss}
        onOverlayClick={onOverlayClick || dismiss}
        onSelect={(next, event) => {
          onChange?.(next, event);
          setActive(false);
        }}
        theme={theme}
        value={value}
      />
    </div>
  );
}
export default TimePicker;
