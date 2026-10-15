'use client';
import { materialRoot, materialDescendants } from '../utils/styles';
import type { CheckboxTheme } from './types';

import React from 'react';
import { cn } from '../utils/cn';
import { useRipple } from '../ripple';
export interface CheckProps extends React.HTMLAttributes<HTMLElement> {
  checked?: boolean;
  disabled?: boolean;
  ripple?: boolean;
  theme?: CheckboxTheme;
}
export default function Check({
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
}: CheckProps) {
  const effects = useRipple({
    centered: true,
    spread: 2.6,
    disabled,
    ripple: enabled,
    theme: {
      ripple: cn(
        'rt-checkbox-ripple',
        '[.rt-checkbox-field_&]:bg-[var(--checkbox-color)] [.rt-checkbox-field_&]:opacity-[0.3] [.rt-checkbox-field_&]:[transition-duration:var(--checkbox-ripple-duration)]',
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
      data-react-toolbox="check"
      className={cn(
        'rt-checkbox-check',
        '[border-color:var(--checkbox-border-color)] rounded-[2px] border-solid [border-width:2px] cursor-pointer inline-block h-[var(--checkbox-size)] relative [transition-duration:var(--checkbox-transition-duration)] [transition-property:background-color] [transition-timing-function:var(--animation-curve-default)] align-top w-[var(--checkbox-size)]',
        materialRoot,
        materialDescendants,
        '[.rt-checkbox-disabled>&]:[border-color:var(--checkbox-disabled-color)] [.rt-checkbox-disabled>&]:[cursor:auto]',
        "[.rt-checkbox-input:focus~&::before]:bg-[var(--checkbox-focus-color)] [.rt-checkbox-input:focus~&::before]:rounded-[50%] [.rt-checkbox-input:focus~&::before]:[content:''] [.rt-checkbox-input:focus~&::before]:h-[var(--checkbox-focus-size)] [.rt-checkbox-input:focus~&::before]:left-[50%] [.rt-checkbox-input:focus~&::before]:ml-[calc(-1_*_var(--checkbox-focus-size)_/_2)] [.rt-checkbox-input:focus~&::before]:mt-[calc(-1_*_var(--checkbox-focus-size)_/_2)] [.rt-checkbox-input:focus~&::before]:pointer-events-none [.rt-checkbox-input:focus~&::before]:absolute [.rt-checkbox-input:focus~&::before]:top-[50%] [.rt-checkbox-input:focus~&::before]:w-[var(--checkbox-focus-size)]",
        '[.rt-checkbox-input:focus-visible~&]:[outline:2px_solid_var(--checkbox-border-color)] [.rt-checkbox-input:focus-visible~&]:[outline-offset:2px]',
        theme?.check,
        checked &&
          cn(
            'rt-checkbox-checked',
            '[.rt-checkbox-check&]:bg-[var(--checkbox-color)] [.rt-checkbox-check&]:[border-color:var(--checkbox-color)]',
            "[.rt-checkbox-check&::after]:[animation:rt-checkbox-checkmark-expand_140ms_ease-out_forwards] [.rt-checkbox-check&::after]:[border-bottom-width:2px] [.rt-checkbox-check&::after]:[border-color:var(--rt-color-background)] [.rt-checkbox-check&::after]:[border-left:0_solid] [.rt-checkbox-check&::after]:[border-right-width:2px] [.rt-checkbox-check&::after]:border-solid [.rt-checkbox-check&::after]:[border-top:0] [.rt-checkbox-check&::after]:[content:''] [.rt-checkbox-check&::after]:h-[calc(1.2_*_var(--unit))] [.rt-checkbox-check&::after]:left-[calc(0.4_*_var(--unit))] [.rt-checkbox-check&::after]:absolute [.rt-checkbox-check&::after]:top-[calc(-0.1_*_var(--unit))] [.rt-checkbox-check&::after]:[transform:rotate(45deg)] [.rt-checkbox-check&::after]:w-[calc(0.7_*_var(--unit))]",
            '[.rt-checkbox-disabled>.rt-checkbox-check&]:bg-[var(--checkbox-disabled-color)] [.rt-checkbox-disabled>.rt-checkbox-check&]:[border-color:transparent] [.rt-checkbox-disabled>.rt-checkbox-check&]:[cursor:auto]',
            '[.rt-checkbox-input:focus~.rt-checkbox-check&::before]:bg-[var(--checkbox-focus-checked-color)]',
            theme?.checked,
          ),
      )}
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
