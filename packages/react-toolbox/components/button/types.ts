/** Optional class overrides for the component's rendered parts. */
export type ButtonTheme = Partial<
  Record<
    | 'accent'
    | 'button'
    | 'flat'
    | 'floating'
    | 'icon'
    | 'inverse'
    | 'mini'
    | 'neutral'
    | 'primary'
    | 'raised'
    | 'rippleWrapper'
    | 'solid'
    | 'squared'
    | 'toggle',
    string
  >
>;
import type { ComponentPropsWithRef, ReactNode } from 'react';
import type { RippleProps } from '../ripple';
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
