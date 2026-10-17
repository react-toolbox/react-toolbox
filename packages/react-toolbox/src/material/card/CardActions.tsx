'use client';
import './tokens.css';

import type { CardClassNames } from './types';
import type { ComponentPropsWithRef } from 'react';
import { cn } from '../foundations/styles/cn';
export interface CardActionsProps extends ComponentPropsWithRef<'div'> {
  /** Classes for the component's rendered parts. */
  classNames?: CardClassNames;
}
export function CardActions({ children, className, classNames, ...other }: CardActionsProps) {
  return (
    <div
      className={cn(
        'rt-card-cardActions',
        'items-center flex justify-start p-(--card-padding-sm)',
        "[&_[data-react-toolbox='button']]:m-[0_calc(var(--card-padding-sm)/2)] [&_[data-react-toolbox='button']]:min-w-0 [&_[data-react-toolbox='button']]:p-[0_var(--card-padding-sm)]",
        "[&_[data-react-toolbox='button']:first-child]:ms-0",
        "[&_[data-react-toolbox='button']:last-child]:me-0",
        '[.rt-card-cardMedia_.rt-card-contentOverlay_&]:bg-(--card-text-overlay)',
        classNames?.cardActions,
        className,
      )}
      {...other}
    >
      {children}
    </div>
  );
}
export default CardActions;
