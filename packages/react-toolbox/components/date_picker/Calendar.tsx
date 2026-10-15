'use client';

import { mergeTheme } from '../theming';
import React, { useEffect, useRef, useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { range, getAnimationModule } from '../utils/utils';
import IconButton from '../button/IconButton';
import time, { type DatePickerLocale } from '../utils/time';
import CalendarMonth from './CalendarMonth';
import isDateDisabled, { dayStamp, type DateConstraints } from './is-date-disabled';
import defaults from './theme';
export interface CalendarProps extends DateConstraints {
  display?: 'months' | 'years';
  handleSelect?: (event: React.KeyboardEvent<HTMLElement>) => void;
  locale?: DatePickerLocale;
  onChange?: (date: Date, dayClick: boolean) => void;
  selectedDate?: Date;
  sundayFirstDayOfWeek?: boolean;
  theme?: Partial<typeof defaults>;
}
export default function Calendar({
  display = 'months',
  handleSelect,
  locale,
  onChange,
  selectedDate: suppliedDate,
  sundayFirstDayOfWeek,
  theme: overrides,
  ...constraints
}: CalendarProps) {
  const theme = mergeTheme(defaults, overrides);
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
      current.getFullYear() !== selectedDate.getFullYear() ||
      current.getMonth() !== selectedDate.getMonth()
        ? selectedDate
        : current,
    );
  }, [selectedDate.getTime()]);
  useEffect(() => {
    if (years.current && activeYear.current)
      years.current.scrollTop =
        activeYear.current.offsetTop -
        (years.current.offsetHeight / 2 + activeYear.current.offsetHeight / 2);
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
    const next = time.setYear(selectedDate, year);
    setViewDate(next);
    onChange?.(next, false);
  };
  const animation = getAnimationModule(direction === 'left' ? 'slideLeft' : 'slideRight', theme);
  const month = viewDate.getMonth();
  return (
    <div
      className={theme.calendar}
      role="group"
      aria-label="Calendar"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.defaultPrevented || display !== 'months') return;
        const steps: Record<string, number> = {
          ArrowLeft: -1,
          ArrowUp: -7,
          ArrowRight: 1,
          ArrowDown: 7,
        };
        const legacySteps: Record<number, number> = { 37: -1, 38: -7, 39: 1, 40: 7 };
        const step = steps[event.key] || legacySteps[event.which];
        if (step) {
          event.preventDefault();
          let date: Date | undefined = time.addDays(selectedDate, step);
          if (constraints.enabledDates?.length)
            date = constraints.enabledDates
              .filter(
                (candidate) =>
                  (dayStamp(candidate) - dayStamp(selectedDate)) * step > 0 &&
                  !isDateDisabled(candidate, constraints),
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
        } else if (
          (event.key === 'Enter' || event.which === 13) &&
          event.target === event.currentTarget
        ) {
          event.preventDefault();
          handleSelect?.(event);
        }
      }}
    >
      {display === 'years' ? (
        <ul data-react-toolbox="years" className={theme.years} ref={years}>
          {range(1900, 2100).map((year) => (
            <li
              role="button"
              tabIndex={year === viewDate.getFullYear() ? 0 : -1}
              aria-pressed={year === viewDate.getFullYear()}
              className={year === viewDate.getFullYear() ? theme.active : ''}
              id={String(year)}
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
              event.touches.length === 1
                ? { x: event.touches[0].clientX, y: event.touches[0].clientY }
                : null;
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
            id="left"
            aria-label="Previous month"
            className={theme.prev}
            icon="chevron_left"
            onClick={() => moveViewMonth('left')}
          />
          <IconButton
            id="right"
            aria-label="Next month"
            className={theme.next}
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
