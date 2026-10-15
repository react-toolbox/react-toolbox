'use client';
import type { CardTheme } from './types';
import type { ComponentPropsWithRef } from 'react';
import { cn } from '../utils/cn';
export interface CardTextProps extends ComponentPropsWithRef<'div'> {
  theme?: CardTheme;
}
export function CardText({ children, className, theme, ...other }: CardTextProps) {
  return (
    <div
      className={cn(
        'rt-card-cardText',
        'p-[var(--card-padding)]',
        '[&_p]:text-[length:calc(1.4_*_var(--unit))] [&_p]:[font-weight:400] [&_p]:tracking-[0] [&_p]:leading-[calc(2.4_*_var(--unit))] [&_p]:m-0',
        '[&:last-child]:pb-[var(--card-padding-lg)]',
        '[.rt-card-cardTitle+&]:pt-0',
        '[.rt-card-cardText+&]:pt-0',
        '[.rt-card-cardMedia_.rt-card-contentOverlay_&]:bg-[var(--card-text-overlay)]',
        '[@media_screen_and_(min-width:_600px)_and_(min-height:_600px)]:pl-[var(--card-desktop-horizontal-padding,_calc(2.4_*_var(--unit)))] [@media_screen_and_(min-width:_600px)_and_(min-height:_600px)]:pr-[var(--card-desktop-horizontal-padding,_calc(2.4_*_var(--unit)))]',
        theme?.cardText,
        className,
      )}
      {...other}
    >
      {typeof children === 'string' ? <p>{children}</p> : children}
    </div>
  );
}
export default CardText;
