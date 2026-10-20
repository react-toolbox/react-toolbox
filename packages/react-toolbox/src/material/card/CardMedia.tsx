'use client';

import type { ComponentPropsWithRef, ReactNode } from 'react';
import { cn } from '../foundations/styles/cn';
export interface CardMediaProps extends ComponentPropsWithRef<'div'> {
  aspectRatio?: 'wide' | 'square';
  contentOverlay?: boolean;
  image?: ReactNode;
  /** Alternative text for a background image; omit for decorative media. */
  alt?: string;
}
export function CardMedia({
  aspectRatio,
  children,
  className,
  color,
  contentOverlay,
  image,
  alt,
  style,
  ...other
}: CardMediaProps) {
  return (
    <div
      style={{
        backgroundColor: color || undefined,
        backgroundImage: typeof image === 'string' ? `url('${image}')` : undefined,
        ...style,
      }}
      className={cn(
        'rt-card-cardMedia',
        'bg-center bg-no-repeat bg-cover relative',
        "[&::after]:[content:''] [&::after]:block [&::after]:h-0",
        aspectRatio &&
          (aspectRatio === 'wide'
            ? cn('rt-card-wide', '[.rt-card-cardMedia&]:w-full', '[.rt-card-cardMedia&::after]:pt-[56.25%]')
            : aspectRatio === 'square'
              ? cn('rt-card-square', '[.rt-card-cardMedia&]:w-full', '[.rt-card-cardMedia&::after]:pt-[100%]')
              : undefined),
        className,
      )}
      {...other}
    >
      {typeof image === 'string' && alt ? <span role="img" aria-label={alt} className="sr-only" /> : null}
      <div
        className={cn(
          'rt-card-content',
          '[.rt-card-cardMedia_&]:flex [.rt-card-cardMedia_&]:flex-col [.rt-card-cardMedia_&]:justify-end [.rt-card-cardMedia_&]:left-0 [.rt-card-cardMedia_&]:overflow-hidden [.rt-card-cardMedia_&]:relative [.rt-card-cardMedia_&]:top-0 [.rt-card-cardMedia_&]:w-full',
          '[.rt-card-cardMedia.rt-card-wide_&]:h-full [.rt-card-cardMedia.rt-card-wide_&]:absolute',
          '[.rt-card-cardMedia.rt-card-square_&]:h-full [.rt-card-cardMedia.rt-card-square_&]:absolute',
          '[.rt-card-cardMedia.rt-card-wide_&>iframe]:max-w-full',
          '[.rt-card-cardMedia.rt-card-wide_&>video]:max-w-full',
          '[.rt-card-cardMedia.rt-card-wide_&>img]:max-w-full',
          '[.rt-card-cardMedia.rt-card-square_&>iframe]:max-w-full',
          '[.rt-card-cardMedia.rt-card-square_&>video]:max-w-full',
          '[.rt-card-cardMedia.rt-card-square_&>img]:max-w-full',
          contentOverlay && 'rt-card-contentOverlay',
        )}
      >
        {typeof image !== 'string' ? image : null}
        {children}
      </div>
    </div>
  );
}
export default CardMedia;
