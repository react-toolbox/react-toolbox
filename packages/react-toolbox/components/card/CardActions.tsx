'use client';
import type { CardTheme } from './types';
import type { ComponentPropsWithRef } from 'react';
import { cn } from '../utils/cn';
export interface CardActionsProps extends ComponentPropsWithRef<'div'> {
  theme?: CardTheme;
}
export function CardActions({ children, className, theme, ...other }: CardActionsProps) {
  return (
    <div
      className={cn(
        'rt-card-cardActions',
        'items-center flex justify-start p-(--card-padding-sm)',
        "[&_[data-react-toolbox='button']]:m-[0_calc(var(--card-padding-sm)/2)] [&_[data-react-toolbox='button']]:min-w-0 [&_[data-react-toolbox='button']]:p-[0_var(--card-padding-sm)]",
        "[&_[data-react-toolbox='button']:first-child]:ml-0",
        "[&_[data-react-toolbox='button']:last-child]:mr-0",
        '[.rt-card-cardMedia_.rt-card-contentOverlay_&]:bg-(--card-text-overlay)',
        theme?.cardActions,
        className,
      )}
      {...other}
    >
      {children}
    </div>
  );
}
export default CardActions;
