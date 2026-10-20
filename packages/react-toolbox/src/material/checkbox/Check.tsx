'use client';
import './tokens.css';

import { materialRoot, materialDescendants } from '../foundations/styles/classes';

import React from 'react';
import { cn } from '../foundations/styles/cn';
import { useRipple } from '../ripple';
export interface CheckProps extends React.HTMLAttributes<HTMLElement> {
  checked?: boolean;
  indeterminate?: boolean;
  disabled?: boolean;
  ripple?: boolean;
}
export default function Check({
  checked,
  indeterminate,
  disabled,
  ripple: enabled,
  className,
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
    className: cn(
      'rt-checkbox-ripple',
      '[.rt-checkbox-field_&]:bg-(--checkbox-color) [.rt-checkbox-field_&]:opacity-[0.3] [.rt-checkbox-field_&]:duration-(--checkbox-ripple-duration)',
    ),
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
        'border-(--checkbox-border-color) rounded-[2px] border-solid [border-width:2px] cursor-pointer inline-block shrink-0 h-(--checkbox-size) relative duration-(--checkbox-transition-duration) [transition-property:background-color] [transition-timing-function:var(--animation-curve-default)] align-top w-(--checkbox-size)',
        materialRoot,
        materialDescendants,
        '[.rt-checkbox-disabled>&]:border-(--checkbox-disabled-color) [.rt-checkbox-disabled>&]:cursor-auto',
        "[.rt-checkbox-input:focus-visible~&::before]:bg-(--checkbox-focus-color) [.rt-checkbox-input:focus-visible~&::before]:rounded-[50%] [.rt-checkbox-input:focus-visible~&::before]:[content:''] [.rt-checkbox-input:focus-visible~&::before]:h-(--checkbox-focus-size) [.rt-checkbox-input:focus-visible~&::before]:left-[50%] [.rt-checkbox-input:focus-visible~&::before]:ml-[calc(-1*var(--checkbox-focus-size)/2)] [.rt-checkbox-input:focus-visible~&::before]:mt-[calc(-1*var(--checkbox-focus-size)/2)] [.rt-checkbox-input:focus-visible~&::before]:pointer-events-none [.rt-checkbox-input:focus-visible~&::before]:absolute [.rt-checkbox-input:focus-visible~&::before]:top-[50%] [.rt-checkbox-input:focus-visible~&::before]:w-(--checkbox-focus-size)",
        '[.rt-checkbox-input:focus-visible~&]:[outline:2px_solid_var(--checkbox-border-color)] [.rt-checkbox-input:focus-visible~&]:outline-offset-2',
        checked &&
          cn(
            'rt-checkbox-checked',
            '[.rt-checkbox-check&]:bg-(--checkbox-color) [.rt-checkbox-check&]:border-(--checkbox-color)',
            "[.rt-checkbox-check&::after]:animate-[rt-checkbox-checkmark-expand_140ms_ease-out_forwards] [.rt-checkbox-check&::after]:[border-bottom-width:2px] [.rt-checkbox-check&::after]:[border-color:var(--rt-color-background)] [.rt-checkbox-check&::after]:[border-left:0_solid] [.rt-checkbox-check&::after]:[border-right-width:2px] [.rt-checkbox-check&::after]:border-solid [.rt-checkbox-check&::after]:[border-top:0] [.rt-checkbox-check&::after]:[content:''] [.rt-checkbox-check&::after]:h-[calc(1.2*var(--unit))] [.rt-checkbox-check&::after]:left-[calc(0.4*var(--unit))] [.rt-checkbox-check&::after]:absolute [.rt-checkbox-check&::after]:top-[calc(-0.1*var(--unit))] [.rt-checkbox-check&::after]:transform-[rotate(45deg)] [.rt-checkbox-check&::after]:w-[calc(0.7*var(--unit))]",
            '[.rt-checkbox-disabled>.rt-checkbox-check&]:bg-(--checkbox-disabled-color) [.rt-checkbox-disabled>.rt-checkbox-check&]:border-transparent [.rt-checkbox-disabled>.rt-checkbox-check&]:cursor-auto',
            '[.rt-checkbox-input:focus-visible~.rt-checkbox-check&::before]:bg-(--checkbox-focus-checked-color)',
          ),
        indeterminate &&
          '[&&&::after]:animate-none [&&&::after]:border-0 [&&&::after]:bg-(--rt-color-background) [&&&::after]:h-[2px] [&&&::after]:w-[10px] [&&&::after]:left-[2px] [&&&::after]:top-[6px] [&&&::after]:transform-none',
        className,
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
