'use client';
import { materialRoot, materialDescendants } from '../utils/styles';
import type { AvatarTheme } from './types';
import type { ComponentPropsWithRef, ReactNode } from 'react';
import { cn } from '../utils/cn';
import FontIcon from '../font_icon';
export type { AvatarTheme } from './types';
export interface AvatarProps extends ComponentPropsWithRef<'div'> {
  alt?: string;
  cover?: boolean;
  icon?: ReactNode;
  image?: ReactNode;
  theme?: AvatarTheme;
}
export function Avatar({
  alt = '',
  children,
  className,
  cover = false,
  icon,
  image,
  theme,
  title,
  ...other
}: AvatarProps) {
  return (
    <div
      data-react-toolbox="avatar"
      className={cn(
        'rt-avatar-avatar',
        'bg-[var(--avatar-background)] rounded-[50%] text-[color:var(--avatar-color)] inline-block text-[length:var(--avatar-font-size)] h-[var(--avatar-size)] overflow-hidden relative text-center align-middle w-[var(--avatar-size)]',
        materialRoot,
        materialDescendants,
        '[&>svg]:fill-current [&>svg]:h-[var(--avatar-size)] [&>svg]:w-[1em]',
        '[&>img]:h-auto [&>img]:max-w-full',
        "[&>[data-react-toolbox='font-icon']]:block [&>[data-react-toolbox='font-icon']]:leading-[var(--avatar-size)] [&>[data-react-toolbox='font-icon']]:w-full",
        theme?.avatar,
        className,
      )}
      {...other}
    >
      {children}
      {cover && typeof image === 'string' && (
        <span
          aria-label={alt}
          className={cn(
            'rt-avatar-image',
            'bg-[transparent] bg-center bg-cover rounded-[50%] block h-full absolute w-full',
            theme?.image,
          )}
          style={{ backgroundImage: `url('${image}')` }}
        />
      )}
      {!cover &&
        (typeof image === 'string' ? (
          <img
            alt={alt}
            className={cn(
              'rt-avatar-image',
              'bg-[transparent] bg-center bg-cover rounded-[50%] block h-full absolute w-full',
              theme?.image,
            )}
            src={image}
            title={title}
          />
        ) : (
          image
        ))}
      {typeof icon === 'string' ? (
        <FontIcon
          className={cn('rt-avatar-letter', 'block leading-[var(--avatar-size)] w-full', theme?.letter)}
          value={icon}
          alt={alt}
        />
      ) : (
        icon
      )}
      {title && (
        <span className={cn('rt-avatar-letter', 'block leading-[var(--avatar-size)] w-full', theme?.letter)}>
          {title[0]}
        </span>
      )}
    </div>
  );
}
export default Avatar;
