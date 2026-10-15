'use client';
import { mergeStyleSlots } from '../foundations/styles/slots';

import { materialRoot, materialDescendants } from '../foundations/styles/classes';
import type { CardTheme } from './types';
import type { ComponentPropsWithRef } from 'react';
import { cn } from '../foundations/styles/cn';
export interface CardProps extends ComponentPropsWithRef<'div'> {
  /** Classes for the component's rendered parts. Applied after legacy theme overrides. */
  classNames?: CardTheme;
  /** @deprecated Use classNames for style slots; use ThemeProvider for design tokens. */
  theme?: CardTheme;
  raised?: boolean;
}
export function Card({ children, className, raised, theme: legacyTheme, classNames, ...other }: CardProps) {
  const theme = mergeStyleSlots(legacyTheme, classNames);
  return (
    <div
      data-react-toolbox="card"
      className={cn(
        'rt-card-card',
        '[background:var(--card-background-color)] rounded-[calc(0.2*var(--unit))] [box-shadow:var(--shadow-2p)] flex flex-col text-(length:--card-font-size) overflow-hidden w-full',
        materialRoot,
        materialDescendants,
        theme?.card,
        raised && cn('rt-card-raised', '[.rt-card-card&]:[box-shadow:var(--shadow-8p)]', theme?.raised),
        className,
      )}
      {...other}
    >
      {children}
    </div>
  );
}
export default Card;
