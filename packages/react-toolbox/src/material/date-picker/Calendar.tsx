'use client';
import { mergeStyleSlots } from '../foundations/styles/slots';

import { activeClasses } from './styles';
import { cn } from '../foundations/styles/cn';
import type { DatePickerTheme } from './types';

import React, { useEffect, useRef, useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { range } from '../foundations/collections/range';
import IconButton from '../button/IconButton';
import time, { type DatePickerLocale } from '../foundations/date-time/calendar';
import CalendarMonth from './CalendarMonth';
import isDateDisabled, { dayStamp, type DateConstraints } from './is-date-disabled';
export interface CalendarProps extends DateConstraints {
  display?: 'months' | 'years';
  handleSelect?: (event: React.KeyboardEvent<HTMLElement>) => void;
  locale?: DatePickerLocale;
  onChange?: (date: Date, dayClick: boolean) => void;
  selectedDate?: Date;
  sundayFirstDayOfWeek?: boolean;
  /** Classes for the component's rendered parts. Applied after legacy theme overrides. */
  classNames?: DatePickerTheme;
  /** @deprecated Use classNames for style slots; use ThemeProvider for design tokens. */
  theme?: DatePickerTheme;
}
export default function Calendar({
  display = 'months',
  handleSelect,
  locale,
  onChange,
  selectedDate: suppliedDate,
  sundayFirstDayOfWeek,
  theme: legacyTheme,
  classNames,
  ...constraints
}: CalendarProps) {
  const theme = mergeStyleSlots(legacyTheme, classNames);
  const [initialDate] = useState(() => new Date());
  const selectedDate = suppliedDate ?? initialDate;
  const [viewDate, setViewDate] = useState(selectedDate);
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const monthRefs = useRef(Array.from({ length: 12 }, () => React.createRef<HTMLDivElement>()));
  const years = useRef<HTMLUListElement>(null);
  const activeYear = useRef<HTMLLIElement>(null);
  const focusSelectedDay = useRef(false);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  useEffect(() => {
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
        ?.querySelector<HTMLElement>('[data-react-toolbox="day"] [aria-pressed="true"]')
        ?.focus();
    }
  });
  const moveViewMonth = (next: 'left' | 'right') => {
    setDirection(next);
    setViewDate((current) => time.addMonths(current, next === 'left' ? -1 : 1));
  };
  const yearClick = (year: number) => {
    const next = time.addMonths(selectedDate, (year - selectedDate.getFullYear()) * 12);
    next.setDate(Math.min(selectedDate.getDate(), time.getDaysInMonth(next)));
    setViewDate(next);
    onChange?.(next, false);
  };
  const animation =
    direction === 'left'
      ? {
          enter: cn(
            'rt-date-picker-slideLeftEnter',
            'absolute opacity-0 transform-[translate3d(-100%,0,0)]',
            theme?.slideLeftEnter,
          ),
          enterActive: cn(
            'rt-date-picker-slideLeftEnterActive',
            'duration-350 [transition-property:transform,opacity] ease-[ease-in-out]',
            '[.rt-date-picker-slideLeftEnter&]:opacity-[1] [.rt-date-picker-slideLeftEnter&]:transform-[translate3d(0,0,0)]',
            theme?.slideLeftEnterActive,
          ),
          exit: cn(
            'rt-date-picker-slideLeftExit',
            'absolute opacity-[1] transform-[translate3d(0,0,0)]',
            theme?.slideLeftExit,
          ),
          exitActive: cn(
            'rt-date-picker-slideLeftExitActive',
            'duration-350 [transition-property:transform,opacity] ease-[ease-in-out]',
            '[.rt-date-picker-slideLeftExit&]:opacity-0 [.rt-date-picker-slideLeftExit&]:transform-[translate3d(100%,0,0)]',
            theme?.slideLeftExitActive,
          ),
        }
      : {
          enter: cn(
            'rt-date-picker-slideRightEnter',
            'absolute opacity-0 transform-[translateX(100%)]',
            theme?.slideRightEnter,
          ),
          enterActive: cn(
            'rt-date-picker-slideRightEnterActive',
            'duration-350 [transition-property:transform,opacity] ease-[ease-in-out]',
            '[.rt-date-picker-slideRightEnter&]:opacity-[1] [.rt-date-picker-slideRightEnter&]:transform-[translateX(0)]',
            theme?.slideRightEnterActive,
          ),
          exit: cn(
            'rt-date-picker-slideRightExit',
            'absolute opacity-[1] transform-[translateX(0)]',
            theme?.slideRightExit,
          ),
          exitActive: cn(
            'rt-date-picker-slideRightExitActive',
            'duration-350 [transition-property:transform,opacity] ease-[ease-in-out]',
            '[.rt-date-picker-slideRightExit&]:opacity-0 [.rt-date-picker-slideRightExit&]:transform-[translateX(-100%)]',
            theme?.slideRightExitActive,
          ),
        };
  const month = viewDate.getMonth();
  return (
    <div
      className={cn(
        'rt-date-picker-calendar',
        '[background:var(--calendar-primary-contrast-color)] text-(length:--font-size-small) h-(--calendar-total-height) leading-(--calendar-row-height) overflow-hidden relative text-center',
        '[&:focus-visible]:[outline:2px_solid_var(--calendar-primary-color)] [&:focus-visible]:outline-offset-2',
        theme?.calendar,
      )}
      role="group"
      aria-label="Calendar"
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
            const weekday = (selectedDate.getDay() + (sundayFirstDayOfWeek ? 0 : 6)) % 7;
            date = time.addDays(selectedDate, event.key === 'Home' ? -weekday : 6 - weekday);
          } else {
            date = time.addMonths(selectedDate, (event.key === 'PageUp' ? -1 : 1) * (event.shiftKey ? 12 : 1));
            date.setDate(Math.min(selectedDate.getDate(), time.getDaysInMonth(date)));
          }
          if (!isDateDisabled(date, constraints)) {
            focusSelectedDay.current = true;
            setViewDate(date);
            onChange?.(date, false);
          }
          return;
        }
        const steps: Record<string, number> = {
          ArrowLeft: -1,
          ArrowUp: -7,
          ArrowRight: 1,
          ArrowDown: 7,
        };
        const legacySteps: Record<number, number> = { 37: -1, 38: -7, 39: 1, 40: 7 };
        const direction =
          ['ArrowLeft', 'ArrowRight'].includes(event.key) && getComputedStyle(event.currentTarget).direction === 'rtl'
            ? -1
            : 1;
        const step = (steps[event.key] || legacySteps[event.which]) * direction;
        if (step) {
          event.preventDefault();
          let date: Date | undefined = time.addDays(selectedDate, step);
          if (constraints.enabledDates?.length)
            date = constraints.enabledDates
              .filter(
                (candidate) =>
                  (dayStamp(candidate) - dayStamp(selectedDate)) * step > 0 && !isDateDisabled(candidate, constraints),
              )
              .sort((a, b) => (dayStamp(a) - dayStamp(b)) * Math.sign(step))[0];
          else
            for (
              let tries = 0;
              tries < (constraints.disabledDates?.length ?? 0) && isDateDisabled(date, constraints);
              tries += 1
            )
              date = time.addDays(date, step);
          if (date && !isDateDisabled(date, constraints)) {
            focusSelectedDay.current = true;
            setViewDate(date);
            onChange?.(date, false);
          }
        } else if ((event.key === 'Enter' || event.which === 13) && event.target === event.currentTarget) {
          event.preventDefault();
          handleSelect?.(event);
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
            theme?.years,
          )}
          ref={years}
        >
          {range(1900, 2100).map((year) => (
            <li
              role="button"
              tabIndex={year === viewDate.getFullYear() ? 0 : -1}
              aria-pressed={year === viewDate.getFullYear()}
              className={year === viewDate.getFullYear() ? cn(activeClasses, theme?.active) : ''}
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
              ref={year === viewDate.getFullYear() ? activeYear : undefined}
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
            aria-label="Previous month"
            className={cn(
              'rt-date-picker-prev',
              '[.rt-date-picker-calendar_&]:cursor-pointer [.rt-date-picker-calendar_&]:h-[calc(3.6*var(--unit))] [.rt-date-picker-calendar_&]:opacity-[0.7] [.rt-date-picker-calendar_&]:absolute [.rt-date-picker-calendar_&]:top-0 [.rt-date-picker-calendar_&]:z-(--z-index-high) [.rt-date-picker-calendar_&]:left-0',
              '[.rt-date-picker-calendar_&>span]:align-top',
              theme?.prev,
            )}
            icon="chevron_left"
            onClick={() => moveViewMonth('left')}
          />
          <IconButton
            aria-label="Next month"
            className={cn(
              'rt-date-picker-next',
              '[.rt-date-picker-calendar_&]:cursor-pointer [.rt-date-picker-calendar_&]:h-[calc(3.6*var(--unit))] [.rt-date-picker-calendar_&]:opacity-[0.7] [.rt-date-picker-calendar_&]:absolute [.rt-date-picker-calendar_&]:top-0 [.rt-date-picker-calendar_&]:z-(--z-index-high) [.rt-date-picker-calendar_&]:right-0',
              '[.rt-date-picker-calendar_&>span]:align-top',
              theme?.next,
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
                sundayFirstDayOfWeek={sundayFirstDayOfWeek}
                theme={theme}
                viewDate={viewDate}
              />
            </CSSTransition>
          </TransitionGroup>
        </div>
      )}
    </div>
  );
}
