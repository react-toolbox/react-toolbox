'use client';
import './tokens.css';

import { materialRoot, materialDescendants } from '../foundations/styles/classes';

import React, { useImperativeHandle, useRef } from 'react';
import { cn } from '../foundations/styles/cn';
import useChecked from '../foundations/forms/useChecked';
import Check from './Check';
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
  /** Inline styles for the root label. */
  style?: React.CSSProperties;
  /** A partially selected set; submitted values still follow checked. */
  indeterminate?: boolean;
  onMouseEnter?: React.MouseEventHandler<HTMLLabelElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLLabelElement>;
  ripple?: boolean;
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
  ripple,
  ref,
  style,
  ...others
}: CheckboxProps) {
  const input = useRef<HTMLInputElement>(null);
  const [checked, setChecked] = useChecked(input, controlledChecked, defaultChecked);
  const selection = useRef({ checked, indeterminate });
  React.useLayoutEffect(() => {
    selection.current = { checked, indeterminate };
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
    if (disabled) return;
    const next = event.currentTarget.checked;
    /** Browsers clear the mixed flag on activation; the prop remains authoritative. */
    event.currentTarget.indeterminate = indeterminate;
    if (!event.defaultPrevented) onChange?.(next, event);
    if (event.defaultPrevented) {
      /** React restores controlled state before the browser rolls back a cancelled click. */
      setTimeout(() => {
        if (input.current) {
          input.current.checked = selection.current.checked;
          input.current.indeterminate = selection.current.indeterminate;
        }
      }, 0);
    } else if (controlledChecked === undefined) {
      setChecked(next);
    }
  };
  return (
    <label
      data-react-toolbox="checkbox"
      className={cn(
        'rt-checkbox-field',
        'flex items-center min-h-[48px] min-w-[48px] py-[max(0px,calc((48px-var(--checkbox-size))/2))] mb-(--checkbox-field-margin-bottom) relative whitespace-nowrap',
        materialRoot,
        materialDescendants,
        disabled && 'rt-checkbox-disabled',
        className,
      )}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={style}
    >
      <input
        {...others}
        checked={controlledChecked}
        defaultChecked={controlledChecked === undefined ? defaultChecked : undefined}
        className={cn('rt-checkbox-input', 'h-0 opacity-0 overflow-hidden absolute w-0')}
        disabled={disabled}
        name={name}
        aria-checked={indeterminate ? 'mixed' : undefined}
        onChange={() => {}}
        onClick={toggle}
        ref={input}
        type="checkbox"
      />
      <Check disabled={disabled} ripple={ripple} checked={checked || indeterminate} indeterminate={indeterminate} />
      {label ? (
        <span
          data-react-toolbox="label"
          className={cn(
            'rt-checkbox-text',
            'text-(--checkbox-text-color) inline-block text-(length:--checkbox-text-font-size) leading-(--checkbox-size) ps-(--unit) align-top whitespace-nowrap',
            '[.rt-checkbox-disabled>&]:text-(--checkbox-disabled-color)',
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
