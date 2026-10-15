'use client';
import { materialRoot, materialDescendants } from '../utils/styles';
import type { RadioTheme } from './types';

import React from 'react';
import { cn } from '../utils/cn';
import { useRipple } from '../ripple';
const radioClasses = [
  'rt-radio-radio',
  '[border:calc(0.2_*_var(--unit))_solid_var(--radio-border-color)] rounded-[50%] cursor-pointer inline-block h-[var(--radio-button-size)] relative align-top w-[var(--radio-button-size)]',
  materialRoot,
  materialDescendants,
  "[&::before]:bg-[var(--radio-inner-color)] [&::before]:rounded-[50%] [&::before]:[content:''] [&::before]:h-full [&::before]:left-0 [&::before]:absolute [&::before]:top-0 [&::before]:[transform:scale(0)] [&::before]:[transition:transform_0.2s_var(--animation-curve-default)] [&::before]:w-full",
  '[.rt-radio-disabled_&]:[border-color:var(--radio-disabled-color)] [.rt-radio-disabled_&]:[cursor:auto]',
  '[.rt-radio-input:focus~&]:[box-shadow:0_0_0_var(--unit)_var(--radio-focus-color)]',
].join(' ');

export interface RadioProps extends React.HTMLAttributes<HTMLElement> {
  checked?: boolean;
  disabled?: boolean;
  ripple?: boolean;
  theme?: RadioTheme;
}
export default function Radio({
  checked,
  disabled,
  ripple: enabled,
  theme,
  children,
  onMouseDown,
  onTouchStart,
  onTouchEnd,
  onTouchCancel,
  ...others
}: RadioProps) {
  const effects = useRipple({
    centered: true,
    spread: 2.6,
    disabled,
    ripple: enabled,
    theme: {
      ripple: cn(
        'rt-radio-ripple',
        '[.rt-radio-radio_&]:bg-[var(--radio-inner-color)] [.rt-radio-radio_&]:opacity-[0.3] [.rt-radio-radio_&]:[transition-duration:650ms]',
        theme?.ripple,
      ),
    },
    onMouseDown,
    onTouchStart,
    onTouchEnd,
    onTouchCancel,
  });
  return (
    <div
      {...others}
      data-react-toolbox="radio"
      className={
        checked
          ? cn(
              radioClasses,
              'rt-radio-radioChecked',
              '[border:calc(0.2_*_var(--unit))_solid_var(--radio-inner-color)]',
              '[&::before]:[transform:scale(0.65)]',
              '[.rt-radio-disabled_&]:[border-color:var(--radio-disabled-color)] [.rt-radio-disabled_&]:[cursor:auto]',
              '[.rt-radio-disabled_&::before]:bg-[var(--radio-disabled-color)]',
              '[.rt-radio-input:focus~&]:[box-shadow:0_0_0_var(--unit)_var(--radio-checked-focus-color)]',
              theme?.radio,
              theme?.radioChecked,
            )
          : cn(radioClasses, theme?.radio)
      }
      onMouseDown={effects.onMouseDown}
      onTouchStart={effects.onTouchStart}
      onTouchEnd={effects.onTouchEnd}
      onTouchCancel={effects.onTouchCancel}
    >
      {children}
      {effects.ripple}
    </div>
  );
}
