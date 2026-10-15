'use client';

import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import { mergeTheme } from '../theming';
import Input, { type InputProps, type InputElement } from '../input/Input';
import time, { type DatePickerLocale } from '../utils/time';
import DatePickerDialog, {
  type DatePickerDialogProps,
  type DatePickerSelectEvent,
} from './DatePickerDialog';
import type { DateConstraints } from './is-date-disabled';
import defaults from './theme';
export type DatePickerTheme = Partial<typeof defaults> & { container?: string };
export interface DatePickerProps
  extends Omit<InputProps, 'value' | 'defaultValue' | 'onChange' | 'theme'>, DateConstraints {
  active?: boolean;
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
  theme?: DatePickerTheme;
  value?: Date | string;
}
export function DatePicker({
  active: controlledActive = false,
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
  theme: overrides,
  value,
  ref,
  ...others
}: DatePickerProps) {
  const theme = mergeTheme(defaults, overrides);
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
  const date = value instanceof Date ? value : undefined;
  return (
    <div data-react-toolbox="date-picker" className={overrides?.container}>
      <Input
        {...others}
        ref={ref}
        className={classnames(theme.input, inputClassName)}
        disabled={readonly || disabled}
        aria-haspopup="dialog"
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
            (event.key === 'Enter' || event.key === ' ')
          )
            open(event);
        }}
        onClick={(event) => {
          if (!disabled && !readonly) {
            open(event);
            onClick?.(event);
          }
        }}
        theme={{ input: theme.input, inputElement: theme.inputElement }}
        readOnly
        type="text"
        value={date ? inputFormat(date, locale) : ''}
      />
      <DatePickerDialog
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
export type { DatePickerLocale } from '../utils/time';
export default DatePicker;
