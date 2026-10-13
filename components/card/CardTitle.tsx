'use client';
import type { ComponentPropsWithRef, ReactNode } from 'react';
import classnames from 'classnames';
import Avatar from '../avatar';
import { mergeTheme } from '../theming';
import defaultTheme from './theme';
export interface CardTitleProps extends Omit<ComponentPropsWithRef<'div'>, 'title'> {
  avatar?: ReactNode;
  subtitle?: ReactNode;
  title?: ReactNode;
  theme?: Partial<typeof defaultTheme>;
}
export function CardTitle({
  avatar,
  children,
  className,
  subtitle,
  theme: suppliedTheme,
  title,
  ...other
}: CardTitleProps) {
  const theme = mergeTheme(defaultTheme, suppliedTheme);
  return (
    <div
      className={classnames(
        theme.cardTitle,
        { [theme.small]: avatar, [theme.large]: !avatar },
        className,
      )}
      {...other}
    >
      {typeof avatar === 'string' ? <Avatar image={avatar} /> : avatar}
      <div>
        {title && <h5 className={theme.title}>{title}</h5>}
        {children && typeof children === 'string' && <h5 className={theme.title}>{children}</h5>}
        {subtitle && <p className={theme.subtitle}>{subtitle}</p>}
        {children && typeof children !== 'string' && children}
      </div>
    </div>
  );
}
export default CardTitle;
