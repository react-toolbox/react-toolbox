'use client';

import { buttonClassName, rippleWrapperClasses, iconClasses } from './styles';
import FontIcon from '../font-icon';
import { useRipple } from '../ripple';
import ButtonElement from './ButtonElement';
import type { ButtonAppearanceProps, ButtonNativeProps, ButtonShapeProps } from './types';
export type ButtonProps = ButtonAppearanceProps & ButtonShapeProps & ButtonNativeProps;
export function Button({
  accent = false,
  asChild = false,
  children,
  className = '',
  disabled = false,
  icon,
  inverse,
  neutral = true,
  primary = false,
  floating,
  label,
  mini,
  raised,
  ripple = true,
  rippleCentered = false,
  rippleClassName,
  rippleMultiple,
  rippleSpread,
  onRippleEnded,
  ...native
}: ButtonProps) {
  const ink = useRipple({
    disabled,
    centered: rippleCentered,
    className: rippleClassName,
    multiple: rippleMultiple,
    spread: rippleSpread,
    wrapperClassName: rippleWrapperClasses,
    ripple,
    onRippleEnded,
  });
  const classes = buttonClassName({
    accent,
    className,
    floating,
    inverse,
    mini,
    neutral,
    primary,
    raised,
  });
  const element = (
    <ButtonElement
      {...native}
      asChild={asChild}
      disabled={disabled}
      className={classes}
      ink={ink}
      leading={
        <>
          {icon ? <FontIcon aria-hidden={true} className={iconClasses} value={icon} /> : null}
          {label}
        </>
      }
    >
      {children}
    </ButtonElement>
  );
  return disabled && native.onMouseEnter ? <span>{element}</span> : element;
}
export default Button;
