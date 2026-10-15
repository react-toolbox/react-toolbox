'use client';

import React from 'react';
import classnames from 'classnames';
import { useRipple } from '../ripple';
import defaults from './theme';
export interface ThumbProps extends React.HTMLAttributes<HTMLElement> {
  disabled?: boolean;
  ripple?: boolean;
  theme: typeof defaults;
}
export default function Thumb({
  disabled,
  ripple: enabled,
  theme,
  children,
  onMouseDown,
  onTouchStart,
  onTouchEnd,
  onTouchCancel,
  ...others
}: ThumbProps) {
  const effects = useRipple({
    centered: true,
    spread: 2.6,
    disabled,
    ripple: enabled,
    theme: { ripple: theme.ripple },
    onMouseDown,
    onTouchStart,
    onTouchEnd,
    onTouchCancel,
  });
  return (
    <span
      {...others}
      className={theme.thumb}
      onMouseDown={effects.onMouseDown}
      onTouchStart={effects.onTouchStart}
      onTouchEnd={effects.onTouchEnd}
      onTouchCancel={effects.onTouchCancel}
    >
      {children}
      {effects.ripple}
    </span>
  );
}
