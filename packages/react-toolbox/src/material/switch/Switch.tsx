'use client';
import './tokens.css';

import { materialRoot, materialDescendants } from '../foundations/styles/classes';

import React, { useImperativeHandle, useRef } from 'react';
import { cn } from '../foundations/styles/cn';
import useChecked from '../foundations/forms/useChecked';
import Thumb from './Thumb';
const fieldClasses = [
  'rt-switch-field',
  'block min-h-[48px] min-w-[48px] py-[max(0px,calc((48px-var(--switch-total-height))/2))] mb-(--switch-field-margin-bottom) relative whitespace-normal',
  materialRoot,
  materialDescendants,
].join(' ');

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
  /** Inline styles for the root label. */
  style?: React.CSSProperties;
  onMouseEnter?: React.MouseEventHandler<HTMLLabelElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLLabelElement>;
  ripple?: boolean;
  ref?: React.Ref<SwitchHandle>;
  onChange?: (checked: boolean, event: React.MouseEvent<HTMLInputElement>) => void;
}
export function Switch({
  checked: controlledChecked,
  defaultChecked = false,
  children,
  className = '',
  disabled = false,
  label,
  name,
  onChange,
  onClick,
  onMouseEnter,
  onMouseLeave,
  ripple,
  ref,
  style,
  ...others
}: SwitchProps) {
  const input = useRef<HTMLInputElement>(null);
  const [checked, setChecked, restoreInput] = useChecked(input, controlledChecked, defaultChecked);
  const handle = {
    focus: () => input.current?.focus(),
    blur: () => input.current?.blur(),
    get inputElement() {
      return input.current;
    },
  };
  useImperativeHandle(ref, () => handle);
  const toggle = (event: React.MouseEvent<HTMLInputElement>) => {
    onClick?.(event);
    if (disabled) return;
    const next = event.currentTarget.checked;
    if (!event.defaultPrevented) onChange?.(next, event);
    if (event.defaultPrevented) restoreInput();
    else if (controlledChecked === undefined) setChecked(next);
  };
  return (
    <label
      data-react-toolbox="switch"
      className={cn(fieldClasses, disabled && 'rt-switch-disabled', className)}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={style}
    >
      <input
        {...others}
        checked={controlledChecked}
        defaultChecked={controlledChecked === undefined ? defaultChecked : undefined}
        className={cn('rt-switch-input', 'h-0 opacity-0 overflow-hidden w-0')}
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
              )
            : cn(
                'rt-switch-off',
                'rounded-(--switch-track-height) cursor-pointer inline-block h-(--switch-track-height) mt-[calc((var(--switch-total-height)-var(--switch-track-height))/2)] relative align-top w-(--switch-track-length) [background:var(--switch-track-off-color)]',
                '[.rt-switch-disabled_&&]:[background:var(--switch-disabled-track-color)] [.rt-switch-disabled_&&]:cursor-auto',
              )
        }
      >
        {' '}
        <Thumb disabled={disabled} ripple={ripple} />{' '}
      </span>
      {label ? (
        <span
          className={cn(
            'rt-switch-text',
            'text-(--switch-text-color) inline-block text-(length:--switch-font-size) leading-(--switch-total-height) ps-(--unit) align-top whitespace-nowrap',
            '[.rt-switch-disabled_&&]:text-(--switch-disabled-text-color)',
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
