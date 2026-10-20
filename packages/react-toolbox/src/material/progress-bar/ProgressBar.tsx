'use client';
import './tokens.css';

import type { HTMLAttributes, Ref } from 'react';
import { cn } from '../foundations/styles/cn';

export interface ProgressBarProps extends HTMLAttributes<HTMLDivElement> {
  buffer?: number;
  disabled?: boolean;
  max?: number;
  min?: number;
  mode?: 'determinate' | 'indeterminate';
  multicolor?: boolean;
  type?: 'linear' | 'circular';
  value?: number;
  ref?: Ref<HTMLDivElement>;
}

export function ProgressBar({
  buffer = 0,
  className = '',
  disabled,
  max = 100,
  min = 0,
  mode = 'indeterminate',
  multicolor = false,
  type = 'linear',
  value = 0,
  ref,
  ...other
}: ProgressBarProps) {
  const ratio = (amount: number) =>
    max <= min || Number.isNaN(amount) ? 0 : Math.min(1, Math.max(0, (amount - min) / (max - min)));
  const determinate = mode === 'determinate';
  const progress = ratio(value);
  return (
    <div
      role="progressbar"
      {...other}
      {...{ disabled }}
      ref={ref}
      aria-disabled={disabled || undefined}
      data-react-toolbox="progress-bar"
      aria-valuenow={determinate ? min + progress * Math.max(0, max - min) : undefined}
      aria-valuemin={min}
      aria-valuemax={max}
      className={cn(
        type === 'linear'
          ? cn(
              'rt-progress-bar-linear',
              '[background:var(--progress-track-color)] rtl:transform-[scaleX(-1)] inline-block h-(--progress-height) overflow-hidden relative w-full',
            )
          : type === 'circular'
            ? cn(
                'rt-progress-bar-circular',
                'inline-block h-[calc(var(--circle-wrapper-width)*1px)] relative transform-[rotate(-90deg)] w-[calc(var(--circle-wrapper-width)*1px)]',
              )
            : undefined,
        !determinate && 'rt-progress-bar-indeterminate',
        multicolor && 'rt-progress-bar-multicolor',
        className,
      )}
    >
      {type === 'circular' ? (
        <svg
          className={cn(
            'rt-progress-bar-circle',
            'h-full w-full',
            '[.rt-progress-bar-circular.rt-progress-bar-indeterminate_&]:animate-[rt-progress-bar-circular-indeterminate-bar-rotate_2s_linear_infinite]',
          )}
          viewBox="0 0 60 60"
          aria-hidden="true"
          focusable="false"
        >
          <circle
            className={cn(
              'rt-progress-bar-path',
              'fill-none stroke-(--progress-main-color) [stroke-dasharray:0,calc(var(--scale-ratio)*200px)] [stroke-dashoffset:0] [stroke-linecap:round] [stroke-miterlimit:20] stroke-4 [transition:stroke-dasharray_var(--animation-duration)_var(--animation-curve-default)]',
              '[.rt-progress-bar-circular.rt-progress-bar-indeterminate_&]:animate-[rt-progress-bar-circular-indeterminate-bar-dash_1.5s_ease-in-out_infinite] [.rt-progress-bar-circular.rt-progress-bar-indeterminate_&]:[stroke-dasharray:calc(var(--scale-ratio)*1px),calc(var(--scale-ratio)*200px)] [.rt-progress-bar-circular.rt-progress-bar-indeterminate_&]:[stroke-dashoffset:0]',
              '[.rt-progress-bar-circular.rt-progress-bar-indeterminate.rt-progress-bar-multicolor_&]:animate-[rt-progress-bar-circular-indeterminate-bar-dash_1.5s_ease-in-out_infinite,rt-progress-bar-colors_calc(1.5s*4)_ease-in-out_infinite]',
              '[.rt-progress-bar-circular[disabled]_&]:stroke-(--progress-disabled-color)',
              '[.rt-progress-bar-circular.rt-progress-bar-indeterminate.rt-progress-bar-multicolor[disabled]_&]:[animation-name:rt-progress-bar-circular-indeterminate-bar-dash]',
            )}
            cx="30"
            cy="30"
            r="25"
            style={
              determinate
                ? {
                    strokeDasharray: `${2 * Math.PI * 25 * progress}, 400`,
                    opacity: progress === 0 ? 0 : undefined,
                  }
                : undefined
            }
          />
        </svg>
      ) : (
        <div>
          <span
            data-ref="buffer"
            className={cn(
              'rt-progress-bar-buffer',
              'bottom-0 left-0 absolute right-0 top-0 transform-[scaleX(0)] origin-[left_center] [transition-duration:var(--animation-duration)] [transition-timing-function:var(--animation-curve-default)] [background-image:linear-gradient(to_right,_rgb(from_var(--progress-secondary-color)_r_g_b_/_calc(round(alpha_*_255_+_0.0001)_/_255)),_rgb(from_var(--progress-secondary-color)_r_g_b_/_calc(round(alpha_*_255_+_0.0001)_/_255))),_linear-gradient(to_right,_rgb(from_var(--progress-main-color)_r_g_b_/_calc(round(alpha_*_255_+_0.0001)_/_255)),_rgb(from_var(--progress-main-color)_r_g_b_/_calc(round(alpha_*_255_+_0.0001)_/_255)))]',
              '[.rt-progress-bar-circular[disabled]_&]:[background-image:linear-gradient(to_right,_rgb(from_var(--progress-secondary-color)_r_g_b_/_calc(round(alpha_*_255_+_0.0001)_/_255)),_rgb(from_var(--progress-secondary-color)_r_g_b_/_calc(round(alpha_*_255_+_0.0001)_/_255))),_linear-gradient(to_right,_rgb(from_var(--progress-disabled-color)_r_g_b_/_calc(round(alpha_*_255_+_0.0001)_/_255)),_rgb(from_var(--progress-disabled-color)_r_g_b_/_calc(round(alpha_*_255_+_0.0001)_/_255)))]',
              '[.rt-progress-bar-linear[disabled]_&]:[background-image:linear-gradient(to_right,_rgb(from_var(--progress-secondary-color)_r_g_b_/_calc(round(alpha_*_255_+_0.0001)_/_255)),_rgb(from_var(--progress-secondary-color)_r_g_b_/_calc(round(alpha_*_255_+_0.0001)_/_255))),_linear-gradient(to_right,_rgb(from_var(--progress-disabled-color)_r_g_b_/_calc(round(alpha_*_255_+_0.0001)_/_255)),_rgb(from_var(--progress-disabled-color)_r_g_b_/_calc(round(alpha_*_255_+_0.0001)_/_255)))]',
            )}
            style={determinate ? { transform: `scaleX(${ratio(buffer)})` } : undefined}
          />
          <span
            data-ref="value"
            className={cn(
              'rt-progress-bar-value',
              'bg-(--progress-main-color) bottom-0 left-0 absolute right-0 top-0 transform-[scaleX(0)] origin-[left_center] [transition-duration:var(--animation-duration)] [transition-timing-function:var(--animation-curve-default)]',
              '[.rt-progress-bar-linear.rt-progress-bar-indeterminate_&]:animate-[rt-progress-bar-linear-indeterminate-bar_1s_linear_infinite] [.rt-progress-bar-linear.rt-progress-bar-indeterminate_&]:origin-[center_center]',
              '[.rt-progress-bar-circular[disabled]_&]:bg-(--progress-disabled-color)',
              '[.rt-progress-bar-linear[disabled]_&]:bg-(--progress-disabled-color)',
            )}
            style={determinate ? { transform: `scaleX(${progress})` } : undefined}
          />
        </div>
      )}
    </div>
  );
}
export default ProgressBar;
