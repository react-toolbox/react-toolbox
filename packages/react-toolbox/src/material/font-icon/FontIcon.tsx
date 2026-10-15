'use client';
import type { ComponentPropsWithRef, ReactNode } from 'react';
import classnames from '../foundations/styles/cn';

export interface FontIconProps extends ComponentPropsWithRef<'span'> {
  alt?: string;
  value?: ReactNode;
}
export function FontIcon({ alt = '', children, className = '', value, ...other }: FontIconProps) {
  return (
    <span
      data-react-toolbox="font-icon"
      {...other}
      role={other.role ?? (alt || other['aria-label'] || other['aria-labelledby'] ? 'img' : undefined)}
      aria-label={other['aria-label'] ?? (alt || undefined)}
      className={classnames({ 'material-icons': typeof value === 'string' || typeof children === 'string' }, className)}
    >
      {value}
      {children}
    </span>
  );
}
export default FontIcon;
