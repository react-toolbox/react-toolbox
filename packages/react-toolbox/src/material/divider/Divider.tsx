'use client';

import type { ComponentProps } from 'react';
import { cn } from '../foundations/styles/cn';

export interface DividerProps extends ComponentProps<'hr'> {
  /** Direction of the rule. Vertical dividers stretch within a flex row. */
  orientation?: 'horizontal' | 'vertical';
  /** Hide a purely visual rule from assistive technology. */
  decorative?: boolean;
}

export function Divider({ orientation = 'horizontal', decorative = false, className, ...props }: DividerProps) {
  return (
    <hr
      {...props}
      data-slot="Divider"
      data-orientation={orientation}
      role={decorative ? 'none' : 'separator'}
      aria-hidden={decorative ? true : undefined}
      aria-orientation={decorative ? undefined : orientation}
      className={cn(
        'm-0 shrink-0 border-0 bg-(--rt-color-divider) forced-colors:bg-[CanvasText]',
        orientation === 'vertical' ? 'h-auto w-px self-stretch' : 'h-px w-full',
        className,
      )}
    />
  );
}
