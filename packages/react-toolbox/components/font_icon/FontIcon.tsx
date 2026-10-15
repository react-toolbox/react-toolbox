'use client';
import type { ComponentPropsWithRef, ReactNode } from 'react';
import classnames from '../utils/cn';

export interface FontIconProps extends ComponentPropsWithRef<'span'> {
  alt?: string;
  value?: ReactNode;
}
export function FontIcon({ alt = '', children, className = '', value, ...other }: FontIconProps) {
  return (
    <span
      data-react-toolbox="font-icon"
      aria-label={alt}
      className={classnames({ 'material-icons': typeof value === 'string' || typeof children === 'string' }, className)}
      {...other}
    >
      {value}
      {children}
    </span>
  );
}
export default FontIcon;
