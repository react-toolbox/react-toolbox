'use client';

import type { DatePickerLabels } from './types';

import React, { useEffect, useId, useRef, useState } from 'react';
import Button from '../button/Button';
import { cn } from '../foundations/styles/cn';
import useFormReset from '../foundations/forms/useFormReset';
import useMergedRefs from '../foundations/portal/useMergedRefs';
import Input, { type InputProps, type InputElement, type InputHandle } from '../input/Input';
import time, { type DatePickerLocale } from '../foundations/date-time/calendar';
import DatePickerDialog, { type DatePickerDialogProps, type DatePickerSelectEvent } from './DatePickerDialog';
import isDateDisabled, { type DateConstraints } from './is-date-disabled';
export type { DatePickerLabels } from './types';
export interface DatePickerProps extends Omit<InputProps, 'value' | 'defaultValue' | 'onChange'>, DateConstraints {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultValue?: Date;
  /** Show a clear action. Controlled consumers clear by setting value to null. */
  clearable?: boolean;
  onClear?: () => void;
  autoOk?: boolean;
  cancelLabel?: string;
  labels?: Partial<DatePickerLabels>;
  /** Preserve portrait, force landscape, or adapt to wide landscape viewports. */
  layout?: 'portrait' | 'landscape' | 'responsive';
  inputClassName?: string;
  inputFormat?: (date: Date, locale?: DatePickerLocale) => string;
  locale?: DatePickerLocale;
  okLabel?: string;
  onChange?: (date: Date, event?: DatePickerSelectEvent) => void;
  onDismiss?: () => void;
  onEscKeyDown?: DatePickerDialogProps['onEscKeyDown'];
  onOverlayClick?: DatePickerDialogProps['onOverlayClick'];
  /** Keep the value focusable and submitted while preventing edits and validation. */
  readOnly?: boolean;
  sundayFirstDayOfWeek?: boolean;
  startYear?: number;
  endYear?: number;
  value?: Date | null;
}
export function DatePicker({
  open: controlledOpen,
  defaultOpen,
  onOpenChange,
  defaultValue,
  clearable,
  onClear,
  autoOk,
  cancelLabel,
  labels,
  layout,
  className,
  disabled,
  error,
  required,
  disabledDates,
  enabledDates,
  isDateUnavailable,
  inputClassName,
  inputFormat = time.formatDate,
  locale = 'en',
  maxDate,
  minDate,
  okLabel,
  onChange,
  onClick,
  onDismiss,
  onEscKeyDown,
  onKeyDown,
  onOverlayClick,
  readOnly,
  sundayFirstDayOfWeek = false,
  startYear,
  endYear,
  value: controlledValue,
  ref,
  ...others
}: DatePickerProps) {
  const dialogId = `date-picker-dialog-${useId()}`;
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
  const date = value ?? undefined;
  const formattedValue = date ? inputFormat(date, locale) : '';
  const unavailable = Boolean(
    date && isDateDisabled(date, { minDate, maxDate, enabledDates, disabledDates, isDateUnavailable }),
  );
  useEffect(() => {
    setValidationMessage('');
    native.current?.setCustomValidity(unavailable ? (labels?.unavailable ?? 'Choose an available date.') : '');
  }, [formattedValue, unavailable, labels?.unavailable]);
  return (
    <div data-react-toolbox="date-picker">
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
        className={cn('rt-date-picker-input', !readOnly && '[&>input:not(:disabled)]:cursor-pointer', inputClassName)}
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
          {labels?.clear ?? 'Clear date'}
        </Button>
      ) : null}
      <DatePickerDialog
        id={dialogId}
        active={visible}
        autoOk={autoOk}
        cancelLabel={cancelLabel}
        labels={labels}
        layout={layout}
        className={className}
        disabledDates={disabledDates}
        enabledDates={enabledDates}
        isDateUnavailable={isDateUnavailable}
        locale={locale}
        maxDate={maxDate}
        minDate={minDate}
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
        sundayFirstDayOfWeek={sundayFirstDayOfWeek}
        startYear={startYear}
        endYear={endYear}
        value={date}
      />
    </div>
  );
}
export { DatePickerDialog };
export { default as Calendar } from './Calendar';
export type { DatePickerLocale } from '../foundations/date-time/calendar';
export default DatePicker;
