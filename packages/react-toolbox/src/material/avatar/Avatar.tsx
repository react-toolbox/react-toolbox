'use client';
import { mergeStyleSlots } from '../foundations/styles/slots';

import { materialRoot, materialDescendants } from '../foundations/styles/classes';
import type { AvatarTheme } from './types';
import { isValidElement, type ComponentPropsWithRef, type ReactNode } from 'react';
import * as AvatarPrimitive from '@radix-ui/react-avatar';
import { cn } from '../foundations/styles/cn';
import FontIcon from '../font-icon';
export type { AvatarTheme, AvatarClassNames } from './types';
export interface AvatarProps extends ComponentPropsWithRef<'div'> {
  alt?: string;
  cover?: boolean;
  /** Avoid briefly flashing the fallback for cached or fast-loading images. */
  fallbackDelay?: number;
  onLoadingStatusChange?: (status: 'idle' | 'loading' | 'loaded' | 'error') => void;
  imageProps?: Omit<AvatarPrimitive.AvatarImageProps, 'src' | 'alt' | 'asChild' | 'children' | 'onLoadingStatusChange'>;
  icon?: ReactNode;
  image?: ReactNode;
  /** Classes for the component's rendered parts. Applied after legacy theme overrides. */
  classNames?: AvatarTheme;
  /** @deprecated Use classNames for style slots; use ThemeProvider for design tokens. */
  theme?: AvatarTheme;
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
  theme: legacyTheme,
  classNames,
  title,
  ...other
}: AvatarProps) {
  const theme = mergeStyleSlots(legacyTheme, classNames);
  const fallback =
    children ??
    (typeof icon === 'string' ? (
      <FontIcon
        className={cn('rt-avatar-letter', 'block leading-(--avatar-size) w-full', theme?.letter)}
        value={icon}
        alt={alt}
      />
    ) : (
      icon
    )) ??
    (title ? (
      <span className={cn('rt-avatar-letter', 'block leading-(--avatar-size) w-full', theme?.letter)}>
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
          theme?.avatar,
          className,
        )}
        {...other}
      >
        {fallback != null && (
          <AvatarPrimitive.Fallback
            delayMs={fallbackDelay}
            asChild={isValidElement(fallback)}
            className={isValidElement(fallback) ? undefined : 'contents'}
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
                theme?.image,
                imageProps?.className,
              )}
              style={{ backgroundImage: `url('${image}')` }}
            />
          </AvatarPrimitive.Image>
        )}
        {!cover &&
          (typeof image === 'string' ? (
            <AvatarPrimitive.Image
              {...imageProps}
              onLoadingStatusChange={onLoadingStatusChange}
              alt={alt}
              className={cn(
                'rt-avatar-image',
                'bg-transparent bg-center bg-cover rounded-[50%] block h-full absolute w-full',
                theme?.image,
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
// Radix owns loading/error state; preserve M1's background-cover rendering.
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
