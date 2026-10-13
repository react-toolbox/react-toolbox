'use client';
import type { ComponentPropsWithRef } from 'react';
import classnames from 'classnames';
import { mergeTheme } from '../theming';
import defaultTheme from './theme';
export interface CardTextProps extends ComponentPropsWithRef<'div'> {
  theme?: Partial<typeof defaultTheme>;
}
export function CardText({ children, className, theme: suppliedTheme, ...other }: CardTextProps) {
  const theme = mergeTheme(defaultTheme, suppliedTheme);
  return (
    <div className={classnames(theme.cardText, className)} {...other}>
      {typeof children === 'string' ? <p>{children}</p> : children}
    </div>
  );
}
export default CardText;
