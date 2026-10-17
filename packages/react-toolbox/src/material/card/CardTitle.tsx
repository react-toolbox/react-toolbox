'use client';
import './tokens.css';

import type { CardClassNames } from './types';
import type { ComponentPropsWithRef, ReactNode } from 'react';
import { cn } from '../foundations/styles/cn';
import Avatar from '../avatar';
const titleClasses = [
  'rt-card-title',
  '[.rt-card-cardTitle_&]:text-[calc(2*var(--unit))] [.rt-card-cardTitle_&]:[font-weight:500] [.rt-card-cardTitle_&]:tracking-[0.02em] [.rt-card-cardTitle_&]:leading-none [.rt-card-cardTitle_&]:m-0 [.rt-card-cardTitle_&]:p-0',
  '[.rt-card-cardTitle.rt-card-large_&]:text-[calc(2.4*var(--unit))] [.rt-card-cardTitle.rt-card-large_&]:[-moz-osx-font-smoothing:grayscale] [.rt-card-cardTitle.rt-card-large_&]:[font-weight:400] [.rt-card-cardTitle.rt-card-large_&]:leading-[calc(3.2*var(--unit))]',
  '[.rt-card-cardTitle.rt-card-small_&]:text-[calc(1.4*var(--unit))] [.rt-card-cardTitle.rt-card-small_&]:tracking-[0] [.rt-card-cardTitle.rt-card-small_&]:leading-[calc(2*var(--unit))]',
  '[.rt-card-cardMedia_.rt-card-cardTitle_&]:text-(--card-color-white)',
].join(' ');

export interface CardTitleProps extends Omit<ComponentPropsWithRef<'div'>, 'title'> {
  /** Heading level follows the surrounding document, independently of visual size. */
  heading?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  avatar?: ReactNode;
  subtitle?: ReactNode;
  title?: ReactNode;
  /** Classes for the component's rendered parts. */
  classNames?: CardClassNames;
}
export function CardTitle({
  heading: Heading = 'h5',
  avatar,
  children,
  className,
  subtitle,
  classNames,
  title,
  ...other
}: CardTitleProps) {
  return (
    <div
      className={cn(
        'rt-card-cardTitle',
        'items-center flex p-(--card-padding)',
        "[&_[data-react-toolbox='avatar']]:me-(--card-padding)",
        '[&_p]:text-[calc(1.4*var(--unit))] [&_p]:[font-weight:400] [&_p]:tracking-[0] [&_p]:leading-[calc(2.4*var(--unit))] [&_p]:m-0',
        '[&:last-child]:pb-(--card-padding-lg)',
        '[.rt-card-cardMedia_.rt-card-contentOverlay_&]:bg-(--card-text-overlay)',
        classNames?.cardTitle,
        Boolean(avatar) &&
          cn(
            'rt-card-small',
            '[.rt-card-cardTitle&]:p-(--card-padding)',
            '[@media_screen_and_(min-width:_600px)_and_(min-height:_600px)]:[.rt-card-cardTitle&]:pl-[var(--card-desktop-horizontal-padding,_calc(2.4_*_var(--unit)))] [@media_screen_and_(min-width:_600px)_and_(min-height:_600px)]:[.rt-card-cardTitle&]:pr-[var(--card-desktop-horizontal-padding,_calc(2.4_*_var(--unit)))]',
            '[.rt-card-cardTitle&:last-child]:pb-(--card-padding)',
            classNames?.small,
          ),
        !avatar &&
          cn(
            'rt-card-large',
            '[.rt-card-cardTitle&]:p-[var(--card-padding-lg)_var(--card-padding)_var(--card-padding)]',
            '[@media_screen_and_(min-width:_600px)_and_(min-height:_600px)]:[.rt-card-cardTitle&]:pl-[var(--card-desktop-horizontal-padding,_calc(2.4_*_var(--unit)))] [@media_screen_and_(min-width:_600px)_and_(min-height:_600px)]:[.rt-card-cardTitle&]:pr-[var(--card-desktop-horizontal-padding,_calc(2.4_*_var(--unit)))]',
            classNames?.large,
          ),
        className,
      )}
      {...other}
    >
      {typeof avatar === 'string' ? <Avatar image={avatar} /> : avatar}
      <div>
        {title && <Heading className={cn(titleClasses, classNames?.title)}>{title}</Heading>}
        {children && typeof children === 'string' && (
          <Heading className={cn(titleClasses, classNames?.title)}>{children}</Heading>
        )}
        {subtitle && (
          <p
            className={cn(
              'rt-card-subtitle',
              '[.rt-card-cardTitle_&]:text-(--rt-color-text-secondary) [.rt-card-cardTitle_&]:text-[calc(1.4*var(--unit))] [.rt-card-cardTitle_&]:[font-weight:400] [.rt-card-cardTitle_&]:tracking-[0] [.rt-card-cardTitle_&]:leading-[calc(2.4*var(--unit))] [.rt-card-cardTitle_&]:m-0 [.rt-card-cardTitle_&]:p-0',
              '[.rt-card-cardTitle.rt-card-small_&]:[font-weight:400] [.rt-card-cardTitle.rt-card-small_&]:leading-[calc(2*var(--unit))]',
              '[.rt-card-cardMedia_.rt-card-cardTitle_&]:text-(--card-color-white)',
              classNames?.subtitle,
            )}
          >
            {subtitle}
          </p>
        )}
        {children && typeof children !== 'string' && children}
      </div>
    </div>
  );
}
export default CardTitle;
