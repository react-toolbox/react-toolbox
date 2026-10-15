'use client';
import type { TimePickerTheme } from './types';

import React from 'react';
import { cn } from '../utils/cn';
export interface ClockFaceProps {
  active?: number;
  numbers?: readonly number[];
  radius?: number;
  spacing: number;
  theme?: TimePickerTheme;
  twoDigits?: boolean;
  onTouchStart?: React.TouchEventHandler<HTMLDivElement>;
  onMouseDown?: React.MouseEventHandler<HTMLDivElement>;
}
export default function ClockFace({
  active,
  numbers = [],
  radius = 0,
  spacing,
  theme,
  twoDigits = false,
  onTouchStart,
  onMouseDown,
}: ClockFaceProps) {
  const rad = radius - spacing;
  return (
    <div
      className={cn(
        'rt-time-picker-face',
        'rounded-[50%] cursor-pointer left-[50%] absolute top-[50%] transform-[translateX(-50%)_translateY(-50%)] z-(--z-index-high)',
        theme?.face,
      )}
      onTouchStart={onTouchStart}
      onMouseDown={onMouseDown}
      style={{ height: radius * 2, width: radius * 2 }}
    >
      {numbers.map((number, index) => (
        <span
          key={number}
          className={cn(
            'rt-time-picker-number',
            'h-(--clock-number-size) ml-[calc(-1*var(--clock-number-size)/2)] mt-[calc(-1*var(--clock-number-size)/2)] pointer-events-none relative text-center [-webkit-user-select:none] [-moz-user-select:none] select-none w-(--clock-number-size)',
            theme?.number,
            number === active &&
              cn(
                'rt-time-picker-active',
                '[.rt-time-picker-number&]:text-(--clock-primary-contrast-color)',
                theme?.active,
              ),
          )}
          style={{
            position: 'absolute',
            left: rad + rad * Math.sin(((360 * (Math.PI / 180)) / 12) * index) + spacing,
            top: rad - rad * Math.cos(((360 * (Math.PI / 180)) / 12) * index) + spacing,
          }}
        >
          {twoDigits ? `0${number}`.slice(-2) : number}
        </span>
      ))}
    </div>
  );
}
