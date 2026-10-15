'use client';
import { materialRoot, materialDescendants } from '../utils/styles';
import type { SwitchTheme } from './types';

import React, { useImperativeHandle, useRef } from 'react';
import { cn } from '../utils/cn';
import Thumb from './Thumb';
const fieldClasses = [
  'rt-switch-field',
  'block mb-[var(--switch-field-margin-bottom)] relative whitespace-normal',
  materialRoot,
  materialDescendants,
].join(' ');

export type { SwitchTheme } from './types';
export interface SwitchHandle {
  focus(): void;
  blur(): void;
  readonly inputElement: HTMLInputElement | null;
}
export interface SwitchProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'onChange' | 'type' | 'size' | 'onMouseEnter' | 'onMouseLeave'
  > {
  label?: React.ReactNode;
  onMouseEnter?: React.MouseEventHandler<HTMLLabelElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLLabelElement>;
  ripple?: boolean;
  theme?: SwitchTheme;
  ref?: React.Ref<SwitchHandle>;
  onChange?: (checked: boolean, event: React.MouseEvent<HTMLInputElement>) => void;
}
export function Switch({
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
}: SwitchProps) {
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
      data-react-toolbox="switch"
      className={cn(
        disabled
          ? cn(fieldClasses, 'rt-switch-disabled', theme?.field, theme?.disabled)
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
        className={cn('rt-switch-input', 'h-0 opacity-0 overflow-hidden w-0', theme?.input)}
        disabled={disabled}
        name={name}
        role="switch"
        readOnly
        onClick={toggle}
        ref={input}
        type="checkbox"
      />
      <span
        className={
          checked
            ? cn(
                'rt-switch-on',
                'rounded-[var(--switch-track-height)] cursor-pointer inline-block h-[var(--switch-track-height)] mt-[calc((var(--switch-total-height)_-_var(--switch-track-height))_/_2)] relative align-top w-[var(--switch-track-length)] [background:var(--switch-track-on-color)]',
                '[.rt-switch-disabled_&&]:[background:var(--switch-disabled-track-color)] [.rt-switch-disabled_&&]:[cursor:auto]',
                theme?.on,
              )
            : cn(
                'rt-switch-off',
                'rounded-[var(--switch-track-height)] cursor-pointer inline-block h-[var(--switch-track-height)] mt-[calc((var(--switch-total-height)_-_var(--switch-track-height))_/_2)] relative align-top w-[var(--switch-track-length)] [background:var(--switch-track-off-color)]',
                '[.rt-switch-disabled_&&]:[background:var(--switch-disabled-track-color)] [.rt-switch-disabled_&&]:[cursor:auto]',
                theme?.off,
              )
        }
      >
        {' '}
        <Thumb disabled={disabled} ripple={ripple} theme={theme} />{' '}
      </span>
      {label ? (
        <span
          className={cn(
            'rt-switch-text',
            'text-[color:var(--switch-text-color)] inline-block text-[length:var(--switch-font-size)] leading-[var(--switch-total-height)] pl-[var(--unit)] align-top whitespace-nowrap',
            '[.rt-switch-disabled_&&]:text-[color:var(--switch-disabled-text-color)]',
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
export default Switch;
