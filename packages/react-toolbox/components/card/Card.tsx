'use client';
import { materialRoot, materialDescendants } from '../utils/styles';
import type { CardTheme } from './types';
import type { ComponentPropsWithRef } from 'react';
import { cn } from '../utils/cn';
export interface CardProps extends ComponentPropsWithRef<'div'> {
  theme?: CardTheme;
  raised?: boolean;
}
export function Card({ children, className, raised, theme, ...other }: CardProps) {
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
