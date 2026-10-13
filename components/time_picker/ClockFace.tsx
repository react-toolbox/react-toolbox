import React from 'react';
import classnames from 'classnames';
import defaults from './theme';
export interface ClockFaceProps {
  active?: number;
  numbers?: readonly number[];
  radius?: number;
  spacing: number;
  theme: typeof defaults;
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
      className={theme.face}
      onTouchStart={onTouchStart}
      onMouseDown={onMouseDown}
      style={{ height: radius * 2, width: radius * 2 }}
    >
      {numbers.map((number, index) => (
        <span
          key={number}
          className={classnames(theme.number, { [theme.active]: number === active })}
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
