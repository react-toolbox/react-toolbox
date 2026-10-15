'use client';
import { materialRoot, materialDescendants } from '../utils/styles';
import type { CheckboxTheme } from './types';

import React, { useImperativeHandle, useRef } from 'react';
import { cn } from '../utils/cn';
import Check from './Check';
export type { CheckboxTheme } from './types';
export interface CheckboxHandle {
  focus(): void;
  blur(): void;
  readonly inputElement: HTMLInputElement | null;
}
export interface CheckboxProps
  extends Omit<
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
  theme,
  ripple,
  ref,
  style,
  ...others
}: CheckboxProps) {
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
      className={cn(
        'rt-checkbox-field',
        'block h-[var(--checkbox-size)] mb-[var(--checkbox-field-margin-bottom)] relative whitespace-nowrap',
        materialRoot,
        materialDescendants,
        theme?.field,
        disabled && cn('rt-checkbox-disabled', theme?.disabled),
        className,
      )}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <input
        {...others}
        checked={checked}
        className={cn('rt-checkbox-input', 'h-0 opacity-0 overflow-hidden absolute w-0', theme?.input)}
        disabled={disabled}
        name={name}
        onChange={() => {}}
        onClick={toggle}
        ref={input}
        type="checkbox"
      />
      <Check disabled={disabled} ripple={ripple} theme={theme} checked={checked} style={style} />
      {label ? (
        <span
          data-react-toolbox="label"
          className={cn(
            'rt-checkbox-text',
            'text-[color:var(--checkbox-text-color)] inline-block text-[length:var(--checkbox-text-font-size)] leading-[var(--checkbox-size)] pl-[var(--unit)] align-top whitespace-nowrap',
            '[.rt-checkbox-disabled>&]:text-[color:var(--checkbox-disabled-color)]',
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
export default Checkbox;
