'use client';
import './tokens.css';

import { activeClasses } from './styles';
import { cn } from '../foundations/styles/cn';
import type { DatePickerClassNames, DatePickerLabels } from './types';

import React, { useEffect, useRef, useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { range } from '../foundations/collections/range';
import IconButton from '../button/IconButton';
import time, { type DatePickerLocale } from '../foundations/date-time/calendar';
import CalendarMonth from './CalendarMonth';
import isDateDisabled, { dayStamp, type DateConstraints } from './is-date-disabled';
export interface CalendarProps extends DateConstraints {
  display?: 'months' | 'years';
  labels?: Partial<DatePickerLabels>;
  /** Inclusive bounds of the year chooser; date validity still follows minDate/maxDate. */
  startYear?: number;
  endYear?: number;
  handleSelect?: (event: React.KeyboardEvent<HTMLElement>) => void;
  locale?: DatePickerLocale;
  onChange?: (date: Date, dayClick: boolean) => void;
  selectedDate?: Date;
  sundayFirstDayOfWeek?: boolean;
  /** Classes for the component's rendered parts. */
  classNames?: DatePickerClassNames;
}
export default function Calendar({
  display = 'months',
  labels,
  startYear,
  endYear,
  handleSelect,
  locale,
  onChange,
  selectedDate: suppliedDate,
  sundayFirstDayOfWeek,
  classNames,
  ...constraints
}: CalendarProps) {
  const [initialDate] = useState(() => new Date());
  const selectedDate = suppliedDate ?? initialDate;
  const [viewDate, setViewDate] = useState(selectedDate);
  const [focusedDate, setFocusedDate] = useState(selectedDate);
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const monthRefs = useRef(Array.from({ length: 12 }, () => React.createRef<HTMLDivElement>()));
  const years = useRef<HTMLUListElement>(null);
  const activeYear = useRef<HTMLLIElement>(null);
  const focusSelectedDay = useRef(false);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  useEffect(() => {
    setFocusedDate(selectedDate);
    setViewDate((current) =>
      current.getFullYear() !== selectedDate.getFullYear() || current.getMonth() !== selectedDate.getMonth()
        ? selectedDate
        : current,
    );
  }, [selectedDate.getTime()]);
  useEffect(() => {
    if (years.current && activeYear.current)
      years.current.scrollTop =
        activeYear.current.offsetTop - (years.current.offsetHeight / 2 + activeYear.current.offsetHeight / 2);
    if (focusSelectedDay.current) {
      focusSelectedDay.current = false;
      monthRefs.current[viewDate.getMonth()].current
        ?.querySelector<HTMLElement>('[data-react-toolbox="day"] [tabindex="0"]')
        ?.focus();
    }
  });
  const focusDay = (date: Date) => {
    if (
      (constraints.minDate && dayStamp(date) < dayStamp(constraints.minDate)) ||
      (constraints.maxDate && dayStamp(date) > dayStamp(constraints.maxDate))
    )
      return;
    /** Unavailable days within the calendar bounds remain discoverable without being selected. */
    focusSelectedDay.current = true;
    setViewDate(date);
    setFocusedDate(date);
    if (!isDateDisabled(date, constraints)) onChange?.(date, false);
  };
  const moveViewMonth = (next: 'left' | 'right') => {
    setDirection(next);
    const month = time.addMonths(viewDate, next === 'left' ? -1 : 1);
    month.setDate(Math.min(focusedDate.getDate(), time.getDaysInMonth(month)));
    const available = range(1, time.getDaysInMonth(month) + 1)
      .map((day) => time.setDay(month, day))
      .find((date) => !isDateDisabled(date, constraints));
    setFocusedDate(isDateDisabled(month, constraints) ? (available ?? month) : month);
    setViewDate(month);
  };
  const yearClick = (year: number) => {
    const next = time.addMonths(selectedDate, (year - selectedDate.getFullYear()) * 12);
    next.setDate(Math.min(selectedDate.getDate(), time.getDaysInMonth(next)));
    setViewDate(next);
    setFocusedDate(next);
    onChange?.(next, false);
  };
  const animation =
    direction === 'left'
      ? {
          enter: cn(
            'rt-date-picker-slideLeftEnter',
            'absolute opacity-0 transform-[translate3d(-100%,0,0)]',
            classNames?.slideLeftEnter,
          ),
          enterActive: cn(
            'rt-date-picker-slideLeftEnterActive',
            'duration-350 [transition-property:transform,opacity] ease-[ease-in-out]',
            '[.rt-date-picker-slideLeftEnter&]:opacity-[1] [.rt-date-picker-slideLeftEnter&]:transform-[translate3d(0,0,0)]',
            classNames?.slideLeftEnterActive,
          ),
          exit: cn(
            'rt-date-picker-slideLeftExit',
            'absolute opacity-[1] transform-[translate3d(0,0,0)]',
            classNames?.slideLeftExit,
          ),
          exitActive: cn(
            'rt-date-picker-slideLeftExitActive',
            'duration-350 [transition-property:transform,opacity] ease-[ease-in-out]',
            '[.rt-date-picker-slideLeftExit&]:opacity-0 [.rt-date-picker-slideLeftExit&]:transform-[translate3d(100%,0,0)]',
            classNames?.slideLeftExitActive,
          ),
        }
      : {
          enter: cn(
            'rt-date-picker-slideRightEnter',
            'absolute opacity-0 transform-[translateX(100%)]',
            classNames?.slideRightEnter,
          ),
          enterActive: cn(
            'rt-date-picker-slideRightEnterActive',
            'duration-350 [transition-property:transform,opacity] ease-[ease-in-out]',
            '[.rt-date-picker-slideRightEnter&]:opacity-[1] [.rt-date-picker-slideRightEnter&]:transform-[translateX(0)]',
            classNames?.slideRightEnterActive,
          ),
          exit: cn(
            'rt-date-picker-slideRightExit',
            'absolute opacity-[1] transform-[translateX(0)]',
            classNames?.slideRightExit,
          ),
          exitActive: cn(
            'rt-date-picker-slideRightExitActive',
            'duration-350 [transition-property:transform,opacity] ease-[ease-in-out]',
            '[.rt-date-picker-slideRightExit&]:opacity-0 [.rt-date-picker-slideRightExit&]:transform-[translateX(-100%)]',
            classNames?.slideRightExitActive,
          ),
        };
  const month = viewDate.getMonth();
  const firstYear =
    startYear ??
    constraints.minDate?.getFullYear() ??
    Math.min(1900, selectedDate.getFullYear(), constraints.maxDate?.getFullYear() ?? Infinity);
  const lastYear =
    endYear ??
    constraints.maxDate?.getFullYear() ??
    Math.max(2099, selectedDate.getFullYear(), constraints.minDate?.getFullYear() ?? -Infinity);
  const focusedYear = Math.min(lastYear, Math.max(firstYear, viewDate.getFullYear()));
  return (
    <div
      className={cn(
        'rt-date-picker-calendar',
        '[background:var(--calendar-background)] text-(length:--font-size-small) h-(--calendar-total-height) leading-(--calendar-row-height) overflow-hidden relative text-center',
        '[&:focus-visible]:[outline:2px_solid_var(--calendar-primary-color)] [&:focus-visible]:outline-offset-2',
        classNames?.calendar,
      )}
      role="group"
      aria-label={labels?.calendar ?? 'Calendar'}
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.defaultPrevented || display !== 'months' || event.altKey || event.ctrlKey || event.metaKey) return;
        if (
          event.target !== event.currentTarget &&
          !(event.target instanceof Element && event.target.closest('[data-react-toolbox="day"]'))
        )
          return;
        if (['Home', 'End', 'PageUp', 'PageDown'].includes(event.key)) {
          event.preventDefault();
          let date: Date;
          if (event.key === 'Home' || event.key === 'End') {
            const weekday = (focusedDate.getDay() + (sundayFirstDayOfWeek ? 0 : 6)) % 7;
            date = time.addDays(focusedDate, event.key === 'Home' ? -weekday : 6 - weekday);
          } else {
            date = time.addMonths(focusedDate, (event.key === 'PageUp' ? -1 : 1) * (event.shiftKey ? 12 : 1));
            date.setDate(Math.min(focusedDate.getDate(), time.getDaysInMonth(date)));
          }
          focusDay(date);
          return;
        }
        const steps: Record<string, number> = {
          ArrowLeft: -1,
          ArrowUp: -7,
          ArrowRight: 1,
          ArrowDown: 7,
        };
        const direction =
          ['ArrowLeft', 'ArrowRight'].includes(event.key) && getComputedStyle(event.currentTarget).direction === 'rtl'
            ? -1
            : 1;
        const step = steps[event.key] * direction;
        if (step) {
          event.preventDefault();
          focusDay(time.addDays(focusedDate, step));
        } else if (event.key === 'Enter' && event.target === event.currentTarget) {
          event.preventDefault();
          if (!isDateDisabled(focusedDate, constraints)) handleSelect?.(event);
        }
      }}
    >
      {display === 'years' ? (
        <ul
          data-react-toolbox="years"
          className={cn(
            'rt-date-picker-years',
            '[&>li:focus-visible]:[outline:2px_solid_var(--calendar-primary-color)] [&>li:focus-visible]:outline-offset-2',
            'text-(length:--font-size-big) h-full [list-style:none] m-0 overflow-y-auto p-0',
            '[&>li]:cursor-pointer [&>li]:leading-[2.4]',
            classNames?.years,
          )}
          ref={years}
        >
          {range(firstYear, lastYear + 1).map((year) => (
            <li
              role="button"
              tabIndex={year === focusedYear ? 0 : -1}
              aria-pressed={year === viewDate.getFullYear()}
              className={year === viewDate.getFullYear() ? cn(activeClasses, classNames?.active) : ''}
              key={year}
              onClick={() => yearClick(year)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  yearClick(year);
                } else if (['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) {
                  event.preventDefault();
                  const sibling =
                    event.key === 'Home'
                      ? years.current?.firstElementChild
                      : event.key === 'End'
                        ? years.current?.lastElementChild
                        : event.key === 'ArrowDown'
                          ? event.currentTarget.nextElementSibling
                          : event.currentTarget.previousElementSibling;
                  if (sibling instanceof HTMLElement) sibling.focus();
                }
              }}
              ref={year === focusedYear ? activeYear : undefined}
            >
              {year}
            </li>
          ))}
        </ul>
      ) : (
        <div
          data-react-toolbox="calendar"
          onTouchStart={(event) => {
            touchStart.current =
              event.touches.length === 1 ? { x: event.touches[0].clientX, y: event.touches[0].clientY } : null;
          }}
          onTouchCancel={() => {
            touchStart.current = null;
          }}
          onTouchEnd={(event) => {
            const start = touchStart.current;
            touchStart.current = null;
            if (!start || !event.changedTouches.length) return;
            const x = event.changedTouches[0].clientX - start.x,
              y = event.changedTouches[0].clientY - start.y;
            if (Math.abs(x) >= 40 && Math.abs(x) > Math.abs(y)) {
              event.preventDefault();
              moveViewMonth(x < 0 ? 'right' : 'left');
            }
          }}
        >
          <IconButton
            aria-label={labels?.previousMonth ?? 'Previous month'}
            className={cn(
              'rt-date-picker-prev',
              '[.rt-date-picker-calendar_&]:cursor-pointer [.rt-date-picker-calendar_&]:h-[calc(3.6*var(--unit))] [.rt-date-picker-calendar_&]:opacity-[0.7] [.rt-date-picker-calendar_&]:absolute [.rt-date-picker-calendar_&]:top-0 [.rt-date-picker-calendar_&]:z-(--z-index-high) [.rt-date-picker-calendar_&]:left-0',
              '[.rt-date-picker-calendar_&>span]:align-top',
              classNames?.prev,
            )}
            icon="chevron_left"
            onClick={() => moveViewMonth('left')}
          />
          <IconButton
            aria-label={labels?.nextMonth ?? 'Next month'}
            className={cn(
              'rt-date-picker-next',
              '[.rt-date-picker-calendar_&]:cursor-pointer [.rt-date-picker-calendar_&]:h-[calc(3.6*var(--unit))] [.rt-date-picker-calendar_&]:opacity-[0.7] [.rt-date-picker-calendar_&]:absolute [.rt-date-picker-calendar_&]:top-0 [.rt-date-picker-calendar_&]:z-(--z-index-high) [.rt-date-picker-calendar_&]:right-0',
              '[.rt-date-picker-calendar_&>span]:align-top',
              classNames?.next,
            )}
            icon="chevron_right"
            onClick={() => moveViewMonth('right')}
          />
          <TransitionGroup
            component={null}
            childFactory={(child) =>
              React.isValidElement<{ classNames?: typeof animation }>(child)
                ? React.cloneElement(child, { classNames: animation })
                : child
            }
          >
            <CSSTransition
              mountOnEnter
              unmountOnExit
              key={month}
              nodeRef={monthRefs.current[month]}
              classNames={animation}
              timeout={350}
            >
              <CalendarMonth
                {...constraints}
                nodeRef={monthRefs.current[month]}
                locale={locale}
                onDayClick={(day) => onChange?.(time.setDay(viewDate, day), true)}
                selectedDate={selectedDate}
                focusedDate={focusedDate}
                onDayFocus={(day) => setFocusedDate(time.setDay(viewDate, day))}
                sundayFirstDayOfWeek={sundayFirstDayOfWeek}
                classNames={classNames}
                viewDate={viewDate}
              />
            </CSSTransition>
          </TransitionGroup>
        </div>
      )}
    </div>
  );
}
