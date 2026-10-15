'use client';
import { mergeStyleSlots } from '../foundations/styles/slots';

import { cn } from '../foundations/styles/cn';
import type { TimePickerTheme } from './types';

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
  /** Classes for the component's rendered parts. Applied after legacy theme overrides. */
  classNames?: TimePickerTheme;
  /** @deprecated Use classNames for style slots; use ThemeProvider for design tokens. */
  theme?: TimePickerTheme;
}
export default function ClockMinutes({
  onChange,
  radius,
  selected = 0,
  spacing,
  theme: legacyTheme,
  classNames,
}: ClockMinutesProps) {
  const theme = mergeStyleSlots(legacyTheme, classNames);
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
        theme={theme}
        twoDigits
      />
      <Hand
        ref={hand}
        className={!minutes.includes(selected) ? cn('rt-time-picker-small', theme?.small) : ''}
        angle={selected * step}
        length={radius - spacing}
        onMove={(degrees) => onChange?.(degrees / step)}
        theme={theme}
        step={step}
      />
    </>
  );
}
