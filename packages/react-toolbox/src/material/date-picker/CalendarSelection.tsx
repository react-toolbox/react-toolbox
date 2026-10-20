'use client';
import './tokens.css';

import React, { useEffect, useRef, useState } from 'react';
import Button from '../button/Button';
import IconButton from '../button/IconButton';
import time, { type DatePickerLocale } from '../foundations/date-time/calendar';
import { cn } from '../foundations/styles/cn';
import CalendarDay from './CalendarDay';
import isDateDisabled, { dayStamp, type DateConstraints } from './is-date-disabled';
import type { DatePickerLabels } from './types';

export interface DateRange {
  from: Date | undefined;
  to: Date | undefined;
}

export interface CalendarSelectionBaseProps extends DateConstraints {
  month?: Date;
  defaultMonth?: Date;
  onMonthChange?: (month: Date) => void;
  numberOfMonths?: number;
  /** Display ISO week numbers, including when the visible week starts on Sunday. */
  showWeekNumbers?: boolean;
  sundayFirstDayOfWeek?: boolean;
  locale?: DatePickerLocale;
  labels?: Partial<DatePickerLabels> & { weekNumber?: string };
  className?: string;
  clearable?: boolean;
}

export type CalendarSelectionProps = CalendarSelectionBaseProps &
  (
    | { mode?: 'single'; value?: Date | null; defaultValue?: Date | null; onValueChange?: (value: Date | null) => void }
    | {
        mode: 'multiple';
        value?: readonly Date[];
        defaultValue?: readonly Date[];
        onValueChange?: (value: Date[]) => void;
      }
    | {
        mode: 'range' /** Restart a range when an unavailable day lies between its endpoints. */;
        excludeUnavailable?: boolean;
        value?: DateRange;
        defaultValue?: DateRange;
        onValueChange?: (value: DateRange) => void;
      }
  );

const emptyRange: DateRange = { from: undefined, to: undefined };
const monthStart = (date: Date) => new Date(date.getFullYear(), date.getMonth(), 1);
const monthNumber = (date: Date) => date.getFullYear() * 12 + date.getMonth();

/** ISO week numbers use the Thursday in the week, avoiding local daylight-saving offsets. */
function weekNumber(date: Date) {
  const thursday = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  thursday.setUTCDate(thursday.getUTCDate() + 4 - (thursday.getUTCDay() || 7));
  const firstDay = new Date(Date.UTC(thursday.getUTCFullYear(), 0, 1));
  return Math.ceil(((thursday.getTime() - firstDay.getTime()) / 86400000 + 1) / 7);
}

