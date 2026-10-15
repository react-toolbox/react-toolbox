'use client';
import classnames from 'classnames';
import FontIcon from '../font_icon';
import { mergeTheme } from '../theming';
import { useRipple } from '../ripple';
import defaultTheme from './theme';
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
  theme: suppliedTheme,
  ripple = true,
  rippleCentered = true,
  rippleClassName,
  rippleMultiple,
  rippleSpread,
  onRippleEnded,
  ...native
}: IconButtonProps) {
  const theme = mergeTheme(defaultTheme, suppliedTheme);
  const ink = useRipple({
    disabled,
    centered: rippleCentered,
    className: rippleClassName,
    multiple: rippleMultiple,
    spread: rippleSpread,
    theme: { rippleWrapper: theme.rippleWrapper },
    ripple,
    onRippleEnded,
  });
  const level = primary ? 'primary' : accent ? 'accent' : 'neutral';
  const classes = classnames(
    theme.toggle,
    { [theme[level]]: neutral, [theme.inverse]: inverse },
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
        {icon &&
          (typeof icon === 'string' ? <FontIcon className={theme.icon} value={icon} /> : icon)}
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
        {icon &&
          (typeof icon === 'string' ? <FontIcon className={theme.icon} value={icon} /> : icon)}
        {children}
        {ink.ripple}
      </button>
    );
    return element;
  }
}
export default IconButton;
