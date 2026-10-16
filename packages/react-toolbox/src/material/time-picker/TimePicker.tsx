'use client';
import { mergeStyleSlots } from '../foundations/styles/slots';

import type { TimePickerTheme, TimePickerLabels } from './types';

import React, { useEffect, useId, useRef, useState } from 'react';
import Button from '../button/Button';
import { cn } from '../foundations/styles/cn';
import useFormReset from '../foundations/forms/useFormReset';
import useMergedRefs from '../foundations/portal/useMergedRefs';
import Input, { type InputProps, type InputElement, type InputHandle } from '../input/Input';
import * as time from '../foundations/date-time/time';
import type { TimeFormat } from '../foundations/date-time/time';
import { isTimeUnavailable, type TimeConstraints } from './constraints';
export type { TimeConstraints } from './constraints';
import TimePickerDialog, { type TimePickerDialogProps, type TimePickerSelectEvent } from './TimePickerDialog';
export type { TimePickerTheme, TimePickerClassNames, TimePickerLabels } from './types';
export interface TimePickerProps
  extends Omit<InputProps, 'value' | 'defaultValue' | 'onChange' | 'theme' | 'classNames'>,
    TimeConstraints {
  active?: boolean;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultValue?: Date;
  /** Show a clear action. Controlled consumers clear by setting value to null. */
  clearable?: boolean;
  onClear?: () => void;
  cancelLabel?: string;
  labels?: Partial<TimePickerLabels>;
  /** Preserve portrait, force landscape, or adapt to wide landscape viewports. */
  layout?: 'portrait' | 'landscape' | 'responsive';
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
  value?: Date | null;
}
export function TimePicker({
  active: controlledActive = false,
  open: controlledOpen,
  defaultOpen,
  onOpenChange,
  defaultValue,
  clearable,
  onClear,
  cancelLabel,
  labels,
  layout,
  className = '',
  disabled,
  error,
  required,
  format = '24hr',
  minTime,
  maxTime,
  minuteStep,
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
  const value = controlledValue === undefined ? internalValue : controlledValue;
  const input = useRef<InputHandle>(null);
  const native = useRef<HTMLInputElement>(null);
  const [validationMessage, setValidationMessage] = useState('');
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
  useFormReset(native, () => {
    if (controlledValue === undefined) setValue(defaultValue);
    setValidationMessage('');
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
  const formattedValue = value ? time.formatTime(value, format) : '';
  const unavailable = Boolean(value && isTimeUnavailable(value, { minTime, maxTime, minuteStep }));
  useEffect(() => {
    setValidationMessage('');
    native.current?.setCustomValidity(unavailable ? (labels?.unavailable ?? 'Choose an available time.') : '');
  }, [formattedValue, unavailable, labels?.unavailable]);
  return (
    <div data-react-toolbox="time-picker" className={theme?.container}>
      <input
        ref={native}
        type="text"
        className="sr-only"
        tabIndex={-1}
        aria-hidden="true"
        form={others.form}
        disabled={readonly || disabled}
        required={required}
        value={formattedValue}
        onChange={() => {}}
        onInvalid={(event) => {
          others.onInvalid?.(event);
          if (!event.defaultPrevented) {
            setValidationMessage(event.currentTarget.validationMessage);
            input.current?.focus();
          }
          event.preventDefault();
        }}
      />
      <Input
        {...others}
        ref={inputRef}
        className={cn('rt-time-picker-input', theme?.input, inputClassName)}
        disabled={readonly || disabled}
        error={error || validationMessage}
        required={required}
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
        value={formattedValue}
      />
      {clearable && value && !disabled && !readonly ? (
        <Button
          type="button"
          primary
          className="min-h-[48px]"
          onClick={() => {
            if (controlledValue === undefined) setValue(undefined);
            setValidationMessage('');
            setActive(false);
            onClear?.();
            input.current?.focus();
          }}
        >
          {labels?.clear ?? 'Clear time'}
        </Button>
      ) : null}
      <TimePickerDialog
        id={dialogId}
        active={active}
        cancelLabel={cancelLabel}
        labels={labels}
        layout={layout}
        className={className}
        format={format}
        minTime={minTime}
        maxTime={maxTime}
        minuteStep={minuteStep}
        name={others.name}
        okLabel={okLabel}
        onDismiss={dismiss}
        onEscKeyDown={onEscKeyDown || dismiss}
        onOverlayClick={onOverlayClick || dismiss}
        onSelect={(next, event) => {
          if (controlledValue === undefined) setValue(next);
          setValidationMessage('');
          onChange?.(next, event);
          setActive(false);
        }}
        theme={theme}
        value={value ?? undefined}
      />
    </div>
  );
}
export default TimePicker;
