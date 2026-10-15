'use client';
import type { ProgressBarTheme } from './types';

import type { HTMLAttributes, Ref } from 'react';
import { cn } from '../utils/cn';

export type { ProgressBarTheme } from './types';
export interface ProgressBarProps extends HTMLAttributes<HTMLDivElement> {
  buffer?: number;
  disabled?: boolean;
  max?: number;
  min?: number;
  mode?: 'determinate' | 'indeterminate';
  multicolor?: boolean;
  theme?: ProgressBarTheme;
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
  theme,
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
              '[background:var(--progress-track-color)] inline-block h-[var(--progress-height)] overflow-hidden relative w-full',
              theme?.linear,
            )
          : type === 'circular'
            ? cn(
                'rt-progress-bar-circular',
                'inline-block h-[calc(var(--circle-wrapper-width)_*_1px)] relative [transform:rotate(-90deg)] w-[calc(var(--circle-wrapper-width)_*_1px)]',
                theme?.circular,
              )
            : undefined,
        !determinate && cn('rt-progress-bar-indeterminate', theme?.indeterminate),
        multicolor && cn('rt-progress-bar-multicolor', theme?.multicolor),
        className,
      )}
    >
      {type === 'circular' ? (
        <svg
          className={cn(
            'rt-progress-bar-circle',
            'h-full w-full',
            '[.rt-progress-bar-circular.rt-progress-bar-indeterminate_&]:[animation:rt-progress-bar-circular-indeterminate-bar-rotate_2s_linear_infinite]',
            theme?.circle,
          )}
          viewBox="0 0 60 60"
          aria-hidden="true"
          focusable="false"
        >
          <circle
            className={cn(
              'rt-progress-bar-path',
              'fill-none [stroke:var(--progress-main-color)] [stroke-dasharray:0,_calc(var(--scale-ratio)_*_200px)] [stroke-dashoffset:0] [stroke-linecap:round] [stroke-miterlimit:20] [stroke-width:4] [transition:stroke-dasharray_var(--animation-duration)_var(--animation-curve-default)]',
              '[.rt-progress-bar-circular.rt-progress-bar-indeterminate_&]:[animation:rt-progress-bar-circular-indeterminate-bar-dash_1.5s_ease-in-out_infinite] [.rt-progress-bar-circular.rt-progress-bar-indeterminate_&]:[stroke-dasharray:calc(var(--scale-ratio)_*_1px),_calc(var(--scale-ratio)_*_200px)] [.rt-progress-bar-circular.rt-progress-bar-indeterminate_&]:[stroke-dashoffset:0]',
              '[.rt-progress-bar-circular.rt-progress-bar-indeterminate.rt-progress-bar-multicolor_&]:[animation:rt-progress-bar-circular-indeterminate-bar-dash_1.5s_ease-in-out_infinite,_rt-progress-bar-colors_calc(1.5s_*_4)_ease-in-out_infinite]',
              '[.rt-progress-bar-circular[disabled]_&]:[stroke:var(--progress-disabled-color)]',
              '[.rt-progress-bar-circular.rt-progress-bar-indeterminate.rt-progress-bar-multicolor[disabled]_&]:[animation-name:rt-progress-bar-circular-indeterminate-bar-dash]',
              theme?.path,
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
              'bottom-0 left-0 absolute right-0 top-0 [transform:scaleX(0)] [transform-origin:left_center] [transition-duration:var(--animation-duration)] [transition-timing-function:var(--animation-curve-default)] [background-image:linear-gradient(to_right,_rgb(from_var(--progress-secondary-color)_r_g_b_/_calc(round(alpha_*_255_+_0.0001)_/_255)),_rgb(from_var(--progress-secondary-color)_r_g_b_/_calc(round(alpha_*_255_+_0.0001)_/_255))),_linear-gradient(to_right,_rgb(from_var(--progress-main-color)_r_g_b_/_calc(round(alpha_*_255_+_0.0001)_/_255)),_rgb(from_var(--progress-main-color)_r_g_b_/_calc(round(alpha_*_255_+_0.0001)_/_255)))]',
              '[.rt-progress-bar-circular[disabled]_&]:[background-image:linear-gradient(to_right,_rgb(from_var(--progress-secondary-color)_r_g_b_/_calc(round(alpha_*_255_+_0.0001)_/_255)),_rgb(from_var(--progress-secondary-color)_r_g_b_/_calc(round(alpha_*_255_+_0.0001)_/_255))),_linear-gradient(to_right,_rgb(from_var(--progress-disabled-color)_r_g_b_/_calc(round(alpha_*_255_+_0.0001)_/_255)),_rgb(from_var(--progress-disabled-color)_r_g_b_/_calc(round(alpha_*_255_+_0.0001)_/_255)))]',
              '[.rt-progress-bar-linear[disabled]_&]:[background-image:linear-gradient(to_right,_rgb(from_var(--progress-secondary-color)_r_g_b_/_calc(round(alpha_*_255_+_0.0001)_/_255)),_rgb(from_var(--progress-secondary-color)_r_g_b_/_calc(round(alpha_*_255_+_0.0001)_/_255))),_linear-gradient(to_right,_rgb(from_var(--progress-disabled-color)_r_g_b_/_calc(round(alpha_*_255_+_0.0001)_/_255)),_rgb(from_var(--progress-disabled-color)_r_g_b_/_calc(round(alpha_*_255_+_0.0001)_/_255)))]',
              theme?.buffer,
            )}
            style={determinate ? { transform: `scaleX(${ratio(buffer)})` } : undefined}
          />
          <span
            data-ref="value"
            className={cn(
              'rt-progress-bar-value',
              'bg-[var(--progress-main-color)] bottom-0 left-0 absolute right-0 top-0 [transform:scaleX(0)] [transform-origin:left_center] [transition-duration:var(--animation-duration)] [transition-timing-function:var(--animation-curve-default)]',
              '[.rt-progress-bar-linear.rt-progress-bar-indeterminate_&]:[animation:rt-progress-bar-linear-indeterminate-bar_1s_linear_infinite] [.rt-progress-bar-linear.rt-progress-bar-indeterminate_&]:[transform-origin:center_center]',
              '[.rt-progress-bar-circular[disabled]_&]:bg-[var(--progress-disabled-color)]',
              '[.rt-progress-bar-linear[disabled]_&]:bg-[var(--progress-disabled-color)]',
              theme?.value,
            )}
            style={determinate ? { transform: `scaleX(${progress})` } : undefined}
          />
        </div>
      )}
    </div>
  );
}
export default ProgressBar;
