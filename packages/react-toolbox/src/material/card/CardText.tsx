'use client';
import './tokens.css';

import type { CardClassNames } from './types';
import type { ComponentPropsWithRef } from 'react';
import { cn } from '../foundations/styles/cn';
export interface CardTextProps extends ComponentPropsWithRef<'div'> {
  /** Classes for the component's rendered parts. */
  classNames?: CardClassNames;
}
export function CardText({ children, className, classNames, ...other }: CardTextProps) {
  return (
    <div
      className={cn(
        'rt-card-cardText',
        'p-(--card-padding)',
        '[&_p]:text-[calc(1.4*var(--unit))] [&_p]:[font-weight:400] [&_p]:tracking-[0] [&_p]:leading-[calc(2.4*var(--unit))] [&_p]:m-0',
        '[&:last-child]:pb-(--card-padding-lg)',
        '[.rt-card-cardTitle+&]:pt-0',
        '[.rt-card-cardText+&]:pt-0',
        '[.rt-card-cardMedia_.rt-card-contentOverlay_&]:bg-(--card-text-overlay)',
        '[@media_screen_and_(min-width:_600px)_and_(min-height:_600px)]:pl-[var(--card-desktop-horizontal-padding,_calc(2.4_*_var(--unit)))] [@media_screen_and_(min-width:_600px)_and_(min-height:_600px)]:pr-[var(--card-desktop-horizontal-padding,_calc(2.4_*_var(--unit)))]',
        classNames?.cardText,
        className,
      )}
      {...other}
    >
      {typeof children === 'string' ? <p>{children}</p> : children}
    </div>
  );
}
export default CardText;
