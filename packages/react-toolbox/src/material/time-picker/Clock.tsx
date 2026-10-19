'use client';
import './tokens.css';

import { cn } from '../foundations/styles/cn';

import React, { useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import ViewTransition from '../foundations/motion/ViewTransition';
import * as time from '../foundations/date-time/time';
import type { TimeFormat } from '../foundations/date-time/time';
import Hours from './ClockHours';
import Minutes from './ClockMinutes';
export interface ClockHandle {
  calculateShape(): void;
}
export interface ClockProps {
  className?: string;
  display?: 'hours' | 'minutes';
  format?: TimeFormat;
  onChange: (time: Date) => void;
  onHandMoved?: () => void;
  time?: Date;
  ref?: React.Ref<ClockHandle>;
}
export default function Clock({
  className,
  display = 'hours',
  format = '24hr',
  onChange,
  onHandMoved,
  time: suppliedTime,
  ref,
}: ClockProps) {
  const [initialTime] = useState(() => new Date());
  const value = suppliedTime ?? initialTime;
  const placeholder = useRef<HTMLDivElement>(null);
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
  return (
    <div
      data-react-toolbox="clock"
      className={cn('rt-time-picker-clock', 'p-(--clock-padding) text-(--clock-number-color)', className)}
    >
      <div
        className={cn('rt-time-picker-placeholder', 'relative z-(--z-index-high)')}
        style={{ height: radius * 2 }}
        ref={placeholder}
      >
        <ViewTransition
          viewKey={display}
          view={display}
          enterFrom={display === 'hours' ? 'scale(1.25)' : 'scale(0.85)'}
          exitTo={display === 'hours' ? 'scale(0.85)' : 'scale(1.25)'}
          className={cn(
            'rt-time-picker-clockWrapper',
            'bg-(--clock-face-background) rounded-[50%] ease-(--animation-curve-fast-out-slow-in)',
          )}
          style={{ height: radius * 2 }}
        >
          {(face) =>
            face === 'hours' ? (
              <Hours
                format={format}
                radius={radius}
                spacing={radius * 0.18}
                selected={value.getHours()}
                onHandMoved={onHandMoved}
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
                onChange={(minute) => {
                  if (value.getMinutes() !== minute) onChange(time.setMinutes(value, minute));
                }}
              />
            )
          }
        </ViewTransition>
      </div>
    </div>
  );
}
