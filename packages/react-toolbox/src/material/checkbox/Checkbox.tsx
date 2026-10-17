'use client';
import './tokens.css';

import { materialRoot, materialDescendants } from '../foundations/styles/classes';
import type { CheckboxClassNames } from './types';

import React, { useImperativeHandle, useRef } from 'react';
import { cn } from '../foundations/styles/cn';
import useChecked from '../foundations/forms/useChecked';
import Check from './Check';
export type { CheckboxClassNames } from './types';
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
  /** A partially selected set; submitted values still follow checked. */
  indeterminate?: boolean;
  onMouseEnter?: React.MouseEventHandler<HTMLLabelElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLLabelElement>;
  ripple?: boolean;
  /** Classes for the component's rendered parts. */
  classNames?: CheckboxClassNames;
  ref?: React.Ref<CheckboxHandle>;
  onChange?: (checked: boolean, event: React.MouseEvent<HTMLInputElement>) => void;
}
export function Checkbox({
  checked: controlledChecked,
  defaultChecked = false,
  children,
  className = '',
  disabled = false,
  label,
  indeterminate = false,
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
}: CheckboxProps) {
  const input = useRef<HTMLInputElement>(null);
  const [checked, setChecked] = useChecked(input, controlledChecked, defaultChecked);
  React.useLayoutEffect(() => {
    if (input.current) input.current.indeterminate = indeterminate;
  }, [indeterminate, checked]);
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
    // Browsers clear the mixed flag on activation; the prop remains authoritative.
    event.currentTarget.indeterminate = indeterminate;
    if (controlledChecked === undefined) setChecked(next);
    onChange?.(next, event);
  };
  return (
    <label
      data-react-toolbox="checkbox"
      className={cn(
        'rt-checkbox-field',
        'block min-h-[48px] min-w-[48px] py-[max(0px,calc((48px-var(--checkbox-size))/2))] mb-(--checkbox-field-margin-bottom) relative whitespace-nowrap',
        materialRoot,
        materialDescendants,
        classNames?.field,
        disabled && cn('rt-checkbox-disabled', classNames?.disabled),
        className,
      )}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <input
        {...others}
        checked={controlledChecked}
        defaultChecked={controlledChecked === undefined ? defaultChecked : undefined}
        className={cn('rt-checkbox-input', 'h-0 opacity-0 overflow-hidden absolute w-0', classNames?.input)}
        disabled={disabled}
        name={name}
        aria-checked={indeterminate ? 'mixed' : undefined}
        onChange={() => {}}
        onClick={toggle}
        ref={input}
        type="checkbox"
      />
      <Check
        disabled={disabled}
        ripple={ripple}
        classNames={classNames}
        checked={checked || indeterminate}
        indeterminate={indeterminate}
        style={style}
      />
      {label ? (
        <span
          data-react-toolbox="label"
          className={cn(
            'rt-checkbox-text',
            'text-(--checkbox-text-color) inline-block text-(length:--checkbox-text-font-size) leading-(--checkbox-size) ps-(--unit) align-top whitespace-nowrap',
            '[.rt-checkbox-disabled>&]:text-(--checkbox-disabled-color)',
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
export default Checkbox;
