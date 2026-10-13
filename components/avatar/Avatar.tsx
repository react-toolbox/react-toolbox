'use client';
import type { ComponentPropsWithRef, ReactNode } from 'react';
import classnames from 'classnames';
import FontIcon from '../font_icon';
import { mergeTheme } from '../theming';
import defaultTheme from './theme';
export type AvatarTheme = Partial<typeof defaultTheme>;
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
  theme: suppliedTheme,
  title,
  ...other
}: AvatarProps) {
  const theme = mergeTheme(defaultTheme, suppliedTheme);
  return (
    <div data-react-toolbox="avatar" className={classnames(theme.avatar, className)} {...other}>
      {children}
      {cover && typeof image === 'string' && (
        <span
          aria-label={alt}
          className={theme.image}
          style={{ backgroundImage: `url('${image}')` }}
        />
      )}
      {!cover &&
        (typeof image === 'string' ? (
          <img alt={alt} className={theme.image} src={image} title={title} />
        ) : (
          image
        ))}
      {typeof icon === 'string' ? (
        <FontIcon className={theme.letter} value={icon} alt={alt} />
      ) : (
        icon
      )}
      {title && <span className={theme.letter}>{title[0]}</span>}
    </div>
  );
}
export default Avatar;
