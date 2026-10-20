'use client';
import './tokens.css';

import { materialRoot, materialDescendants } from '../foundations/styles/classes';
import type { ComponentPropsWithRef } from 'react';
import { cn } from '../foundations/styles/cn';
export interface CardProps extends ComponentPropsWithRef<'div'> {
  raised?: boolean;
}
export function Card({ children, className, raised, ...other }: CardProps) {
  return (
    <div
      data-react-toolbox="card"
      className={cn(
        'rt-card-card',
        '[background:var(--card-background-color)] rounded-[calc(0.2*var(--unit))] [box-shadow:var(--shadow-2p)] flex flex-col text-(length:--card-font-size) overflow-hidden w-full',
        materialRoot,
        materialDescendants,
        raised && cn('rt-card-raised', '[.rt-card-card&]:[box-shadow:var(--shadow-8p)]'),
        className,
      )}
      {...other}
    >
      {children}
    </div>
  );
}
export default Card;
