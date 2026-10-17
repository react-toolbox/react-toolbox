'use client';
import './tokens.css';

import { cn } from '../foundations/styles/cn';
import type { TimePickerClassNames } from './types';

import React, { useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { angle360FromPositions } from './geometry';
import events from './events';
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
  step: number;
  /** Classes for the component's rendered parts. */
  classNames?: TimePickerClassNames;
  ref?: React.Ref<ClockHandHandle>;
}
export default function ClockHand({
  angle = 0,
  className = '',
  length = 0,
  onMove,
  onMoved,
  step,
  classNames,
  ref,
}: ClockHandProps) {
  const knob = useRef<HTMLDivElement>(null);
  const [knobWidth, setKnobWidth] = useState(0);
  const current = useRef({ onMove, onMoved, step });
  current.current = { onMove, onMoved, step };
  const cleanup = useRef<() => void>(() => {});
  useEffect(() => {
    const timer = setTimeout(() => setKnobWidth(knob.current?.offsetWidth ?? 0));
    return () => {
      clearTimeout(timer);
      cleanup.current();
    };
  }, []);
  const move = useCallback((position: ClockPoint, face: HTMLElement) => {
    // Measure the touched face now: opening, zooming, and scrolling can all move it
    // after the clock's initial layout. Both the rect and pointer use viewport coordinates.
    const { left, top, width, height } = face.getBoundingClientRect();
    if (!width || !height) return;
    const origin = { x: left + width / 2, y: top + height / 2 };
    const latest = current.current;
    const angle = angle360FromPositions(origin.x, origin.y, position.x, position.y);
    const degrees = latest.step * Math.round(angle / latest.step);
    const x = origin.x - position.x,
      y = origin.y - position.y;
    // Keep inner/outer ring selection in layout pixels during the face's zoom animation.
    latest.onMove?.(degrees === 360 ? 0 : degrees, Math.hypot(x, y) * (face.offsetWidth / width));
  }, []);
  useImperativeHandle(
    ref,
    () => ({
      mouseStart(event) {
        if (event.defaultPrevented || event.button !== 0) return;
        cleanup.current();
        const face = event.currentTarget;
        const mouseMove = (event: MouseEvent) => move(events.getMousePosition(event), face);
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
        move(events.getMousePosition(event), face);
      },
      touchStart(event) {
        if (event.defaultPrevented || event.touches.length !== 1) return;
        cleanup.current();
        const face = event.currentTarget;
        const touchMove = (event: TouchEvent) => {
          if (event.touches.length) move(events.getTouchPosition(event), face);
        };
        const end = () => {
          cleanup.current();
          current.current.onMoved?.();
        };
        cleanup.current = () => {
          document.removeEventListener('touchmove', touchMove);
          document.removeEventListener('touchend', end);
          document.removeEventListener('touchcancel', cancel);
        };
        const cancel = () => cleanup.current();
        document.addEventListener('touchmove', touchMove);
        document.addEventListener('touchend', end);
        document.addEventListener('touchcancel', cancel);
        if (event.touches.length) move(events.getTouchPosition(event), face);
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
        'bg-(--clock-primary-color) bottom-[50%] block left-[50%] ml-[calc(-1*var(--clock-hand-width)/2)] absolute origin-[50%_100%] w-(--clock-hand-width)',
        "[&::before]:bg-(--clock-primary-color) [&::before]:rounded-[50%] [&::before]:bottom-0 [&::before]:[content:''] [&::before]:h-(--clock-hand-dot-size) [&::before]:left-[50%] [&::before]:mb-[calc(-1*var(--clock-hand-dot-size)/2)] [&::before]:ml-[calc(-1*var(--clock-hand-dot-size)/2)] [&::before]:absolute [&::before]:w-(--clock-hand-dot-size)",
        classNames?.hand,
      )} ${className}`}
      style={{ height: length - knobWidth / 2, transform: `rotate(${angle}deg)` }}
    >
      <div
        ref={knob}
        className={cn(
          'rt-time-picker-knob',
          'bg-(--clock-primary-color) rounded-[50%] cursor-pointer h-(--clock-knob-size) left-[50%] ml-[calc(-1*var(--clock-knob-size)/2)] absolute top-[calc(-1_*_var(--clock-knob-size))] w-(--clock-knob-size)',
          '[.rt-time-picker-hand.rt-time-picker-small>&]:bg-(--clock-primary-hover-color)',
          "[.rt-time-picker-hand.rt-time-picker-small>&::after]:[background:var(--clock-primary-color)] [.rt-time-picker-hand.rt-time-picker-small>&::after]:rounded-[50%] [.rt-time-picker-hand.rt-time-picker-small>&::after]:[content:''] [.rt-time-picker-hand.rt-time-picker-small>&::after]:h-(--clock-knob-small-size) [.rt-time-picker-hand.rt-time-picker-small>&::after]:left-[50%] [.rt-time-picker-hand.rt-time-picker-small>&::after]:ml-[calc(-1*var(--clock-knob-small-size)/2)] [.rt-time-picker-hand.rt-time-picker-small>&::after]:mt-[calc(-1*var(--clock-knob-small-size)/2)] [.rt-time-picker-hand.rt-time-picker-small>&::after]:absolute [.rt-time-picker-hand.rt-time-picker-small>&::after]:top-[50%] [.rt-time-picker-hand.rt-time-picker-small>&::after]:w-(--clock-knob-small-size)",
          "[.rt-time-picker-hand.rt-time-picker-small>&::before]:[background:var(--clock-primary-color)] [.rt-time-picker-hand.rt-time-picker-small>&::before]:bottom-0 [.rt-time-picker-hand.rt-time-picker-small>&::before]:[content:''] [.rt-time-picker-hand.rt-time-picker-small>&::before]:h-[calc(var(--clock-knob-size)-var(--clock-knob-small-size))] [.rt-time-picker-hand.rt-time-picker-small>&::before]:left-[50%] [.rt-time-picker-hand.rt-time-picker-small>&::before]:ml-[calc(-1*var(--clock-hand-width)/2)] [.rt-time-picker-hand.rt-time-picker-small>&::before]:absolute [.rt-time-picker-hand.rt-time-picker-small>&::before]:w-(--clock-hand-width)",
          classNames?.knob,
        )}
      />
    </div>
  );
}
