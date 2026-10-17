'use client';
import './tokens.css';

import type { TimePickerClassNames } from './types';

import React from 'react';
import { cn } from '../foundations/styles/cn';
export interface ClockFaceProps {
  active?: number;
  numbers?: readonly number[];
  radius?: number;
  spacing: number;
  /** Classes for the component's rendered parts. */
  classNames?: TimePickerClassNames;
  twoDigits?: boolean;
  onTouchStart?: React.TouchEventHandler<HTMLDivElement>;
  onMouseDown?: React.MouseEventHandler<HTMLDivElement>;
}
export default function ClockFace({
  active,
  numbers = [],
  radius = 0,
  spacing,
  classNames,
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
        classNames?.face,
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
            classNames?.number,
            number === active &&
              cn(
                'rt-time-picker-active',
                '[.rt-time-picker-number&]:text-(--clock-primary-contrast-color)',
                classNames?.active,
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
