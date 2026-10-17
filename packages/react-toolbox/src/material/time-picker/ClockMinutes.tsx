'use client';

import { cn } from '../foundations/styles/cn';
import type { TimePickerClassNames } from './types';

import { useRef } from 'react';
import { range } from '../foundations/collections/range';
import Hand, { type ClockHandHandle } from './ClockHand';
import Face from './ClockFace';
const minutes = range(0, 60, 5);
const step = 360 / 60;
export interface ClockMinutesProps {
  onChange?: (minute: number) => void;
  onHandMoved?: () => void;
  radius: number;
  selected?: number;
  spacing: number;
  /** Classes for the component's rendered parts. */
  classNames?: TimePickerClassNames;
}
export default function ClockMinutes({ onChange, radius, selected = 0, spacing, classNames }: ClockMinutesProps) {
  const hand = useRef<ClockHandHandle>(null);
  return (
    <>
      <Face
        onTouchStart={(event) => hand.current?.touchStart(event)}
        onMouseDown={(event) => hand.current?.mouseStart(event)}
        numbers={minutes}
        spacing={spacing}
        radius={radius}
        active={selected}
        classNames={classNames}
        twoDigits
      />
      <Hand
        ref={hand}
        className={!minutes.includes(selected) ? cn('rt-time-picker-small', classNames?.small) : ''}
        angle={selected * step}
        length={radius - spacing}
        onMove={(degrees) => onChange?.(degrees / step)}
        classNames={classNames}
        step={step}
      />
    </>
  );
}
