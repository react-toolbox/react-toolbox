import type { ComponentPropsWithRef, HTMLAttributes, ReactElement, ReactNode, Ref } from 'react';
import type { RippleProps } from '../ripple';
export interface ButtonAppearanceProps extends RippleProps {
  accent?: boolean;
  disabled?: boolean;
  icon?: ReactNode;
  inverse?: boolean;
  neutral?: boolean;
  primary?: boolean;
}
export interface ButtonShapeProps {
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
