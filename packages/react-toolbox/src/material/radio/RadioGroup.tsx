'use client';

import React, { useId } from 'react';
import type { RadioButtonClassNames } from './RadioButton';
import { RadioGroupContext } from './context';
export interface RadioGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  disabled?: boolean;
  name?: string;
  form?: string;
  required?: boolean;
  value?: string;
  defaultValue?: string;
  /** Classes for the component's rendered parts. */
  classNames?: RadioButtonClassNames;
  onChange?: (value: string | undefined, event: React.MouseEvent<HTMLInputElement>) => void;
  ref?: React.Ref<HTMLDivElement>;
}
export function RadioGroup({
  children,
  className = '',
  disabled = false,
  name,
  form,
  required,
  onChange,
  classNames,
  value,
  defaultValue,
  ...others
}: RadioGroupProps) {
  const id = useId();
  return (
    <RadioGroupContext
      value={{ name: name || `radio-${id}`, form, required, value, defaultValue, disabled, classNames, onChange }}
    >
      <div
        {...others}
        role="radiogroup"
        data-react-toolbox="radio-group"
        className={className}
        aria-disabled={disabled || undefined}
        aria-required={required || undefined}
      >
        {children}
      </div>
    </RadioGroupContext>
  );
}
export default RadioGroup;
