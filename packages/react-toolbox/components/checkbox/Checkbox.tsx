'use client';

import React, { useImperativeHandle, useRef } from 'react';
import classnames from 'classnames';
import { mergeTheme } from '../theming';
import Check from './Check';
import defaults from './theme';
export type CheckboxTheme = Partial<typeof defaults>;
export interface CheckboxHandle {
  focus(): void;
  blur(): void;
  readonly inputElement: HTMLInputElement | null;
}
export interface CheckboxProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange' | 'type' | 'size' | 'onMouseEnter' | 'onMouseLeave'
> {
  label?: React.ReactNode;
  onMouseEnter?: React.MouseEventHandler<HTMLLabelElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLLabelElement>;
  ripple?: boolean;
  theme?: CheckboxTheme;
  ref?: React.Ref<CheckboxHandle>;
  onChange?: (checked: boolean, event: React.MouseEvent<HTMLInputElement>) => void;
}
export function Checkbox({
  checked = false,
  children,
  className = '',
  disabled = false,
  label,
  name,
  onChange,
  onMouseEnter,
  onMouseLeave,
  theme: overrides,
  ripple,
  ref,
  style,
  ...others
}: CheckboxProps) {
  const theme = mergeTheme(defaults, overrides);
  const input = useRef<HTMLInputElement>(null);
  const handle = {
    focus: () => input.current?.focus(),
    blur: () => input.current?.blur(),
    get inputElement() {
      return input.current;
    },
  };
  useImperativeHandle(ref, () => handle);
  const toggle = (event: React.MouseEvent<HTMLInputElement>) => {
    if (event.pageX !== 0 && event.pageY !== 0) input.current?.blur();
    if (!disabled) onChange?.(!checked, event);
  };
  return (
    <label
      data-react-toolbox="checkbox"
      className={classnames(theme.field, { [theme.disabled]: disabled }, className)}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <input
        {...others}
        checked={checked}
        className={theme.input}
        disabled={disabled}
        name={name}
        onChange={() => {}}
        onClick={toggle}
        ref={input}
        type="checkbox"
      />
      <Check disabled={disabled} ripple={ripple} theme={theme} checked={checked} style={style} />
      {label ? (
        <span data-react-toolbox="label" className={theme.text}>
          {label}
        </span>
      ) : null}
      {children}
    </label>
  );
}
export default Checkbox;
