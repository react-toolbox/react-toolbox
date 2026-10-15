'use client';
import { mergeStyleSlots } from '../foundations/styles/slots';

import type { DatePickerTheme } from './types';

import React, { useEffect, useId, useMemo, useRef, useState } from 'react';
import { cn } from '../foundations/styles/cn';
import useFormReset from '../foundations/forms/useFormReset';
import useMergedRefs from '../foundations/portal/useMergedRefs';
import Input, { type InputProps, type InputElement, type InputHandle } from '../input/Input';
import time, { type DatePickerLocale } from '../foundations/date-time/calendar';
import DatePickerDialog, { type DatePickerDialogProps, type DatePickerSelectEvent } from './DatePickerDialog';
import type { DateConstraints } from './is-date-disabled';
export type { DatePickerTheme, DatePickerClassNames } from './types';
export interface DatePickerProps
  extends Omit<InputProps, 'value' | 'defaultValue' | 'onChange' | 'theme' | 'classNames'>,
    DateConstraints {
  active?: boolean;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultValue?: Date;
  autoOk?: boolean;
  cancelLabel?: string;
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
  /** Classes for the component's rendered parts. Applied after legacy theme overrides. */
  classNames?: DatePickerTheme;
  /** @deprecated Use classNames for style slots; use ThemeProvider for design tokens. */
  theme?: DatePickerTheme;
  value?: Date | string;
}
export function DatePicker({
  active: controlledActive = false,
  open: controlledOpen,
  defaultOpen,
  onOpenChange,
  defaultValue,
  autoOk,
  cancelLabel,
  className,
  disabled,
  disabledDates,
  enabledDates,
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
  theme: legacyTheme,
  classNames,
  value: controlledValue,
  ref,
  ...others
}: DatePickerProps) {
  const theme = mergeStyleSlots(legacyTheme, classNames);
  const dialogId = `date-picker-dialog-${useId()}`;
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
  const date = value instanceof Date ? value : undefined;
  return (
    <div data-react-toolbox="date-picker" className={theme?.container}>
      <Input
        {...others}
        ref={inputRef}
        className={cn('rt-date-picker-input', theme?.input, inputClassName)}
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
          input: cn('rt-date-picker-input', theme?.input),
          inputElement: cn(
            'rt-date-picker-inputElement',
            '[.rt-date-picker-input:not(.rt-date-picker-disabled)>&]:cursor-pointer',
            theme?.inputElement,
          ),
        }}
        readOnly
        type="text"
        value={date ? inputFormat(date, locale) : ''}
      />
      <DatePickerDialog
        id={dialogId}
        active={active}
        autoOk={autoOk}
        cancelLabel={cancelLabel}
        className={className}
        disabledDates={disabledDates}
        enabledDates={enabledDates}
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
          onChange?.(next, event);
          setActive(false);
        }}
        sundayFirstDayOfWeek={sundayFirstDayOfWeek}
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
