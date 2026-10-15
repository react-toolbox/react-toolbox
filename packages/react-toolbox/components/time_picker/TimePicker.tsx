'use client';
import type { TimePickerTheme } from './types';

import React, { useEffect, useState } from 'react';
import { cn } from '../utils/cn';
import Input, { type InputProps, type InputElement } from '../input/Input';
import time, { type TimeFormat } from '../utils/time';
import TimePickerDialog, { type TimePickerDialogProps, type TimePickerSelectEvent } from './TimePickerDialog';
export type { TimePickerTheme } from './types';
export interface TimePickerProps extends Omit<InputProps, 'value' | 'defaultValue' | 'onChange' | 'theme'> {
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
  theme,
  value,
  ref,
  ...others
}: TimePickerProps) {
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
        aria-haspopup="dialog"
        aria-expanded={active}
        onKeyPress={(event) => {
          if (event.charCode === 13 && !disabled && !readonly) open(event);
          onKeyPress?.(event);
        }}
        onKeyDown={(event) => {
          onKeyDown?.(event);
          if (!event.defaultPrevented && !disabled && !readonly && (event.key === 'Enter' || event.key === ' '))
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
