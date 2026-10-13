import { mergeTheme } from '../theming';
import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import Dialog, { type DialogProps } from '../dialog/Dialog';
import time, { type DatePickerLocale } from '../utils/time';
import Calendar from './Calendar';
import isDateDisabled, { dayStamp, type DateConstraints } from './is-date-disabled';
import defaults from './theme';
export type DatePickerSelectEvent =
  React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>;
export interface DatePickerDialogProps extends DateConstraints {
  active?: boolean;
  autoOk?: boolean;
  cancelLabel?: string;
  className?: string;
  locale?: DatePickerLocale;
  name?: string;
  okLabel?: string;
  onDismiss?: () => void;
  onEscKeyDown?: DialogProps['onEscKeyDown'];
  onOverlayClick?: DialogProps['onOverlayClick'];
  onSelect?: (date: Date, event?: DatePickerSelectEvent) => void;
  sundayFirstDayOfWeek?: boolean;
  theme?: Partial<typeof defaults>;
  value?: Date;
}
export default function DatePickerDialog({
  active = false,
  autoOk,
  cancelLabel = 'Cancel',
  className = '',
  locale,
  name,
  okLabel = 'Ok',
  onDismiss,
  onEscKeyDown,
  onOverlayClick,
  onSelect,
  sundayFirstDayOfWeek,
  theme: overrides,
  value,
  ...constraints
}: DatePickerDialogProps) {
  const theme = mergeTheme(defaults, overrides);
  const [initialDate] = useState(() => new Date());
  const sourceDate = value ?? initialDate;
  const clamp = (date: Date) => {
    if (
      (constraints.minDate && dayStamp(date) < dayStamp(constraints.minDate)) ||
      (constraints.maxDate && dayStamp(date) > dayStamp(constraints.maxDate))
    ) {
      if (constraints.minDate && constraints.maxDate)
        return time.closestDate(date, constraints.maxDate, constraints.minDate);
      return constraints.maxDate || constraints.minDate || date;
    }
    return date;
  };
  const [date, setDate] = useState(() => clamp(sourceDate));
  const [display, setDisplay] = useState<'months' | 'years'>('months');
  useEffect(() => {
    setDate(clamp(sourceDate));
    setDisplay('months');
  }, [
    sourceDate.getTime(),
    active,
    constraints.minDate?.getTime(),
    constraints.maxDate?.getTime(),
  ]);
  const select = (event?: DatePickerSelectEvent) => {
    if (!isDateDisabled(date, constraints)) onSelect?.(date, event);
  };
  const switchDisplay = (event: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>) =>
    setDisplay(event.currentTarget.id === 'years' ? 'years' : 'months');
  const displayKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      switchDisplay(event);
    }
  };
  return (
    <Dialog
      actions={[
        { label: cancelLabel, className: theme.button, onClick: onDismiss },
        {
          label: okLabel,
          className: theme.button,
          name,
          onClick: select,
          disabled: isDateDisabled(date, constraints),
        },
      ]}
      type="custom"
      active={active}
      className={classnames(theme.dialog, className)}
      onEscKeyDown={onEscKeyDown}
      onOverlayClick={onOverlayClick}
      aria-label="Choose date"
    >
      <header className={classnames(theme.header, theme[`${display}Display`])}>
        <span
          id="years"
          role="button"
          tabIndex={0}
          aria-label="Choose year"
          aria-pressed={display === 'years'}
          className={theme.year}
          onClick={switchDisplay}
          onKeyDown={displayKeyDown}
        >
          {date.getFullYear()}
        </span>
        <h3
          id="months"
          role="button"
          tabIndex={0}
          aria-label="Choose day"
          aria-pressed={display === 'months'}
          className={theme.date}
          onClick={switchDisplay}
          onKeyDown={displayKeyDown}
        >{`${time.getShortDayOfWeek(date.getDay(), locale)}, ${time.getShortMonth(date, locale)} ${date.getDate()}`}</h3>
      </header>
      <div className={theme.calendarWrapper}>
        <Calendar
          {...constraints}
          display={display}
          handleSelect={select}
          onChange={(next, dayClick) => {
            const clamped = clamp(next);
            setDate(clamped);
            setDisplay('months');
            if (dayClick && autoOk && !isDateDisabled(clamped, constraints)) onSelect?.(clamped);
          }}
          selectedDate={date}
          theme={theme}
          locale={locale}
          sundayFirstDayOfWeek={sundayFirstDayOfWeek}
        />
      </div>
    </Dialog>
  );
}
