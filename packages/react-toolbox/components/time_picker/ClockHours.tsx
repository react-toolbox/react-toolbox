'use client';

import React, { useEffect, useRef, useState } from 'react';
import { range } from '../utils/utils';
import type { TimeFormat } from '../utils/time';
import Hand, { type ClockHandHandle, type ClockPoint } from './ClockHand';
import Face from './ClockFace';
import defaults from './theme';
const outerNumbers = [0, ...range(13, 24)];
const innerNumbers = [12, ...range(1, 12)];
const innerSpacing = 1.7;
const step = 360 / 12;
export interface ClockHoursProps {
  center: ClockPoint;
  format: TimeFormat;
  onChange: (hour: number) => void;
  onHandMoved?: () => void;
  radius: number;
  selected: number;
  spacing: number;
  theme: typeof defaults;
}
export default function ClockHours({
  center,
  format,
  onChange,
  onHandMoved,
  radius,
  selected,
  spacing,
  theme,
}: ClockHoursProps) {
  const [inner, setInner] = useState(format === '24hr' && selected > 0 && selected <= 12);
  const hand = useRef<ClockHandHandle>(null);
  useEffect(
    () => setInner(format === '24hr' && selected > 0 && selected <= 12),
    [selected, format],
  );
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
        theme={theme}
      />
      {is24hr ? (
        <Face
          onTouchStart={touchStart}
          onMouseDown={mouseDown}
          numbers={innerNumbers}
          spacing={spacing}
          radius={radius - spacing * innerSpacing}
          theme={theme}
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
        theme={theme}
        onMoved={onHandMoved}
        origin={center}
        step={step}
      />
    </>
  );
}
