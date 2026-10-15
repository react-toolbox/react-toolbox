import type { ComponentPropsWithRef, ReactNode } from 'react';
import type { RippleProps } from '../ripple';
import type defaultTheme from './theme';
export type ButtonTheme = Partial<typeof defaultTheme>;
export interface ButtonAppearanceProps extends RippleProps {
  accent?: boolean;
  disabled?: boolean;
  icon?: ReactNode;
  inverse?: boolean;
  neutral?: boolean;
  primary?: boolean;
  theme?: ButtonTheme;
}
export interface ButtonShapeProps {
  flat?: boolean;
  floating?: boolean;
  label?: string;
  mini?: boolean;
  raised?: boolean;
}
export type ButtonNativeProps =
  | (ComponentPropsWithRef<'button'> & { href?: undefined })
  | (ComponentPropsWithRef<'a'> & { href: string; disabled?: boolean });
