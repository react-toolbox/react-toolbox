'use client';
import { mergeStyleSlots } from '../foundations/styles/slots';

import { materialRoot, materialDescendants } from '../foundations/styles/classes';
import type { SwitchTheme } from './types';

import React, { useImperativeHandle, useRef } from 'react';
import { cn } from '../foundations/styles/cn';
import Thumb from './Thumb';
const fieldClasses = [
  'rt-switch-field',
  'block mb-(--switch-field-margin-bottom) relative whitespace-normal',
  materialRoot,
  materialDescendants,
].join(' ');

export type { SwitchTheme, SwitchClassNames } from './types';
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
  /** Classes for the component's rendered parts. Applied after legacy theme overrides. */
  classNames?: SwitchTheme;
  /** @deprecated Use classNames for style slots; use ThemeProvider for design tokens. */
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
  theme: legacyTheme,
  classNames,
  ripple,
  ref,
  style,
  ...others
}: SwitchProps) {
  const theme = mergeStyleSlots(legacyTheme, classNames);
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
                'rounded-(--switch-track-height) cursor-pointer inline-block h-(--switch-track-height) mt-[calc((var(--switch-total-height)-var(--switch-track-height))/2)] relative align-top w-(--switch-track-length) [background:var(--switch-track-on-color)]',
                '[.rt-switch-disabled_&&]:[background:var(--switch-disabled-track-color)] [.rt-switch-disabled_&&]:cursor-auto',
                theme?.on,
              )
            : cn(
                'rt-switch-off',
                'rounded-(--switch-track-height) cursor-pointer inline-block h-(--switch-track-height) mt-[calc((var(--switch-total-height)-var(--switch-track-height))/2)] relative align-top w-(--switch-track-length) [background:var(--switch-track-off-color)]',
                '[.rt-switch-disabled_&&]:[background:var(--switch-disabled-track-color)] [.rt-switch-disabled_&&]:cursor-auto',
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
            'text-(--switch-text-color) inline-block text-(length:--switch-font-size) leading-(--switch-total-height) pl-(--unit) align-top whitespace-nowrap',
            '[.rt-switch-disabled_&&]:text-(--switch-disabled-text-color)',
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
