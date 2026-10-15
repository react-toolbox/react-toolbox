'use client';
import type { RadioTheme } from './types';

import React, { useImperativeHandle, useRef } from 'react';
import { cn } from '../utils/cn';
import Radio from './Radio';
const fieldClasses = [
  'rt-radio-field',
  'block h-(--radio-button-size) mb-(--radio-field-margin-bottom) relative whitespace-nowrap',
].join(' ');

export type RadioButtonTheme = RadioTheme;
export interface RadioButtonHandle {
  focus(): void;
  blur(): void;
  readonly inputElement: HTMLInputElement | null;
}
export interface RadioButtonProps
  extends Omit<
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
  theme,
  ripple,
  ref,
  style,
  ...others
}: RadioButtonProps) {
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
      className={cn(
        disabled
          ? cn(fieldClasses, 'rt-radio-disabled', theme?.field, theme?.disabled)
          : cn(fieldClasses, theme?.field),
        className,
      )}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <input
        {...others}
        style={style}
        checked={checked}
        className={cn(
          'rt-radio-input',
          '[-webkit-appearance:none] [-moz-appearance:none] appearance-none [border:0] h-0 m-0 opacity-0 p-0 absolute w-0',
          theme?.input,
        )}
        disabled={disabled}
        name={name}
        onChange={() => {}}
        onClick={toggle}
        ref={input}
        type="radio"
      />
      <Radio disabled={disabled} ripple={ripple} theme={theme} checked={checked} />
      {label ? (
        <span
          className={cn(
            'rt-radio-text',
            'text-(--radio-text-color) inline-block text-(length:--radio-text-font-size) leading-(--radio-button-size) pl-(--unit) align-top whitespace-nowrap',
            '[.rt-radio-disabled_&]:text-(--radio-disabled-color)',
            theme?.text,
          )}
        >
          {label}
        </span>
      ) : null}
      {children}
    </label>
  );
}
export default RadioButton;