/** An inline calendar with independent focus and single, multiple, or range selection. */
export function CalendarSelection(props: CalendarSelectionProps) {
  const [single, setSingle] = useState(
    props.mode === undefined || props.mode === 'single' ? (props.defaultValue ?? null) : null,
  );
  const [multiple, setMultiple] = useState<readonly Date[]>(
    props.mode === 'multiple' ? (props.defaultValue ?? []) : [],
  );
  const [range, setRange] = useState<DateRange>(
    props.mode === 'range' ? (props.defaultValue ?? emptyRange) : emptyRange,
  );
  const selectedSingle =
    props.mode === undefined || props.mode === 'single' ? (props.value === undefined ? single : props.value) : null;
  const selectedMultiple = props.mode === 'multiple' ? (props.value ?? multiple) : [];
  const selectedRange = props.mode === 'range' ? (props.value ?? range) : emptyRange;
  const [initialDate] = useState(() => selectedSingle ?? selectedMultiple[0] ?? selectedRange.from ?? new Date());
  const [internalMonth, setMonth] = useState(() => monthStart(props.defaultMonth ?? initialDate));
  const viewMonth = monthStart(props.month ?? internalMonth);
  const count = Number.isFinite(props.numberOfMonths) ? Math.max(1, Math.floor(props.numberOfMonths!)) : 1;
  const [focusedDate, setFocusedDate] = useState(initialDate);
  const root = useRef<HTMLDivElement>(null);
  const pendingFocus = useRef(false);
  const visibleFocus =
    monthNumber(focusedDate) >= monthNumber(viewMonth) && monthNumber(focusedDate) < monthNumber(viewMonth) + count
      ? focusedDate
      : viewMonth;
  useEffect(() => {
    if (pendingFocus.current) {
      pendingFocus.current = false;
      root.current?.querySelector<HTMLElement>('[data-react-toolbox="day"] [tabindex="0"]')?.focus();
    }
  });
  const changeMonth = (date: Date) => {
    const next = monthStart(date);
    if (props.month === undefined) setMonth(next);
    props.onMonthChange?.(next);
  };
  const choose = (date: Date) => {
    if (isDateDisabled(date, props)) return;
    if (props.mode === 'multiple') {
      const value = selectedMultiple.some((selected) => dayStamp(selected) === dayStamp(date))
        ? selectedMultiple.filter((selected) => dayStamp(selected) !== dayStamp(date))
        : [...selectedMultiple, date];
      if (props.value === undefined) setMultiple(value);
      props.onValueChange?.(value);
    } else if (props.mode === 'range') {
      let value =
        !selectedRange.from || selectedRange.to
          ? { from: date, to: undefined }
          : dayStamp(date) < dayStamp(selectedRange.from)
            ? { from: date, to: selectedRange.from }
            : { from: selectedRange.from, to: date };
      if (props.excludeUnavailable && value.from && value.to) {
        for (let day = value.from; dayStamp(day) <= dayStamp(value.to); day = time.addDays(day, 1)) {
          if (isDateDisabled(day, props)) {
            value = { from: date, to: undefined };
            break;
          }
        }
      }
      if (props.value === undefined) setRange(value);
      props.onValueChange?.(value);
    } else {
      if (props.value === undefined) setSingle(date);
      props.onValueChange?.(date);
    }
  };
  const clear = () => {
    if (props.mode === 'multiple') {
      if (props.value === undefined) setMultiple([]);
      props.onValueChange?.([]);
    } else if (props.mode === 'range') {
      if (props.value === undefined) setRange(emptyRange);
      props.onValueChange?.(emptyRange);
    } else {
      if (props.value === undefined) setSingle(null);
      props.onValueChange?.(null);
    }
  };
  const selected = (date: Date) => {
    const stamp = dayStamp(date);
    if (props.mode === 'multiple') return selectedMultiple.some((value) => dayStamp(value) === stamp);
    if (props.mode === 'range')
      return Boolean(
        selectedRange.from &&
          stamp >= dayStamp(selectedRange.from) &&
          stamp <= dayStamp(selectedRange.to ?? selectedRange.from),
      );
    return Boolean(selectedSingle && dayStamp(selectedSingle) === stamp);
  };
  const getRangePosition = (date: Date) => {
    if (!selectedRange.from || !selectedRange.to) return;
    const start = dayStamp(selectedRange.from);
    const end = dayStamp(selectedRange.to);
    const stamp = dayStamp(date);
    if (start === end || stamp < start || stamp > end) return;
    if (stamp === start) return 'start';
    if (stamp === end) return 'end';
    return 'middle';
  };
  const weekdays = Array.from({ length: 7 }, (_, day) =>
    time.getDayOfWeekLetter((day + (props.sundayFirstDayOfWeek ? 0 : 1)) % 7, props.locale),
  );
  return (
    <div
      ref={root}
      role="group"
      aria-label={props.labels?.calendar ?? 'Calendar'}
      data-react-toolbox="calendar-selection"
      className={cn(
        'inline-flex max-w-full flex-col overflow-x-auto text-center text-(length:--font-size-small)',
        props.className,
      )}
      onKeyDown={(event) => {
        if (
          event.defaultPrevented ||
          event.altKey ||
          event.ctrlKey ||
          event.metaKey ||
          !(event.target instanceof Element) ||
          !event.target.closest('[data-react-toolbox="day"]')
        )
          return;
        const rtl = getComputedStyle(event.currentTarget).direction === 'rtl';
        const steps: Record<string, number> = {
          ArrowLeft: rtl ? 1 : -1,
          ArrowRight: rtl ? -1 : 1,
          ArrowUp: -7,
          ArrowDown: 7,
        };
        let date: Date;
        if (steps[event.key]) date = time.addDays(visibleFocus, steps[event.key]);
        else if (event.key === 'Home' || event.key === 'End') {
          const weekday = (visibleFocus.getDay() + (props.sundayFirstDayOfWeek ? 0 : 6)) % 7;
          date = time.addDays(visibleFocus, event.key === 'Home' ? -weekday : 6 - weekday);
        } else if (event.key === 'PageUp' || event.key === 'PageDown') {
          date = time.addMonths(visibleFocus, (event.key === 'PageUp' ? -1 : 1) * (event.shiftKey ? 12 : 1));
          date.setDate(Math.min(visibleFocus.getDate(), time.getDaysInMonth(date)));
        } else return;
        event.preventDefault();
        setFocusedDate(date);
        if (monthNumber(date) < monthNumber(viewMonth)) changeMonth(date);
        else if (monthNumber(date) >= monthNumber(viewMonth) + count) changeMonth(time.addMonths(date, 1 - count));
        pendingFocus.current = true;
      }}
    >
      <div className="flex items-center justify-between">
        <IconButton
          icon="chevron_left"
          aria-label={props.labels?.previousMonth ?? 'Previous month'}
          onClick={() => changeMonth(time.addMonths(viewMonth, -1))}
        />
        <span
          aria-live="polite"
          aria-atomic="true"
        >{`${time.getFullMonth(viewMonth, props.locale)} ${viewMonth.getFullYear()}`}</span>
        <IconButton
          icon="chevron_right"
          aria-label={props.labels?.nextMonth ?? 'Next month'}
          onClick={() => changeMonth(time.addMonths(viewMonth, 1))}
        />
      </div>
      <div className="flex flex-wrap items-start gap-4">
        {Array.from({ length: count }, (_, offset) => {
          const month = time.addMonths(viewMonth, offset);
          const leading = (month.getDay() + (props.sundayFirstDayOfWeek ? 0 : 6)) % 7;
          const weeks = Math.ceil((leading + time.getDaysInMonth(month)) / 7);
          return (
            <table key={monthNumber(month)} className="border-collapse text-center">
              <caption className="leading-(--calendar-row-height) font-medium">{`${time.getFullMonth(month, props.locale)} ${month.getFullYear()}`}</caption>
              <thead>
                <tr>
                  {props.showWeekNumbers ? (
                    <th scope="col" className="px-2 font-normal text-(--rt-color-text-secondary)">
                      {props.labels?.weekNumber ?? 'Week'}
                    </th>
                  ) : null}
                  {weekdays.map((day, index) => (
                    <th
                      key={index}
                      scope="col"
                      className="leading-(--calendar-row-height) font-normal text-(--rt-color-text-secondary)"
                    >
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: weeks }, (_, week) => (
                  <tr key={week}>
                    {props.showWeekNumbers ? (
                      <th scope="row" className="px-2 font-normal text-(--rt-color-text-secondary)">
                        {weekNumber(time.addDays(month, week * 7 - leading + (props.sundayFirstDayOfWeek ? 1 : 0)))}
                      </th>
                    ) : null}
                    {Array.from({ length: 7 }, (_, weekday) => {
                      const day = week * 7 + weekday - leading + 1;
                      if (day < 1 || day > time.getDaysInMonth(month)) return <td key={weekday} />;
                      const date = time.setDay(month, day);
                      const isSelected = selected(date);
                      const rangePosition = getRangePosition(date);
                      return (
                        <td
                          key={weekday}
                          className={cn(
                            'p-0',
                            rangePosition &&
                              'relative before:pointer-events-none before:absolute before:inset-x-0 before:top-1/2 before:-translate-y-1/2 before:h-(--calendar-row-height) before:bg-[color-mix(in_srgb,var(--calendar-primary-color)_16%,transparent)]',
                            rangePosition === 'start' && 'before:inset-s-1/2',
                            rangePosition === 'end' && 'before:inset-e-1/2',
                          )}
                          data-range={rangePosition ?? (props.mode === 'range' && isSelected ? 'single' : undefined)}
                        >
                          <CalendarDay
                            className={rangePosition ? 'relative' : undefined}
                            day={day}
                            viewDate={month}
                            selectedDate={initialDate}
                            selected={isSelected}
                            rangePosition={rangePosition}
                            focused={dayStamp(date) === dayStamp(visibleFocus)}
                            focusableDisabled
                            withOffset={false}
                            locale={props.locale}
                            disabled={isDateDisabled(date, props)}
                            onFocus={() => setFocusedDate(date)}
                            onClick={() => choose(date)}
                          />
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          );
        })}
      </div>
      {props.clearable ? (
        <Button type="button" primary className="min-h-[48px]" onClick={clear}>
          {props.labels?.clear ?? 'Clear dates'}
        </Button>
      ) : null}
    </div>
  );
}

export default CalendarSelection;
