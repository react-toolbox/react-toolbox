'use client';

import { buttonClassName, rippleWrapperClasses, iconClasses } from './styles';
import { cn } from '../foundations/styles/cn';
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
  classNames,
  flat: _flat,
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
    classNames: { rippleWrapper: cn(rippleWrapperClasses, classNames?.rippleWrapper) },
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
    classNames,
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
          {icon ? <FontIcon aria-hidden={true} className={cn(iconClasses, classNames?.icon)} value={icon} /> : null}
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
