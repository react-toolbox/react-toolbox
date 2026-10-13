'use client';
import type { ChangeEventHandler, ComponentPropsWithRef, Ref } from 'react';
import classnames from 'classnames';
import FontIcon from '../font_icon';
import { mergeTheme } from '../theming';
import { useRipple } from '../ripple';
import defaultTheme from './theme';
import type { ButtonAppearanceProps, ButtonShapeProps } from './types';
export interface BrowseButtonProps
  extends
    Omit<ComponentPropsWithRef<'label'>, 'onChange'>,
    ButtonAppearanceProps,
    ButtonShapeProps {
  accept?: string;
  multiple?: boolean;
  name?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  inputRef?: Ref<HTMLInputElement>;
}
export function BrowseButton({
  accent = false,
  accept = '*/*',
  children,
  className = '',
  disabled = false,
  flat: _flat,
  floating,
  icon,
  inverse,
  label,
  mini,
  multiple = false,
  name,
  neutral = true,
  onChange,
  primary = false,
  raised,
  theme: suppliedTheme,
  inputRef,
  ripple = true,
  rippleCentered = false,
  rippleClassName,
  rippleMultiple,
  rippleSpread,
  onRippleEnded,
  onMouseDown,
  onTouchStart,
  onTouchEnd,
  onTouchCancel,
  ...other
}: BrowseButtonProps) {
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
    theme.button,
    theme[raised ? 'raised' : floating ? 'floating' : 'flat'],
    { [theme[level]]: neutral, [theme.mini]: mini, [theme.inverse]: inverse },
    className,
  );
  return (
    <label
      {...other}
      {...{ disabled }}
      data-react-toolbox="label"
      className={classes}
      onMouseDown={(event) => {
        onMouseDown?.(event);
        ink.onMouseDown(event);
      }}
      onTouchStart={(event) => {
        onTouchStart?.(event);
        ink.onTouchStart(event);
      }}
      onTouchEnd={(event) => {
        onTouchEnd?.(event);
        ink.onTouchEnd(event);
      }}
      onTouchCancel={(event) => {
        onTouchCancel?.(event);
        ink.onTouchCancel(event);
      }}
    >
      {icon ? <FontIcon className={theme.icon} value={icon} /> : null}
      <span>{label}</span>
      <input
        ref={inputRef}
        className={classes}
        type="file"
        aria-label={label}
        name={name}
        disabled={disabled}
        accept={accept}
        multiple={multiple}
        onChange={onChange}
      />
      {children}
      {ink.ripple}
    </label>
  );
}
export default BrowseButton;
