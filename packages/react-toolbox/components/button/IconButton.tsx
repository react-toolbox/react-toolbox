'use client';
import { rippleWrapperClasses, buttonClasses, inverseClasses, iconClasses } from './styles';
import { cn } from '../utils/cn';
import FontIcon from '../font_icon';
import { useRipple } from '../ripple';
import type { ButtonAppearanceProps, ButtonNativeProps } from './types';
export type IconButtonProps = ButtonAppearanceProps & ButtonNativeProps;
export function IconButton({
  accent = false,
  children,
  className = '',
  disabled = false,
  icon,
  inverse,
  neutral = true,
  primary = false,
  theme,
  ripple = true,
  rippleCentered = true,
  rippleClassName,
  rippleMultiple,
  rippleSpread,
  onRippleEnded,
  ...native
}: IconButtonProps) {
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
  const level = primary ? 'primary' : accent ? 'accent' : 'neutral';
  const classes = cn(
    buttonClasses,
    'rt-button-toggle',
    '[background:transparent] rounded-[50%] h-(--button-toggle-size) leading-(--button-toggle-size) align-middle w-(--button-toggle-size)',
    '[&_svg]:text-(length:--button-toggle-font-size) [&_svg]:h-(--button-toggle-size) [&_svg]:leading-(--button-toggle-size) [&_svg]:align-top',
    '[.rt-button-primary:not([disabled])&]:text-(--button-primary-color)',
    '[.rt-button-accent:not([disabled])&]:text-(--button-accent-color)',
    '[.rt-button-neutral:not([disabled])&]:text-(--button-neutral-color-contrast)',
    '[.rt-button-neutral:not([disabled]).rt-button-inverse&]:text-(--button-neutral-color)',
    theme?.button,
    theme?.toggle,
    neutral && cn(primary ? 'rt-button-primary' : accent ? 'rt-button-accent' : 'rt-button-neutral', theme?.[level]),
    inverse && cn(inverseClasses, theme?.inverse),
    className,
  );
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
        {icon && (typeof icon === 'string' ? <FontIcon className={cn(iconClasses, theme?.icon)} value={icon} /> : icon)}
        {children}
        {ink.ripple}
      </a>
    );
    return element;
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
        {icon && (typeof icon === 'string' ? <FontIcon className={cn(iconClasses, theme?.icon)} value={icon} /> : icon)}
        {children}
        {ink.ripple}
      </button>
    );
    return element;
  }
}
export default IconButton;
