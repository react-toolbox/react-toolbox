'use client';
import './tokens.css';

import { materialRoot, materialDescendants } from '../foundations/styles/classes';

import React from 'react';
import { cn } from '../foundations/styles/cn';
import { useRipple } from '../ripple';
const radioClasses = [
  'rt-radio-radio',
  '[border:calc(0.2*var(--unit))_solid_var(--radio-border-color)] rounded-[50%] cursor-pointer inline-block shrink-0 h-(--radio-button-size) relative align-top w-(--radio-button-size)',
  materialRoot,
  materialDescendants,
  "[&::before]:bg-(--radio-inner-color) [&::before]:rounded-[50%] [&::before]:[content:''] [&::before]:h-full [&::before]:left-0 [&::before]:absolute [&::before]:top-0 [&::before]:transform-[scale(0)] [&::before]:[transition:transform_0.2s_var(--animation-curve-default)] [&::before]:w-full",
  '[.rt-radio-disabled_&]:border-(--radio-disabled-color) [.rt-radio-disabled_&]:cursor-auto',
  '[.rt-radio-input:focus-visible~&]:[box-shadow:0_0_0_var(--unit)_var(--radio-focus-color)]',
  'forced-colors:[.rt-radio-input:focus-visible~&]:[outline:2px_solid_Highlight] forced-colors:[.rt-radio-input:focus-visible~&]:outline-offset-2',
].join(' ');

export interface RadioProps extends React.HTMLAttributes<HTMLElement> {
  checked?: boolean;
  disabled?: boolean;
  ripple?: boolean;
}
export default function Radio({
  checked,
  disabled,
  ripple: enabled,
  className,
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
    className: cn(
      'rt-radio-ripple',
      '[.rt-radio-radio_&]:bg-(--radio-inner-color) [.rt-radio-radio_&]:opacity-[0.3] [.rt-radio-radio_&]:duration-650',
    ),
    onMouseDown,
    onTouchStart,
    onTouchEnd,
    onTouchCancel,
  });
  return (
    <div
      {...others}
      data-react-toolbox="radio"
      className={cn(
        radioClasses,
        checked &&
          cn(
            'rt-radio-radioChecked',
            '[border:calc(0.2*var(--unit))_solid_var(--radio-inner-color)]',
            '[&::before]:transform-[scale(0.65)]',
            '[.rt-radio-disabled_&]:border-(--radio-disabled-color) [.rt-radio-disabled_&]:cursor-auto',
            '[.rt-radio-disabled_&::before]:bg-(--radio-disabled-color)',
            '[.rt-radio-input:focus-visible~&]:[box-shadow:0_0_0_var(--unit)_var(--radio-checked-focus-color)]',
          ),
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
