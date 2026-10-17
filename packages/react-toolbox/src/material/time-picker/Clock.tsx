'use client';
import './tokens.css';

import { cn } from '../foundations/styles/cn';
import type { TimePickerClassNames } from './types';

import React, { useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import * as time from '../foundations/date-time/time';
import type { TimeFormat } from '../foundations/date-time/time';
import Hours from './ClockHours';
import Minutes from './ClockMinutes';
export interface ClockHandle {
  calculateShape(): void;
}
export interface ClockProps {
  display?: 'hours' | 'minutes';
  format?: TimeFormat;
  onChange: (time: Date) => void;
  onHandMoved?: () => void;
  /** Classes for the component's rendered parts. */
  classNames?: TimePickerClassNames;
  time?: Date;
  ref?: React.Ref<ClockHandle>;
}
export default function Clock({
  display = 'hours',
  format = '24hr',
  onChange,
  onHandMoved,
  classNames,
  time: suppliedTime,
  ref,
}: ClockProps) {
  const [initialTime] = useState(() => new Date());
  const value = suppliedTime ?? initialTime;
  const placeholder = useRef<HTMLDivElement>(null);
  const displayRefs = useRef({
    hours: React.createRef<HTMLDivElement>(),
    minutes: React.createRef<HTMLDivElement>(),
  });
  const [radius, setRadius] = useState(0);
  const calculateShape = useCallback(() => {
    if (!placeholder.current) return;
    setRadius(placeholder.current.getBoundingClientRect().width / 2);
  }, []);
  useImperativeHandle(ref, () => ({ calculateShape }), [calculateShape]);
  useEffect(() => {
    window.addEventListener('resize', calculateShape);
    const timer = setTimeout(calculateShape);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', calculateShape);
    };
  }, [calculateShape]);
  const animation =
    display === 'hours'
      ? {
          enter: cn(
            'rt-time-picker-zoomOutEnter',
            'absolute opacity-0 transform-[scale(1.25)]',
            classNames?.zoomOutEnter,
          ),
          enterActive: cn(
            'rt-time-picker-zoomOutEnterActive',
            'duration-500 [transition-property:transform,opacity] [transition-timing-function:var(--animation-curve-fast-out-slow-in)]',
            '[.rt-time-picker-zoomOutEnter&]:opacity-[1] [.rt-time-picker-zoomOutEnter&]:transform-[scale(1)]',
            classNames?.zoomOutEnterActive,
          ),
          exit: cn('rt-time-picker-zoomOutExit', 'absolute opacity-[1] transform-[scale(1)]', classNames?.zoomOutExit),
          exitActive: cn(
            'rt-time-picker-zoomOutExitActive',
            'duration-500 [transition-property:transform,opacity] [transition-timing-function:var(--animation-curve-fast-out-slow-in)]',
            '[.rt-time-picker-zoomOutExit&]:opacity-0 [.rt-time-picker-zoomOutExit&]:transform-[scale(0.85)]',
            classNames?.zoomOutExitActive,
          ),
        }
      : {
          enter: cn(
            'rt-time-picker-zoomInEnter',
            'absolute opacity-0 transform-[scale(0.85)]',
            classNames?.zoomInEnter,
          ),
          enterActive: cn(
            'rt-time-picker-zoomInEnterActive',
            'duration-500 [transition-property:transform,opacity] [transition-timing-function:var(--animation-curve-fast-out-slow-in)]',
            '[.rt-time-picker-zoomInEnter&]:opacity-[1] [.rt-time-picker-zoomInEnter&]:transform-[scale(1)]',
            classNames?.zoomInEnterActive,
          ),
          exit: cn('rt-time-picker-zoomInExit', 'absolute opacity-[1] transform-[scale(1)]', classNames?.zoomInExit),
          exitActive: cn(
            'rt-time-picker-zoomInExitActive',
            'duration-500 [transition-property:transform,opacity] [transition-timing-function:var(--animation-curve-fast-out-slow-in)]',
            '[.rt-time-picker-zoomInExit&]:opacity-0 [.rt-time-picker-zoomInExit&]:transform-[scale(1.25)]',
            classNames?.zoomInExitActive,
          ),
        };
  return (
    <div
      data-react-toolbox="clock"
      className={cn('rt-time-picker-clock', 'p-(--clock-padding) text-(--clock-number-color)', classNames?.clock)}
    >
      <div
        className={cn('rt-time-picker-placeholder', 'relative z-(--z-index-high)', classNames?.placeholder)}
        style={{ height: radius * 2 }}
        ref={placeholder}
      >
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
            key={display}
            nodeRef={displayRefs.current[display]}
            classNames={animation}
            timeout={500}
          >
            <div
              key={display}
              ref={displayRefs.current[display]}
              className={cn(
                'rt-time-picker-clockWrapper',
                'bg-(--clock-face-background) rounded-[50%] absolute w-full',
                classNames?.clockWrapper,
              )}
              style={{ height: radius * 2 }}
            >
              {display === 'hours' ? (
                <Hours
                  format={format}
                  radius={radius}
                  spacing={radius * 0.18}
                  selected={value.getHours()}
                  onHandMoved={onHandMoved}
                  classNames={classNames}
                  onChange={(hour) => {
                    if (value.getHours() !== hour) {
                      const adapted =
                        format === 'ampm'
                          ? time.getTimeMode(value) === 'pm'
                            ? hour < 12
                              ? hour + 12
                              : hour
                            : hour === 12
                              ? 0
                              : hour
                          : hour;
                      onChange(time.setHours(value, adapted));
                    }
                  }}
                />
              ) : (
                <Minutes
                  radius={radius}
                  spacing={radius * 0.18}
                  selected={value.getMinutes()}
                  onHandMoved={onHandMoved}
                  classNames={classNames}
                  onChange={(minute) => {
                    if (value.getMinutes() !== minute) onChange(time.setMinutes(value, minute));
                  }}
                />
              )}
            </div>
          </CSSTransition>
        </TransitionGroup>
      </div>
    </div>
  );
}
