'use client';
import { mergeStyleSlots } from '../foundations/styles/slots';

import type { DatePickerTheme, DatePickerLabels } from './types';

import React, { useEffect, useId, useRef, useState } from 'react';
import Button from '../button/Button';
import { cn } from '../foundations/styles/cn';
import useFormReset from '../foundations/forms/useFormReset';
import useMergedRefs from '../foundations/portal/useMergedRefs';
import Input, { type InputProps, type InputElement, type InputHandle } from '../input/Input';
import time, { type DatePickerLocale } from '../foundations/date-time/calendar';
import DatePickerDialog, { type DatePickerDialogProps, type DatePickerSelectEvent } from './DatePickerDialog';
import isDateDisabled, { type DateConstraints } from './is-date-disabled';
export type { DatePickerTheme, DatePickerClassNames, DatePickerLabels } from './types';
export interface DatePickerProps
  extends Omit<InputProps, 'value' | 'defaultValue' | 'onChange' | 'theme' | 'classNames'>,
    DateConstraints {
  active?: boolean;
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
  readonly?: boolean;
  sundayFirstDayOfWeek?: boolean;
  startYear?: number;
  endYear?: number;
  /** Classes for the component's rendered parts. Applied after legacy theme overrides. */
  classNames?: DatePickerTheme;
  /** @deprecated Use classNames for style slots; use ThemeProvider for design tokens. */
  theme?: DatePickerTheme;
  value?: Date | string | null;
}
export function DatePicker({
  active: controlledActive = false,
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
  onKeyPress,
  onKeyDown,
  onOverlayClick,
  readonly,
  sundayFirstDayOfWeek = false,
  startYear,
  endYear,
  theme: legacyTheme,
  classNames,
  value: controlledValue,
  ref,
  ...others
}: DatePickerProps) {
  const theme = mergeStyleSlots(legacyTheme, classNames);
  const dialogId = `date-picker-dialog-${useId()}`;
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
  const date = value instanceof Date ? value : undefined;
  const formattedValue = date ? inputFormat(date, locale) : '';
  const unavailable = Boolean(
    date && isDateDisabled(date, { minDate, maxDate, enabledDates, disabledDates, isDateUnavailable }),
  );
  useEffect(() => {
    setValidationMessage('');
    native.current?.setCustomValidity(unavailable ? (labels?.unavailable ?? 'Choose an available date.') : '');
  }, [formattedValue, unavailable, labels?.unavailable]);
  return (
    <div data-react-toolbox="date-picker" className={theme?.container}>
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
        className={cn('rt-date-picker-input', theme?.input, inputClassName)}
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
          input: cn('rt-date-picker-input', theme?.input),
          inputElement: cn(
            'rt-date-picker-inputElement',
            '[.rt-date-picker-input:not(.rt-date-picker-disabled)>&]:cursor-pointer',
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
          {labels?.clear ?? 'Clear date'}
        </Button>
      ) : null}
      <DatePickerDialog
        id={dialogId}
        active={active}
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
          setActive(false);
        }}
        sundayFirstDayOfWeek={sundayFirstDayOfWeek}
        startYear={startYear}
        endYear={endYear}
        theme={theme}
        value={date}
      />
    </div>
  );
}
export { DatePickerDialog };
export { default as Calendar } from './Calendar';
export type { DatePickerLocale } from '../foundations/date-time/calendar';
export default DatePicker;
