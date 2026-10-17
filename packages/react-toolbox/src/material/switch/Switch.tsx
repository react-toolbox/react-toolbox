'use client';
import './tokens.css';

import { materialRoot, materialDescendants } from '../foundations/styles/classes';
import type { SwitchClassNames } from './types';

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

export type { SwitchClassNames } from './types';
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
  /** Classes for the component's rendered parts. */
  classNames?: SwitchClassNames;
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
  classNames,
  ripple,
  ref,
  style,
  ...others
}: SwitchProps) {
  const input = useRef<HTMLInputElement>(null);
  const [checked, setChecked] = useChecked(input, controlledChecked, defaultChecked);
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
    if (disabled || event.defaultPrevented) return;
    const next = event.currentTarget.checked;
    if (controlledChecked === undefined) setChecked(next);
    onChange?.(next, event);
  };
  return (
    <label
      data-react-toolbox="switch"
      className={cn(
        disabled
          ? cn(fieldClasses, 'rt-switch-disabled', classNames?.field, classNames?.disabled)
          : cn(fieldClasses, classNames?.field),
        className,
      )}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <input
        {...others}
        style={style}
        checked={controlledChecked}
        defaultChecked={controlledChecked === undefined ? defaultChecked : undefined}
        className={cn('rt-switch-input', 'h-0 opacity-0 overflow-hidden w-0', classNames?.input)}
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
                classNames?.on,
              )
            : cn(
                'rt-switch-off',
                'rounded-(--switch-track-height) cursor-pointer inline-block h-(--switch-track-height) mt-[calc((var(--switch-total-height)-var(--switch-track-height))/2)] relative align-top w-(--switch-track-length) [background:var(--switch-track-off-color)]',
                '[.rt-switch-disabled_&&]:[background:var(--switch-disabled-track-color)] [.rt-switch-disabled_&&]:cursor-auto',
                classNames?.off,
              )
        }
      >
        {' '}
        <Thumb disabled={disabled} ripple={ripple} classNames={classNames} />{' '}
      </span>
      {label ? (
        <span
          className={cn(
            'rt-switch-text',
            'text-(--switch-text-color) inline-block text-(length:--switch-font-size) leading-(--switch-total-height) ps-(--unit) align-top whitespace-nowrap',
            '[.rt-switch-disabled_&&]:text-(--switch-disabled-text-color)',
            classNames?.text,
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
