'use client';
import type { ComponentPropsWithRef } from 'react';
import classnames from 'classnames';
import { mergeTheme } from '../theming';
import defaultTheme from './theme';
export interface CardProps extends ComponentPropsWithRef<'div'> {
  theme?: Partial<typeof defaultTheme>;
  raised?: boolean;
}
export function Card({ children, className, raised, theme: suppliedTheme, ...other }: CardProps) {
  const theme = mergeTheme(defaultTheme, suppliedTheme);
  return (
    <div
      data-react-toolbox="card"
      className={classnames(theme.card, { [theme.raised]: raised }, className)}
      {...other}
    >
      {children}
    </div>
  );
}
export default Card;
