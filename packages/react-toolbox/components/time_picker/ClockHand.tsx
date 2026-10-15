'use client';
import { cn } from '../utils/cn';
import type { TimePickerTheme } from './types';

import React, { useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { angle360FromPositions } from '../utils/utils';
import events from '../utils/events';
export interface ClockPoint {
  x: number;
  y: number;
}
export interface ClockHandHandle {
  mouseStart(event: React.MouseEvent<HTMLElement>): void;
  touchStart(event: React.TouchEvent<HTMLElement>): void;
}
export interface ClockHandProps {
  angle?: number;
  className?: string;
  length?: number;
  onMove?: (angle: number, radius: number) => void;
  onMoved?: () => void;
  origin: ClockPoint;
  step: number;
  theme?: TimePickerTheme;
  ref?: React.Ref<ClockHandHandle>;
}
export default function ClockHand({
  angle = 0,
  className = '',
  length = 0,
  onMove,
  onMoved,
  origin,
  step,
  theme,
  ref,
}: ClockHandProps) {
  const knob = useRef<HTMLDivElement>(null);
  const [knobWidth, setKnobWidth] = useState(0);
  const current = useRef({ onMove, onMoved, origin, step });
  current.current = { onMove, onMoved, origin, step };
  const cleanup = useRef<() => void>(() => {});
  useEffect(() => {
    const timer = setTimeout(() => setKnobWidth(knob.current?.offsetWidth ?? 0));
    return () => {
      clearTimeout(timer);
      cleanup.current();
    };
  }, []);
  const move = useCallback((position: ClockPoint) => {
    const latest = current.current;
    const angle = angle360FromPositions(latest.origin.x, latest.origin.y, position.x, position.y);
    const degrees = latest.step * Math.round(angle / latest.step);
    const x = latest.origin.x - position.x,
      y = latest.origin.y - position.y;
    latest.onMove?.(degrees === 360 ? 0 : degrees, Math.sqrt(x * x + y * y));
  }, []);
  useImperativeHandle(
    ref,
    () => ({
      mouseStart(event) {
        cleanup.current();
        const mouseMove = (event: MouseEvent) => move(events.getMousePosition(event));
        const end = () => {
          cleanup.current();
          current.current.onMoved?.();
        };
        cleanup.current = () => {
          document.removeEventListener('mousemove', mouseMove);
          document.removeEventListener('mouseup', end);
        };
        document.addEventListener('mousemove', mouseMove);
        document.addEventListener('mouseup', end);
        move(events.getMousePosition(event));
      },
      touchStart(event) {
        cleanup.current();
        const touchMove = (event: TouchEvent) => {
          if (event.touches.length) move(events.getTouchPosition(event));
        };
        const end = () => {
          cleanup.current();
          current.current.onMoved?.();
        };
        cleanup.current = () => {
          document.removeEventListener('touchmove', touchMove);
          document.removeEventListener('touchend', end);
          document.removeEventListener('touchcancel', end);
        };
        document.addEventListener('touchmove', touchMove);
        document.addEventListener('touchend', end);
        document.addEventListener('touchcancel', end);
        if (event.touches.length) move(events.getTouchPosition(event));
        event.preventDefault();
        event.stopPropagation();
      },
    }),
    [move],
  );
  return (
    <div
      className={`${cn(
        'rt-time-picker-hand',
        'bg-[var(--clock-primary-color)] bottom-[50%] block left-[50%] ml-[calc(-1_*_var(--clock-hand-width)_/_2)] absolute [transform-origin:50%_100%] w-[var(--clock-hand-width)]',
        "[&::before]:bg-[var(--clock-primary-color)] [&::before]:rounded-[50%] [&::before]:bottom-0 [&::before]:[content:''] [&::before]:h-[var(--clock-hand-dot-size)] [&::before]:left-[50%] [&::before]:mb-[calc(-1_*_var(--clock-hand-dot-size)_/_2)] [&::before]:ml-[calc(-1_*_var(--clock-hand-dot-size)_/_2)] [&::before]:absolute [&::before]:w-[var(--clock-hand-dot-size)]",
        theme?.hand,
      )} ${className}`}
      style={{ height: length - knobWidth / 2, transform: `rotate(${angle}deg)` }}
    >
      <div
        ref={knob}
        className={cn(
          'rt-time-picker-knob',
          'bg-[var(--clock-primary-color)] rounded-[50%] cursor-pointer h-[var(--clock-knob-size)] left-[50%] ml-[calc(-1_*_var(--clock-knob-size)_/_2)] absolute top-[calc(-1_*_var(--clock-knob-size))] w-[var(--clock-knob-size)]',
          '[.rt-time-picker-hand.rt-time-picker-small>&]:bg-[var(--clock-primary-hover-color)]',
          "[.rt-time-picker-hand.rt-time-picker-small>&::after]:[background:var(--clock-primary-color)] [.rt-time-picker-hand.rt-time-picker-small>&::after]:rounded-[50%] [.rt-time-picker-hand.rt-time-picker-small>&::after]:[content:''] [.rt-time-picker-hand.rt-time-picker-small>&::after]:h-[var(--clock-knob-small-size)] [.rt-time-picker-hand.rt-time-picker-small>&::after]:left-[50%] [.rt-time-picker-hand.rt-time-picker-small>&::after]:ml-[calc(-1_*_var(--clock-knob-small-size)_/_2)] [.rt-time-picker-hand.rt-time-picker-small>&::after]:mt-[calc(-1_*_var(--clock-knob-small-size)_/_2)] [.rt-time-picker-hand.rt-time-picker-small>&::after]:absolute [.rt-time-picker-hand.rt-time-picker-small>&::after]:top-[50%] [.rt-time-picker-hand.rt-time-picker-small>&::after]:w-[var(--clock-knob-small-size)]",
          "[.rt-time-picker-hand.rt-time-picker-small>&::before]:[background:var(--clock-primary-color)] [.rt-time-picker-hand.rt-time-picker-small>&::before]:bottom-0 [.rt-time-picker-hand.rt-time-picker-small>&::before]:[content:''] [.rt-time-picker-hand.rt-time-picker-small>&::before]:h-[calc(var(--clock-knob-size)_-_var(--clock-knob-small-size))] [.rt-time-picker-hand.rt-time-picker-small>&::before]:left-[50%] [.rt-time-picker-hand.rt-time-picker-small>&::before]:ml-[calc(-1_*_var(--clock-hand-width)_/_2)] [.rt-time-picker-hand.rt-time-picker-small>&::before]:absolute [.rt-time-picker-hand.rt-time-picker-small>&::before]:w-[var(--clock-hand-width)]",
          theme?.knob,
        )}
      />
    </div>
  );
}
