'use client';
import { mergeStyleSlots } from '../foundations/styles/slots';

import React, { useId } from 'react';
import type { RadioButtonTheme } from './RadioButton';
import { RadioGroupContext } from './context';
export interface RadioGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  disabled?: boolean;
  name?: string;
  form?: string;
  required?: boolean;
  value?: string;
  defaultValue?: string;
  /** Classes for the component's rendered parts. Applied after legacy theme overrides. */
  classNames?: RadioButtonTheme;
  /** @deprecated Use classNames for style slots; use ThemeProvider for design tokens. */
  theme?: RadioButtonTheme;
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
  theme: legacyTheme,
  classNames,
  value,
  defaultValue,
  ...others
}: RadioGroupProps) {
  const theme = mergeStyleSlots(legacyTheme, classNames);
  const id = useId();
  return (
    <RadioGroupContext
      value={{ name: name || `radio-${id}`, form, required, value, defaultValue, disabled, theme, onChange }}
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
