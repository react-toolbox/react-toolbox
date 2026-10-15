'use client';
import { cn } from '../utils/cn';
import type { TimePickerTheme } from './types';

import React, { useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import time, { type TimeFormat } from '../utils/time';
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
  theme?: TimePickerTheme;
  time?: Date;
  ref?: React.Ref<ClockHandle>;
}
export default function Clock({
  display = 'hours',
  format = '24hr',
  onChange,
  onHandMoved,
  theme,
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
  const [shape, setShape] = useState({ center: { x: 0, y: 0 }, radius: 0 });
  const calculateShape = useCallback(() => {
    if (!placeholder.current) return;
    const { top, left, width } = placeholder.current.getBoundingClientRect();
    const x = left + width / 2 - window.pageXOffset,
      y = top + width / 2 - window.pageXOffset;
    setShape((current) =>
      current.center.x === x && current.center.y === y && current.radius === width / 2
        ? current
        : { center: { x, y }, radius: width / 2 },
    );
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
          enter: cn('rt-time-picker-zoomOutEnter', 'absolute opacity-0 transform-[scale(1.25)]', theme?.zoomOutEnter),
          enterActive: cn(
            'rt-time-picker-zoomOutEnterActive',
            'duration-500 [transition-property:transform,opacity] [transition-timing-function:var(--animation-curve-fast-out-slow-in)]',
            '[.rt-time-picker-zoomOutEnter&]:opacity-[1] [.rt-time-picker-zoomOutEnter&]:transform-[scale(1)]',
            theme?.zoomOutEnterActive,
          ),
          exit: cn('rt-time-picker-zoomOutExit', 'absolute opacity-[1] transform-[scale(1)]', theme?.zoomOutExit),
          exitActive: cn(
            'rt-time-picker-zoomOutExitActive',
            'duration-500 [transition-property:transform,opacity] [transition-timing-function:var(--animation-curve-fast-out-slow-in)]',
            '[.rt-time-picker-zoomOutExit&]:opacity-0 [.rt-time-picker-zoomOutExit&]:transform-[scale(0.85)]',
            theme?.zoomOutExitActive,
          ),
        }
      : {
          enter: cn('rt-time-picker-zoomInEnter', 'absolute opacity-0 transform-[scale(0.85)]', theme?.zoomInEnter),
          enterActive: cn(
            'rt-time-picker-zoomInEnterActive',
            'duration-500 [transition-property:transform,opacity] [transition-timing-function:var(--animation-curve-fast-out-slow-in)]',
            '[.rt-time-picker-zoomInEnter&]:opacity-[1] [.rt-time-picker-zoomInEnter&]:transform-[scale(1)]',
            theme?.zoomInEnterActive,
          ),
          exit: cn('rt-time-picker-zoomInExit', 'absolute opacity-[1] transform-[scale(1)]', theme?.zoomInExit),
          exitActive: cn(
            'rt-time-picker-zoomInExitActive',
            'duration-500 [transition-property:transform,opacity] [transition-timing-function:var(--animation-curve-fast-out-slow-in)]',
            '[.rt-time-picker-zoomInExit&]:opacity-0 [.rt-time-picker-zoomInExit&]:transform-[scale(1.25)]',
            theme?.zoomInExitActive,
          ),
        };
  return (
    <div data-react-toolbox="clock" className={cn('rt-time-picker-clock', 'p-(--clock-padding)', theme?.clock)}>
      <div
        className={cn('rt-time-picker-placeholder', 'relative z-(--z-index-high)', theme?.placeholder)}
        style={{ height: shape.radius * 2 }}
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
                theme?.clockWrapper,
              )}
              style={{ height: shape.radius * 2 }}
            >
              {display === 'hours' ? (
                <Hours
                  center={shape.center}
                  format={format}
                  radius={shape.radius}
                  spacing={shape.radius * 0.18}
                  selected={value.getHours()}
                  onHandMoved={onHandMoved}
                  theme={theme}
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
                  center={shape.center}
                  radius={shape.radius}
                  spacing={shape.radius * 0.18}
                  selected={value.getMinutes()}
                  onHandMoved={onHandMoved}
                  theme={theme}
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
