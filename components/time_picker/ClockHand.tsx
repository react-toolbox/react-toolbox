import React, { useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { angle360FromPositions } from '../utils/utils';
import events from '../utils/events';
import defaults from './theme';
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
  theme: typeof defaults;
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
      className={`${theme.hand} ${className}`}
      style={{ height: length - knobWidth / 2, transform: `rotate(${angle}deg)` }}
    >
      <div ref={knob} className={theme.knob} />
    </div>
  );
}
