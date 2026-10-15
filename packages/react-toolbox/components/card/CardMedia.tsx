'use client';
import type { ComponentPropsWithRef, ReactNode } from 'react';
import classnames from 'classnames';
import { mergeTheme } from '../theming';
import defaultTheme from './theme';
export interface CardMediaProps extends ComponentPropsWithRef<'div'> {
  aspectRatio?: 'wide' | 'square';
  contentOverlay?: boolean;
  image?: ReactNode;
  theme?: Partial<typeof defaultTheme>;
}
export function CardMedia({
  aspectRatio,
  children,
  className,
  color,
  contentOverlay,
  image,
  theme: suppliedTheme,
  ...other
}: CardMediaProps) {
  const theme = mergeTheme(defaultTheme, suppliedTheme);
  return (
    <div
      style={{
        backgroundColor: color || undefined,
        backgroundImage: typeof image === 'string' ? `url('${image}')` : undefined,
      }}
      className={classnames(theme.cardMedia, aspectRatio && theme[aspectRatio], className)}
      {...other}
    >
      <div className={classnames(theme.content, { [theme.contentOverlay]: contentOverlay })}>
        {children}
      </div>
    </div>
  );
}
export default CardMedia;
