'use client';
import { mergeStyleSlots } from '../foundations/styles/slots';

import type { TimePickerTheme } from './types';

import React, { useEffect, useId, useMemo, useRef, useState } from 'react';
import { cn } from '../foundations/styles/cn';
import useFormReset from '../foundations/forms/useFormReset';
import useMergedRefs from '../foundations/portal/useMergedRefs';
import Input, { type InputProps, type InputElement, type InputHandle } from '../input/Input';
import time, { type TimeFormat } from '../foundations/date-time/calendar';
import TimePickerDialog, { type TimePickerDialogProps, type TimePickerSelectEvent } from './TimePickerDialog';
export type { TimePickerTheme, TimePickerClassNames } from './types';
export interface TimePickerProps
  extends Omit<InputProps, 'value' | 'defaultValue' | 'onChange' | 'theme' | 'classNames'> {
  active?: boolean;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultValue?: Date;
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
  open: controlledOpen,
  defaultOpen,
  onOpenChange,
  defaultValue,
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
  value: controlledValue,
  ref,
  ...others
}: TimePickerProps) {
  const theme = mergeStyleSlots(legacyTheme, classNames);
  const dialogId = `time-picker-dialog-${useId()}`;
  const [internalValue, setValue] = useState(defaultValue);
  const value = controlledValue ?? internalValue;
  const input = useRef<InputHandle>(null);
  const inputRef = useMergedRefs(input, ref);
  const [internalOpen, setOpen] = useState(defaultOpen ?? controlledActive);
  const active = !disabled && !readonly && (controlledOpen ?? internalOpen);
  const setActive = (next: boolean) => {
    if (controlledOpen === undefined) setOpen(next);
    if (next !== active) onOpenChange?.(next);
  };
  const previousActive = useRef(controlledActive);
  useEffect(() => {
    if (previousActive.current !== controlledActive) setOpen(controlledActive);
    previousActive.current = controlledActive;
  }, [controlledActive]);
  const native = useMemo(
    () => ({
      get current() {
        return input.current?.inputElement ?? null;
      },
    }),
    [],
  );
  useFormReset(native, () => {
    if (controlledValue === undefined) setValue(defaultValue);
    setActive(false);
  });
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
        ref={inputRef}
        className={cn('rt-time-picker-input', theme?.input, inputClassName)}
        disabled={readonly || disabled}
        role="combobox"
        aria-haspopup="dialog"
        aria-controls={active ? dialogId : undefined}
        aria-expanded={active}
        onKeyPress={(event) => {
          onKeyPress?.(event);
          if (
            !event.defaultPrevented &&
            !event.nativeEvent.isComposing &&
            event.charCode === 13 &&
            !disabled &&
            !readonly
          )
            open(event);
        }}
        onKeyDown={(event) => {
          onKeyDown?.(event);
          if (
            !event.defaultPrevented &&
            !event.nativeEvent.isComposing &&
            !disabled &&
            !readonly &&
            (event.key === 'Enter' || event.key === ' ' || event.key === 'ArrowDown')
          )
            open(event);
        }}
        onClick={(event) => {
          onClick?.(event);
          if (!event.defaultPrevented && !disabled && !readonly) open(event);
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
          if (controlledValue === undefined) setValue(next);
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
