'use client';
import { mergeStyleSlots } from '../foundations/styles/slots';

import { materialRoot, materialDescendants } from '../foundations/styles/classes';
import type { SwitchTheme } from './types';

import React from 'react';
import { cn } from '../foundations/styles/cn';
import { useRipple } from '../ripple';
export interface ThumbProps extends React.HTMLAttributes<HTMLElement> {
  disabled?: boolean;
  ripple?: boolean;
  /** Classes for the component's rendered parts. Applied after legacy theme overrides. */
  classNames?: SwitchTheme;
  /** @deprecated Use classNames for style slots; use ThemeProvider for design tokens. */
  theme?: SwitchTheme;
}
export default function Thumb({
  disabled,
  ripple: enabled,
  theme: legacyTheme,
  classNames,
  children,
  onMouseDown,
  onTouchStart,
  onTouchEnd,
  onTouchCancel,
  ...others
}: ThumbProps) {
  const theme = mergeStyleSlots(legacyTheme, classNames);
  const effects = useRipple({
    centered: true,
    spread: 2.6,
    disabled,
    ripple: enabled,
    theme: {
      ripple: cn(
        'rt-switch-ripple',
        '[.rt-switch-thumb_&]:bg-(--switch-color) [.rt-switch-thumb_&]:opacity-[0.3] [.rt-switch-thumb_&]:duration-(--switch-ripple-duration)',
        '[.rt-switch-off_&]:[background:var(--switch-off-ripple-color)]',
        theme?.ripple,
      ),
    },
    onMouseDown,
    onTouchStart,
    onTouchEnd,
    onTouchCancel,
  });
  return (
    <span
      {...others}
      className={cn(
        'rt-switch-thumb',
        'rounded-[50%] cursor-pointer h-(--switch-thumb-size) absolute top-[calc((var(--switch-track-height)-var(--switch-thumb-size))/2)] duration-[0.28s] [transition-property:left] [transition-timing-function:var(--animation-curve-default)] w-(--switch-thumb-size)',
        materialRoot,
        materialDescendants,
        '[.rt-switch-on_&]:[background:var(--switch-thumb-on-color)] [.rt-switch-on_&]:[box-shadow:var(--shadow-3p)] [.rt-switch-on_&]:left-[calc(var(--switch-track-length)-var(--switch-thumb-size))]',
        '[.rt-switch-off_&]:[background:var(--switch-thumb-off-color)] [.rt-switch-off_&]:[box-shadow:var(--shadow-2p)] [.rt-switch-off_&]:left-0',
        "[.rt-switch-input:focus:not(:active)+.rt-switch-switch-on>&::before]:bg-(--switch-on-focus-color) [.rt-switch-input:focus:not(:active)+.rt-switch-switch-on>&::before]:rounded-[50%] [.rt-switch-input:focus:not(:active)+.rt-switch-switch-on>&::before]:box-border [.rt-switch-input:focus:not(:active)+.rt-switch-switch-on>&::before]:[content:''] [.rt-switch-input:focus:not(:active)+.rt-switch-switch-on>&::before]:inline-block [.rt-switch-input:focus:not(:active)+.rt-switch-switch-on>&::before]:h-(--switch-focus-init-size) [.rt-switch-input:focus:not(:active)+.rt-switch-switch-on>&::before]:left-[50%] [.rt-switch-input:focus:not(:active)+.rt-switch-switch-on>&::before]:absolute [.rt-switch-input:focus:not(:active)+.rt-switch-switch-on>&::before]:top-[50%] [.rt-switch-input:focus:not(:active)+.rt-switch-switch-on>&::before]:transform-[translate(calc(-1*var(--switch-focus-init-size)/2),calc(-1*var(--switch-focus-init-size)/2))] [.rt-switch-input:focus:not(:active)+.rt-switch-switch-on>&::before]:w-(--switch-focus-init-size) [.rt-switch-input:focus:not(:active)+.rt-switch-switch-on>&::before]:[box-shadow:0_0_0_var(--switch-focus-diff)_var(--switch-on-focus-color)]",
        "[.rt-switch-input:focus:not(:active)+.rt-switch-switch-off>&::before]:bg-(--switch-off-focus-color) [.rt-switch-input:focus:not(:active)+.rt-switch-switch-off>&::before]:rounded-[50%] [.rt-switch-input:focus:not(:active)+.rt-switch-switch-off>&::before]:box-border [.rt-switch-input:focus:not(:active)+.rt-switch-switch-off>&::before]:[content:''] [.rt-switch-input:focus:not(:active)+.rt-switch-switch-off>&::before]:inline-block [.rt-switch-input:focus:not(:active)+.rt-switch-switch-off>&::before]:h-(--switch-focus-init-size) [.rt-switch-input:focus:not(:active)+.rt-switch-switch-off>&::before]:left-[50%] [.rt-switch-input:focus:not(:active)+.rt-switch-switch-off>&::before]:absolute [.rt-switch-input:focus:not(:active)+.rt-switch-switch-off>&::before]:top-[50%] [.rt-switch-input:focus:not(:active)+.rt-switch-switch-off>&::before]:transform-[translate(calc(-1*var(--switch-focus-init-size)/2),calc(-1*var(--switch-focus-init-size)/2))] [.rt-switch-input:focus:not(:active)+.rt-switch-switch-off>&::before]:w-(--switch-focus-init-size) [.rt-switch-input:focus:not(:active)+.rt-switch-switch-off>&::before]:[box-shadow:0_0_0_var(--switch-focus-diff)_var(--switch-off-focus-color)]",
        '[.rt-switch-disabled_&&]:bg-(--switch-disabled-thumb-color) [.rt-switch-disabled_&&]:border-transparent [.rt-switch-disabled_&&]:cursor-auto',
        theme?.thumb,
      )}
      onMouseDown={effects.onMouseDown}
      onTouchStart={effects.onTouchStart}
      onTouchEnd={effects.onTouchEnd}
      onTouchCancel={effects.onTouchCancel}
    >
      {children}
      {effects.ripple}
    </span>
  );
}
