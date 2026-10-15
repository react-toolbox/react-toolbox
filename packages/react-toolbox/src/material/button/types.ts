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
import type { ComponentPropsWithRef, HTMLAttributes, ReactElement, ReactNode, Ref } from 'react';
import type { RippleProps } from '../ripple';
export interface ButtonAppearanceProps extends RippleProps {
  accent?: boolean;
  disabled?: boolean;
  icon?: ReactNode;
  inverse?: boolean;
  neutral?: boolean;
  primary?: boolean;
  /** Classes for the component's rendered parts. Applied after legacy theme overrides. */
  classNames?: ButtonTheme;
  /** @deprecated Use classNames for style slots; use ThemeProvider for design tokens. */
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
  | (ComponentPropsWithRef<'button'> & { asChild?: false; href?: undefined })
  | (ComponentPropsWithRef<'a'> & { asChild?: false; href: string; disabled?: boolean })
  | (HTMLAttributes<HTMLElement> & {
      /** Merge behavior and styles into one ref-forwarding child, such as a router Link. */
      asChild: true;
      children: ReactElement;
      ref?: Ref<HTMLElement>;
      href?: string;
      disabled?: boolean;
      type?: string;
    });

/** Style slots for the component. */
export type ButtonClassNames = ButtonTheme;
