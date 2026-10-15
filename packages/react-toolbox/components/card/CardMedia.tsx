'use client';
import type { CardTheme } from './types';
import type { ComponentPropsWithRef, ReactNode } from 'react';
import { cn } from '../utils/cn';
export interface CardMediaProps extends ComponentPropsWithRef<'div'> {
  aspectRatio?: 'wide' | 'square';
  contentOverlay?: boolean;
  image?: ReactNode;
  theme?: CardTheme;
}
export function CardMedia({
  aspectRatio,
  children,
  className,
  color,
  contentOverlay,
  image,
  theme,
  ...other
}: CardMediaProps) {
  return (
    <div
      style={{
        backgroundColor: color || undefined,
        backgroundImage: typeof image === 'string' ? `url('${image}')` : undefined,
      }}
      className={cn(
        'rt-card-cardMedia',
        'bg-center bg-no-repeat bg-cover relative',
        "[&::after]:[content:''] [&::after]:block [&::after]:h-0",
        theme?.cardMedia,
        aspectRatio &&
          (aspectRatio === 'wide'
            ? cn(
                'rt-card-wide',
                '[.rt-card-cardMedia&]:w-full',
                '[.rt-card-cardMedia&::after]:pt-[56.25%]',
                theme?.wide,
              )
            : aspectRatio === 'square'
              ? cn(
                  'rt-card-square',
                  '[.rt-card-cardMedia&]:w-full',
                  '[.rt-card-cardMedia&::after]:pt-[100%]',
                  theme?.square,
                )
              : undefined),
        className,
      )}
      {...other}
    >
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
          theme?.content,
          contentOverlay && cn('rt-card-contentOverlay', theme?.contentOverlay),
        )}
      >
        {children}
      </div>
    </div>
  );
}
export default CardMedia;
