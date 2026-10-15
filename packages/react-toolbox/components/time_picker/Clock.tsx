'use client';

import React, { useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { getAnimationModule } from '../utils/utils';
import time, { type TimeFormat } from '../utils/time';
import Hours from './ClockHours';
import Minutes from './ClockMinutes';
import defaults from './theme';
export interface ClockHandle {
  calculateShape(): void;
}
export interface ClockProps {
  display?: 'hours' | 'minutes';
  format?: TimeFormat;
  onChange: (time: Date) => void;
  onHandMoved?: () => void;
  theme: typeof defaults;
  time?: Date;
  ref?: React.Ref<ClockHandle>;
}
export default function Clock({
  display = 'hours',
  format = '24hr',
  onChange,
  onHandMoved,
  theme,
  time: suppliedTime,
  ref,
}: ClockProps) {
  const [initialTime] = useState(() => new Date());
  const value = suppliedTime ?? initialTime;
  const placeholder = useRef<HTMLDivElement>(null);
  const displayRefs = useRef({
    hours: React.createRef<HTMLDivElement>(),
    minutes: React.createRef<HTMLDivElement>(),
  });
  const [shape, setShape] = useState({ center: { x: 0, y: 0 }, radius: 0 });
  const calculateShape = useCallback(() => {
    if (!placeholder.current) return;
    const { top, left, width } = placeholder.current.getBoundingClientRect();
    const x = left + width / 2 - window.pageXOffset,
      y = top + width / 2 - window.pageXOffset;
    setShape((current) =>
      current.center.x === x && current.center.y === y && current.radius === width / 2
        ? current
        : { center: { x, y }, radius: width / 2 },
    );
  }, []);
  useImperativeHandle(ref, () => ({ calculateShape }), [calculateShape]);
  useEffect(() => {
    window.addEventListener('resize', calculateShape);
    const timer = setTimeout(calculateShape);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', calculateShape);
    };
  }, [calculateShape]);
  const animation = getAnimationModule(display === 'hours' ? 'zoomOut' : 'zoomIn', theme);
  return (
    <div data-react-toolbox="clock" className={theme.clock}>
      <div className={theme.placeholder} style={{ height: shape.radius * 2 }} ref={placeholder}>
        <TransitionGroup
          component={null}
          childFactory={(child) =>
            React.isValidElement<{ classNames?: typeof animation }>(child)
              ? React.cloneElement(child, { classNames: animation })
              : child
          }
        >
          <CSSTransition
            mountOnEnter
            unmountOnExit
            key={display}
            nodeRef={displayRefs.current[display]}
            classNames={animation}
            timeout={500}
          >
            <div
              key={display}
              ref={displayRefs.current[display]}
              className={theme.clockWrapper}
              style={{ height: shape.radius * 2 }}
            >
              {display === 'hours' ? (
                <Hours
                  center={shape.center}
                  format={format}
                  radius={shape.radius}
                  spacing={shape.radius * 0.18}
                  selected={value.getHours()}
                  onHandMoved={onHandMoved}
                  theme={theme}
                  onChange={(hour) => {
                    if (value.getHours() !== hour) {
                      const adapted =
                        format === 'ampm'
                          ? time.getTimeMode(value) === 'pm'
                            ? hour < 12
                              ? hour + 12
                              : hour
                            : hour === 12
                              ? 0
                              : hour
                          : hour;
                      onChange(time.setHours(value, adapted));
                    }
                  }}
                />
              ) : (
                <Minutes
                  center={shape.center}
                  radius={shape.radius}
                  spacing={shape.radius * 0.18}
                  selected={value.getMinutes()}
                  onHandMoved={onHandMoved}
                  theme={theme}
                  onChange={(minute) => {
                    if (value.getMinutes() !== minute) onChange(time.setMinutes(value, minute));
                  }}
                />
              )}
            </div>
          </CSSTransition>
        </TransitionGroup>
      </div>
    </div>
  );
}
