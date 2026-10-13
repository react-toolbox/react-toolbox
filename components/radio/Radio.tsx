import React from 'react';
import classnames from 'classnames';
import { useRipple } from '../ripple';
import defaults from './theme';
export interface RadioProps extends React.HTMLAttributes<HTMLElement> {
  checked?: boolean;
  disabled?: boolean;
  ripple?: boolean;
  theme: typeof defaults;
}
export default function Radio({
  checked,
  disabled,
  ripple: enabled,
  theme,
  children,
  onMouseDown,
  onTouchStart,
  onTouchEnd,
  onTouchCancel,
  ...others
}: RadioProps) {
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
    <div
      {...others}
      data-react-toolbox="radio"
      className={theme[checked ? 'radioChecked' : 'radio']}
      onMouseDown={effects.onMouseDown}
      onTouchStart={effects.onTouchStart}
      onTouchEnd={effects.onTouchEnd}
      onTouchCancel={effects.onTouchCancel}
    >
      {children}
      {effects.ripple}
    </div>
  );
}
