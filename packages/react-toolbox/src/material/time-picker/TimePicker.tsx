'use client';

import type { TimePickerLabels } from './types';

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
export type { TimePickerLabels } from './types';
export interface TimePickerProps extends Omit<InputProps, 'value' | 'defaultValue' | 'onChange'>, TimeConstraints {
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
  /** Keep the value focusable and submitted while preventing edits and validation. */
  readOnly?: boolean;
  value?: Date | null;
}
export function TimePicker({
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
  onOverlayClick,
  readOnly,
  value: controlledValue,
  ref,
  ...others
}: TimePickerProps) {
  const dialogId = `time-picker-dialog-${useId()}`;
  const [internalValue, setValue] = useState(defaultValue);
  const value = controlledValue === undefined ? internalValue : controlledValue;
  const input = useRef<InputHandle>(null);
  const native = useRef<HTMLInputElement>(null);
  const [validationMessage, setValidationMessage] = useState('');
  const inputRef = useMergedRefs(input, ref);
  const [internalOpen, setOpen] = useState(defaultOpen ?? false);
  const visible = !disabled && !readOnly && (controlledOpen ?? internalOpen);
  const setVisible = (next: boolean) => {
    if (controlledOpen === undefined) setOpen(next);
    if (next !== visible) onOpenChange?.(next);
  };
  useFormReset(native, () => {
    if (controlledValue === undefined) setValue(defaultValue);
    setValidationMessage('');
    setVisible(false);
  });
  const dismiss = () => {
    setVisible(false);
    onDismiss?.();
  };
  const open = (event: React.SyntheticEvent<InputElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setVisible(true);
  };
  const formattedValue = value ? time.formatTime(value, format) : '';
  const unavailable = Boolean(value && isTimeUnavailable(value, { minTime, maxTime, minuteStep }));
  useEffect(() => {
    setValidationMessage('');
    native.current?.setCustomValidity(unavailable ? (labels?.unavailable ?? 'Choose an available time.') : '');
  }, [formattedValue, unavailable, labels?.unavailable]);
  return (
    <div data-react-toolbox="time-picker">
      <input
        ref={native}
        type="text"
        className="sr-only"
        tabIndex={-1}
        aria-hidden="true"
        form={others.form}
        disabled={disabled}
        readOnly={readOnly}
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
        className={cn('rt-time-picker-input', !readOnly && '[&>input:not(:disabled)]:cursor-pointer', inputClassName)}
        disabled={disabled}
        error={error || validationMessage}
        required={required}
        role={readOnly ? undefined : 'combobox'}
        aria-haspopup={readOnly ? undefined : 'dialog'}
        aria-controls={visible ? dialogId : undefined}
        aria-expanded={readOnly ? undefined : visible}
        onKeyDown={(event) => {
          onKeyDown?.(event);
          if (
            !event.defaultPrevented &&
            !event.nativeEvent.isComposing &&
            !disabled &&
            !readOnly &&
            (event.key === 'Enter' || event.key === ' ' || event.key === 'ArrowDown')
          )
            open(event);
        }}
        onClick={(event) => {
          onClick?.(event);
          if (!event.defaultPrevented && !disabled && !readOnly) open(event);
        }}
        readOnly
        type="text"
        value={formattedValue}
      />
      {clearable && value && !disabled && !readOnly ? (
        <Button
          type="button"
          primary
          className="min-h-[48px]"
          onClick={() => {
            if (controlledValue === undefined) setValue(undefined);
            setValidationMessage('');
            setVisible(false);
            onClear?.();
            input.current?.focus();
          }}
        >
          {labels?.clear ?? 'Clear time'}
        </Button>
      ) : null}
      <TimePickerDialog
        id={dialogId}
        active={visible}
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
          setVisible(false);
        }}
        value={value ?? undefined}
      />
    </div>
  );
}
export default TimePicker;
