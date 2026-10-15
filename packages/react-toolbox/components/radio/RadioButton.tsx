'use client';

import React, { useImperativeHandle, useRef } from 'react';
import classnames from 'classnames';
import { mergeTheme } from '../theming';
import Radio from './Radio';
import defaults from './theme';
export type RadioButtonTheme = Partial<typeof defaults>;
export interface RadioButtonHandle {
  focus(): void;
  blur(): void;
  readonly inputElement: HTMLInputElement | null;
}
export interface RadioButtonProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange' | 'type' | 'size' | 'onMouseEnter' | 'onMouseLeave'
> {
  label?: React.ReactNode;
  onMouseEnter?: React.MouseEventHandler<HTMLLabelElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLLabelElement>;
  ripple?: boolean;
  theme?: RadioButtonTheme;
  ref?: React.Ref<RadioButtonHandle>;
  value?: string;
  onChange?: (event: React.MouseEvent<HTMLInputElement>, handle: RadioButtonHandle) => void;
}
export function RadioButton({
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
}: RadioButtonProps) {
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
    if (!disabled && !checked) onChange?.(event, handle);
  };
  return (
    <label
      data-react-toolbox="radio-button"
      className={classnames(theme[disabled ? 'disabled' : 'field'], className)}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <input
        {...others}
        style={style}
        checked={checked}
        className={theme.input}
        disabled={disabled}
        name={name}
        onChange={() => {}}
        onClick={toggle}
        ref={input}
        type="radio"
      />
      <Radio disabled={disabled} ripple={ripple} theme={theme} checked={checked} />
      {label ? <span className={theme.text}>{label}</span> : null}
      {children}
    </label>
  );
}
export default RadioButton;
