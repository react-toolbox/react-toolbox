'use client';

import type { HTMLAttributes, Ref } from 'react';
import classnames from 'classnames';
import { mergeTheme } from '../theming';
import defaultTheme from './theme';

export type ProgressBarTheme = Partial<typeof defaultTheme>;
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
  theme: suppliedTheme,
  value = 0,
  ref,
  ...other
}: ProgressBarProps) {
  const theme = mergeTheme(defaultTheme, suppliedTheme);
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
      className={classnames(
        theme[type],
        { [theme.indeterminate]: !determinate, [theme.multicolor]: multicolor },
        className,
      )}
    >
      {type === 'circular' ? (
        <svg className={theme.circle} viewBox="0 0 60 60" aria-hidden="true" focusable="false">
          <circle
            className={theme.path}
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
            className={theme.buffer}
            style={determinate ? { transform: `scaleX(${ratio(buffer)})` } : undefined}
          />
          <span
            data-ref="value"
            className={theme.value}
            style={determinate ? { transform: `scaleX(${progress})` } : undefined}
          />
        </div>
      )}
    </div>
  );
}
export default ProgressBar;
