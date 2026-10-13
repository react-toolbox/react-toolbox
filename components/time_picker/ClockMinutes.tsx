import React, { useRef } from 'react';
import { range } from '../utils/utils';
import Hand, { type ClockHandHandle, type ClockPoint } from './ClockHand';
import Face from './ClockFace';
import defaults from './theme';
const minutes = range(0, 60, 5);
const step = 360 / 60;
export interface ClockMinutesProps {
  center: ClockPoint;
  onChange?: (minute: number) => void;
  onHandMoved?: () => void;
  radius: number;
  selected?: number;
  spacing: number;
  theme: typeof defaults;
}
export default function ClockMinutes({
  center,
  onChange,
  radius,
  selected = 0,
  spacing,
  theme,
}: ClockMinutesProps) {
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
        className={!minutes.includes(selected) ? theme.small : ''}
        angle={selected * step}
        length={radius - spacing}
        onMove={(degrees) => onChange?.(degrees / step)}
        origin={center}
        theme={theme}
        step={step}
      />
    </>
  );
}
