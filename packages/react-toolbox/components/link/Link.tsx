'use client';
import { materialRoot, materialDescendants } from '../utils/styles';
import type { LinkTheme } from './types';
import type { ComponentPropsWithRef, ReactNode } from 'react';
import { cn } from '../utils/cn';
import FontIcon from '../font_icon';
export interface LinkProps extends ComponentPropsWithRef<'a'> {
  active?: boolean;
  count?: number;
  icon?: ReactNode;
  label?: string;
  theme?: LinkTheme;
}
export function Link({ active = false, children, className = '', count, icon, label, theme, ...other }: LinkProps) {
  return (
    <a
      data-react-toolbox="link"
      className={cn(
        'rt-link-link',
        '[align-content:center] items-center cursor-pointer flex flex-row justify-center leading-[1.5] relative [transition:opacity_var(--animation-duration)_var(--animation-curve-default)]',
        materialRoot,
        materialDescendants,
        '[&:not(.rt-link-active)]:opacity-[0.5]',
        '[&:hover]:opacity-[1]',
        '[&:active]:opacity-[1]',
        '[&>*]:align-middle',
        '[&>small]:text-[length:var(--font-size-tiny)] [&>small]:ml-[calc(0.8_*_var(--unit))] [&>small]:text-center',
        theme?.link,
        active && cn('rt-link-active', theme?.active),
        className,
      )}
      {...other}
    >
      {icon ? (
        <FontIcon
          className={cn('rt-link-icon', 'text-[length:calc(1.8_*_var(--unit))] mr-[var(--unit)]', theme?.icon)}
          value={icon}
        />
      ) : null}
      {label ? <abbr>{label}</abbr> : null}
      {count ? <small>{count}</small> : null}
      {children}
    </a>
  );
}
export default Link;
