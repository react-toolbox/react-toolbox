'use client';
import './tokens.css';

import { materialRoot, materialDescendants } from '../foundations/styles/classes';
import type { AvatarClassNames } from './types';
import { isValidElement, type ComponentPropsWithRef, type ReactNode } from 'react';
import * as AvatarPrimitive from '@radix-ui/react-avatar';
import { cn } from '../foundations/styles/cn';
import FontIcon from '../font-icon';
export type { AvatarClassNames } from './types';
export interface AvatarProps extends ComponentPropsWithRef<'div'> {
  alt?: string;
  cover?: boolean;
  /** Avoid briefly flashing the fallback for cached or fast-loading images. */
  fallbackDelay?: number;
  onLoadingStatusChange?: (status: 'idle' | 'loading' | 'loaded' | 'error') => void;
  imageProps?: Omit<AvatarPrimitive.AvatarImageProps, 'src' | 'alt' | 'asChild' | 'children' | 'onLoadingStatusChange'>;
  icon?: ReactNode;
  /** URL images use automatic loading/fallback. Custom nodes own their loading and cover styling. */
  image?: ReactNode;
  /** Classes for the component's rendered parts. */
  classNames?: AvatarClassNames;
}
export function Avatar({
  alt = '',
  children,
  className,
  cover = false,
  fallbackDelay,
  onLoadingStatusChange,
  imageProps,
  icon,
  image,
  classNames,
  title,
  ...other
}: AvatarProps) {
  const customImage = image != null && image !== false && typeof image !== 'string';
  const fallback =
    children ??
    (typeof icon === 'string' ? (
      <FontIcon
        className={cn('rt-avatar-letter', 'block leading-(--avatar-size) w-full', classNames?.letter)}
        value={icon}
        alt={alt}
      />
    ) : (
      icon
    )) ??
    (title ? (
      <span className={cn('rt-avatar-letter', 'block leading-(--avatar-size) w-full', classNames?.letter)}>
        {Array.from(title)[0]}
      </span>
    ) : null);
  return (
    <AvatarPrimitive.Root asChild>
      <div
        data-react-toolbox="avatar"
        className={cn(
          'rt-avatar-avatar',
          'bg-(--avatar-background) rounded-[50%] text-(--avatar-color) inline-block text-(length:--avatar-font-size) h-(--avatar-size) overflow-hidden relative text-center align-middle w-(--avatar-size)',
          materialRoot,
          materialDescendants,
          '[&>svg]:fill-current [&>svg]:h-(--avatar-size) [&>svg]:w-[1em]',
          '[&>img]:h-auto [&>img]:max-w-full',
          "[&>[data-react-toolbox='font-icon']]:block [&>[data-react-toolbox='font-icon']]:leading-(--avatar-size) [&>[data-react-toolbox='font-icon']]:w-full",
          classNames?.avatar,
          className,
        )}
        {...other}
      >
        {!customImage && fallback != null && (
          <AvatarPrimitive.Fallback
            delayMs={fallbackDelay}
            asChild={isValidElement(fallback)}
            className={
              isValidElement(fallback)
                ? undefined
                : typeof fallback === 'string' || typeof fallback === 'number'
                  ? cn('flex h-full w-full items-center justify-center', classNames?.letter)
                  : 'contents'
            }
          >
            {fallback}
          </AvatarPrimitive.Fallback>
        )}
        {cover && typeof image === 'string' && (
          <AvatarPrimitive.Image
            {...imageProps}
            asChild
            src={image}
            alt={alt}
            onLoadingStatusChange={onLoadingStatusChange}
          >
            <CoverImage
              aria-label={alt}
              className={cn(
                'rt-avatar-image',
                'bg-transparent bg-center bg-cover rounded-[50%] block h-full absolute w-full',
                classNames?.image,
                imageProps?.className,
              )}
              style={{ backgroundImage: `url('${image}')` }}
            />
          </AvatarPrimitive.Image>
        )}
        {customImage
          ? image
          : !cover &&
            (typeof image === 'string' ? (
              <AvatarPrimitive.Image
                {...imageProps}
                onLoadingStatusChange={onLoadingStatusChange}
                alt={alt}
                className={cn(
                  'rt-avatar-image',
                  'bg-transparent bg-center bg-cover rounded-[50%] block h-full absolute w-full',
                  classNames?.image,
                  imageProps?.className,
                )}
                src={image}
                title={title}
              />
            ) : (
              image
            ))}
      </div>
    </AvatarPrimitive.Root>
  );
}
/** Radix owns URL loading/error state; preserve M1's background-cover rendering. */
function CoverImage({
  src: _src,
  alt,
  crossOrigin: _crossOrigin,
  referrerPolicy: _referrerPolicy,
  ...props
}: ComponentPropsWithRef<'span'> & { src?: string; alt?: string; crossOrigin?: string; referrerPolicy?: string }) {
  return (
    <span {...props} role={alt ? 'img' : undefined} aria-label={alt || undefined} aria-hidden={!alt || undefined} />
  );
}
export default Avatar;
