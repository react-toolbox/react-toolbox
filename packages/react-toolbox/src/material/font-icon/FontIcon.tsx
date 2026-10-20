'use client';
import type { ComponentPropsWithRef, ReactNode } from 'react';
import classnames from '../foundations/styles/cn';

export interface FontIconProps extends ComponentPropsWithRef<'span'> {
  alt?: string;
  value?: ReactNode;
}
export function FontIcon({ alt = '', children, className = '', value, ...other }: FontIconProps) {
  const isLigature = (typeof value === 'string' && children == null) || (value == null && typeof children === 'string');
  return (
    <span
      data-react-toolbox="font-icon"
      {...other}
      role={other.role ?? (alt || other['aria-label'] || other['aria-labelledby'] ? 'img' : undefined)}
      aria-label={other['aria-label'] ?? (alt || undefined)}
      aria-hidden={
        other['aria-hidden'] ??
        (isLigature && !alt && !other['aria-label'] && !other['aria-labelledby'] && !other.role ? true : undefined)
      }
      className={classnames({ 'material-icons': typeof value === 'string' || typeof children === 'string' }, className)}
    >
      {value}
      {children}
    </span>
  );
}
export default FontIcon;
