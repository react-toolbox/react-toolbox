'use client';
import type { ComponentPropsWithRef } from 'react';
import classnames from 'classnames';
import { mergeTheme } from '../theming';
import defaultTheme from './theme';
export interface CardActionsProps extends ComponentPropsWithRef<'div'> {
  theme?: Partial<typeof defaultTheme>;
}
export function CardActions({
  children,
  className,
  theme: suppliedTheme,
  ...other
}: CardActionsProps) {
  const theme = mergeTheme(defaultTheme, suppliedTheme);
  return (
    <div className={classnames(theme.cardActions, className)} {...other}>
      {children}
    </div>
  );
}
export default CardActions;
