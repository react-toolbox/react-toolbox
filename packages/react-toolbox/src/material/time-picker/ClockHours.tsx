'use client';

import type { TimePickerClassNames } from './types';

import React, { useEffect, useRef, useState } from 'react';
import { range } from '../foundations/collections/range';
import type { TimeFormat } from '../foundations/date-time/time';
import Hand, { type ClockHandHandle } from './ClockHand';
import Face from './ClockFace';
const outerNumbers = [0, ...range(13, 24)];
const innerNumbers = [12, ...range(1, 12)];
const innerSpacing = 1.7;
const step = 360 / 12;
export interface ClockHoursProps {
  format: TimeFormat;
  onChange: (hour: number) => void;
  onHandMoved?: () => void;
  radius: number;
  selected: number;
  spacing: number;
  /** Classes for the component's rendered parts. */
  classNames?: TimePickerClassNames;
}
export default function ClockHours({
  format,
  onChange,
  onHandMoved,
  radius,
  selected,
  spacing,
  classNames,
}: ClockHoursProps) {
  const [inner, setInner] = useState(format === '24hr' && selected > 0 && selected <= 12);
  const hand = useRef<ClockHandHandle>(null);
  useEffect(() => setInner(format === '24hr' && selected > 0 && selected <= 12), [selected, format]);
  const mouseDown = (event: React.MouseEvent<HTMLDivElement>) => hand.current?.mouseStart(event);
  const touchStart = (event: React.TouchEvent<HTMLDivElement>) => hand.current?.touchStart(event);
  const is24hr = format === '24hr';
  return (
    <>
      <Face
        onTouchStart={touchStart}
        onMouseDown={mouseDown}
        numbers={is24hr ? outerNumbers : innerNumbers}
        spacing={spacing}
        radius={radius}
        twoDigits={is24hr}
        active={is24hr ? selected : selected % 12 || 12}
        classNames={classNames}
      />
      {is24hr ? (
        <Face
          onTouchStart={touchStart}
          onMouseDown={mouseDown}
          numbers={innerNumbers}
          spacing={spacing}
          radius={radius - spacing * innerSpacing}
          classNames={classNames}
          active={selected}
        />
      ) : null}
      <Hand
        ref={hand}
        angle={selected * step}
        length={(inner ? radius - spacing * innerSpacing : radius) - spacing}
        onMove={(degrees, positionRadius) => {
          const nextInner = is24hr && positionRadius < radius - spacing * innerSpacing;
          if (is24hr) setInner(nextInner);
          onChange((format === 'ampm' || nextInner ? innerNumbers : outerNumbers)[degrees / step]);
        }}
        classNames={classNames}
        onMoved={onHandMoved}
        step={step}
      />
    </>
  );
}
