'use client';

import { cn } from '../foundations/styles/cn';

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
}
export default function ClockMinutes({ onChange, radius, selected = 0, spacing }: ClockMinutesProps) {
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
        twoDigits
      />
      <Hand
        ref={hand}
        className={!minutes.includes(selected) ? 'rt-time-picker-small' : ''}
        angle={selected * step}
        length={radius - spacing}
        onMove={(degrees) => onChange?.(degrees / step)}
        step={step}
      />
    </>
  );
}
