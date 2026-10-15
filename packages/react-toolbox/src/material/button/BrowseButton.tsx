'use client';
import { mergeStyleSlots } from '../foundations/styles/slots';

import { buttonClassName, rippleWrapperClasses, iconClasses } from './styles';
import type { ChangeEventHandler, ComponentPropsWithRef, Ref } from 'react';
import { cn } from '../foundations/styles/cn';
import FontIcon from '../font-icon';
import { useRipple } from '../ripple';
import type { ButtonAppearanceProps, ButtonShapeProps } from './types';
export interface BrowseButtonProps
  extends Omit<ComponentPropsWithRef<'label'>, 'onChange'>,
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
  theme: legacyTheme,
  classNames,
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
      {icon ? <FontIcon className={cn(iconClasses, theme?.icon)} value={icon} /> : null}
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
