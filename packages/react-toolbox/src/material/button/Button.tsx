'use client';
import { mergeStyleSlots } from '../foundations/styles/slots';

import { buttonClassName, rippleWrapperClasses, iconClasses } from './styles';
import { cn } from '../foundations/styles/cn';
import FontIcon from '../font-icon';
import { useRipple } from '../ripple';
import type { ButtonAppearanceProps, ButtonNativeProps, ButtonShapeProps } from './types';
export type ButtonProps = ButtonAppearanceProps & ButtonShapeProps & ButtonNativeProps;
export function Button({
  accent = false,
  children,
  className = '',
  disabled = false,
  icon,
  inverse,
  neutral = true,
  primary = false,
  theme: legacyTheme,
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
  const theme = mergeStyleSlots(legacyTheme, classNames);
  const ink = useRipple({
    disabled,
    centered: rippleCentered,
    className: rippleClassName,
    multiple: rippleMultiple,
    spread: rippleSpread,
    theme: { rippleWrapper: cn(rippleWrapperClasses, theme?.rippleWrapper) },
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
    theme,
  });
  if (native.href !== undefined) {
    const element = (
      <a
        {...native}
        {...{ disabled }}
        className={classes}
        data-react-toolbox="button"
        aria-disabled={disabled || undefined}
        tabIndex={disabled ? -1 : native.tabIndex}
        onClick={(event) => {
          if (disabled) {
            event.preventDefault();
            event.stopPropagation();
          } else native.onClick?.(event);
        }}
        onMouseDown={(event) => {
          native.onMouseDown?.(event);
          ink.onMouseDown(event);
        }}
        onTouchStart={(event) => {
          native.onTouchStart?.(event);
          ink.onTouchStart(event);
        }}
        onTouchEnd={(event) => {
          native.onTouchEnd?.(event);
          ink.onTouchEnd(event);
        }}
        onTouchCancel={(event) => {
          native.onTouchCancel?.(event);
          ink.onTouchCancel(event);
        }}
      >
        {icon ? <FontIcon className={cn(iconClasses, theme?.icon)} value={icon} /> : null}
        {label}
        {children}
        {ink.ripple}
      </a>
    );
    return disabled && native.onMouseEnter ? <span>{element}</span> : element;
  }
  {
    const element = (
      <button
        {...native}
        {...{ disabled }}
        className={classes}
        data-react-toolbox="button"
        type={native.type || 'button'}
        onClick={(event) => {
          if (disabled) {
            event.preventDefault();
            event.stopPropagation();
          } else native.onClick?.(event);
        }}
        onMouseDown={(event) => {
          native.onMouseDown?.(event);
          ink.onMouseDown(event);
        }}
        onTouchStart={(event) => {
          native.onTouchStart?.(event);
          ink.onTouchStart(event);
        }}
        onTouchEnd={(event) => {
          native.onTouchEnd?.(event);
          ink.onTouchEnd(event);
        }}
        onTouchCancel={(event) => {
          native.onTouchCancel?.(event);
          ink.onTouchCancel(event);
        }}
      >
        {icon ? <FontIcon className={cn(iconClasses, theme?.icon)} value={icon} /> : null}
        {label}
        {children}
        {ink.ripple}
      </button>
    );
    return disabled && native.onMouseEnter ? <span>{element}</span> : element;
  }
}
export default Button;
