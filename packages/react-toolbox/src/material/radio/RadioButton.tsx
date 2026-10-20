'use client';
import './tokens.css';

import React, { useContext, useImperativeHandle, useRef } from 'react';
import { RadioGroupContext } from './context';
import { cn } from '../foundations/styles/cn';
import useChecked from '../foundations/forms/useChecked';
import Radio from './Radio';
const fieldClasses = [
  'rt-radio-field',
  'box-border flex items-center min-h-[48px] min-w-[48px] py-[max(0px,calc((48px-var(--radio-button-size))/2))] mb-(--radio-field-margin-bottom) relative whitespace-nowrap',
].join(' ');

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
  /** Inline styles for the root label. */
  style?: React.CSSProperties;
  onMouseEnter?: React.MouseEventHandler<HTMLLabelElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLLabelElement>;
  ripple?: boolean;
  ref?: React.Ref<RadioButtonHandle>;
  value?: string;
  onChange?: (event: React.MouseEvent<HTMLInputElement>, handle: RadioButtonHandle) => void;
}
export function RadioButton({
  checked: suppliedChecked,
  defaultChecked: suppliedDefaultChecked,
  children,
  className = '',
  disabled: suppliedDisabled = false,
  label,
  name: suppliedName,
  value,
  onChange,
  onClick,
  onMouseEnter,
  onMouseLeave,
  ripple,
  ref,
  style,
  ...others
}: RadioButtonProps) {
  const group = useContext(RadioGroupContext);
  const disabled = Boolean(group?.disabled || suppliedDisabled);
  const name = group?.name ?? suppliedName;
  const controlledChecked = group?.value !== undefined ? group.value === value : suppliedChecked;
  const defaultChecked = suppliedDefaultChecked ?? (group?.defaultValue !== undefined && group.defaultValue === value);
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
    if (!event.defaultPrevented && !checked) {
      onChange?.(event, handle);
      if (!event.defaultPrevented) group?.onChange?.(value, event);
    }
    if (event.defaultPrevented) restoreInput();
    else if (controlledChecked === undefined) setChecked(next);
  };
  return (
    <label
      data-react-toolbox="radio-button"
      className={cn(fieldClasses, disabled && 'rt-radio-disabled', className)}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={style}
    >
      <input
        {...others}
        checked={controlledChecked}
        defaultChecked={controlledChecked === undefined ? defaultChecked : undefined}
        className={cn(
          'rt-radio-input',
          '[-webkit-appearance:none] [-moz-appearance:none] appearance-none [border:0] h-0 m-0 opacity-0 p-0 absolute w-0',
        )}
        disabled={disabled}
        name={name}
        form={others.form ?? group?.form}
        required={others.required ?? group?.required}
        value={value}
        onChange={() => {}}
        onClick={toggle}
        ref={input}
        type="radio"
      />
      <Radio disabled={disabled} ripple={ripple} checked={checked} />
      {label ? (
        <span
          className={cn(
            'rt-radio-text',
            'text-(--radio-text-color) inline-block text-(length:--radio-text-font-size) leading-(--radio-button-size) ps-(--unit) align-top whitespace-nowrap',
            '[.rt-radio-disabled_&]:text-(--radio-disabled-color)',
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
