'use client';
import './tokens.css';

import { materialRoot, materialDescendants } from '../foundations/styles/classes';
import type { CheckboxClassNames } from './types';

import React from 'react';
import { cn } from '../foundations/styles/cn';
import { useRipple } from '../ripple';
export interface CheckProps extends React.HTMLAttributes<HTMLElement> {
  checked?: boolean;
  indeterminate?: boolean;
  disabled?: boolean;
  ripple?: boolean;
  /** Classes for the component's rendered parts. */
  classNames?: CheckboxClassNames;
}
export default function Check({
  checked,
  indeterminate,
  disabled,
  ripple: enabled,
  classNames,
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
    classNames: {
      ripple: cn(
        'rt-checkbox-ripple',
        '[.rt-checkbox-field_&]:bg-(--checkbox-color) [.rt-checkbox-field_&]:opacity-[0.3] [.rt-checkbox-field_&]:duration-(--checkbox-ripple-duration)',
        classNames?.ripple,
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
        'border-(--checkbox-border-color) rounded-[2px] border-solid [border-width:2px] cursor-pointer inline-block h-(--checkbox-size) relative duration-(--checkbox-transition-duration) [transition-property:background-color] [transition-timing-function:var(--animation-curve-default)] align-top w-(--checkbox-size)',
        materialRoot,
        materialDescendants,
        '[.rt-checkbox-disabled>&]:border-(--checkbox-disabled-color) [.rt-checkbox-disabled>&]:cursor-auto',
        "[.rt-checkbox-input:focus~&::before]:bg-(--checkbox-focus-color) [.rt-checkbox-input:focus~&::before]:rounded-[50%] [.rt-checkbox-input:focus~&::before]:[content:''] [.rt-checkbox-input:focus~&::before]:h-(--checkbox-focus-size) [.rt-checkbox-input:focus~&::before]:left-[50%] [.rt-checkbox-input:focus~&::before]:ml-[calc(-1*var(--checkbox-focus-size)/2)] [.rt-checkbox-input:focus~&::before]:mt-[calc(-1*var(--checkbox-focus-size)/2)] [.rt-checkbox-input:focus~&::before]:pointer-events-none [.rt-checkbox-input:focus~&::before]:absolute [.rt-checkbox-input:focus~&::before]:top-[50%] [.rt-checkbox-input:focus~&::before]:w-(--checkbox-focus-size)",
        '[.rt-checkbox-input:focus-visible~&]:[outline:2px_solid_var(--checkbox-border-color)] [.rt-checkbox-input:focus-visible~&]:outline-offset-2',
        classNames?.check,
        checked &&
          cn(
            'rt-checkbox-checked',
            '[.rt-checkbox-check&]:bg-(--checkbox-color) [.rt-checkbox-check&]:border-(--checkbox-color)',
            "[.rt-checkbox-check&::after]:animate-[rt-checkbox-checkmark-expand_140ms_ease-out_forwards] [.rt-checkbox-check&::after]:[border-bottom-width:2px] [.rt-checkbox-check&::after]:[border-color:var(--rt-color-background)] [.rt-checkbox-check&::after]:[border-left:0_solid] [.rt-checkbox-check&::after]:[border-right-width:2px] [.rt-checkbox-check&::after]:border-solid [.rt-checkbox-check&::after]:[border-top:0] [.rt-checkbox-check&::after]:[content:''] [.rt-checkbox-check&::after]:h-[calc(1.2*var(--unit))] [.rt-checkbox-check&::after]:left-[calc(0.4*var(--unit))] [.rt-checkbox-check&::after]:absolute [.rt-checkbox-check&::after]:top-[calc(-0.1*var(--unit))] [.rt-checkbox-check&::after]:transform-[rotate(45deg)] [.rt-checkbox-check&::after]:w-[calc(0.7*var(--unit))]",
            '[.rt-checkbox-disabled>.rt-checkbox-check&]:bg-(--checkbox-disabled-color) [.rt-checkbox-disabled>.rt-checkbox-check&]:border-transparent [.rt-checkbox-disabled>.rt-checkbox-check&]:cursor-auto',
            '[.rt-checkbox-input:focus~.rt-checkbox-check&::before]:bg-(--checkbox-focus-checked-color)',
            classNames?.checked,
          ),
        indeterminate &&
          '[&&&::after]:animate-none [&&&::after]:border-0 [&&&::after]:bg-(--rt-color-background) [&&&::after]:h-[2px] [&&&::after]:w-[10px] [&&&::after]:left-[2px] [&&&::after]:top-[6px] [&&&::after]:transform-none',
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
