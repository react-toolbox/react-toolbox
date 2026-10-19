'use client';
import './tokens.css';

import { rippleWrapperClasses, buttonClasses, inverseClasses, iconClasses } from './styles';
import { cn } from '../foundations/styles/cn';
import FontIcon from '../font-icon';
import { useRipple } from '../ripple';
import ButtonElement from './ButtonElement';
import type { ButtonAppearanceProps, ButtonNativeProps } from './types';
export type IconButtonProps = ButtonAppearanceProps & ButtonNativeProps;
export function IconButton({
  accent = false,
  asChild = false,
  children,
  className = '',
  disabled = false,
  icon,
  inverse,
  neutral = true,
  primary = false,
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
    wrapperClassName: rippleWrapperClasses,
    ripple,
    onRippleEnded,
  });
  const classes = cn(
    buttonClasses,
    'rt-button-toggle',
    '[background:transparent] rounded-[50%] h-(--button-toggle-size) leading-(--button-toggle-size) align-middle w-(--button-toggle-size)',
    '[&_svg]:text-(length:--button-toggle-font-size) [&_svg]:h-(--button-toggle-size) [&_svg]:leading-(--button-toggle-size) [&_svg]:align-top',
    '[.rt-button-primary:not([disabled])&]:text-(--button-primary-color)',
    '[.rt-button-accent:not([disabled])&]:text-(--button-accent-color)',
    '[.rt-button-neutral:not([disabled])&]:text-(--button-neutral-color-contrast)',
    '[.rt-button-neutral:not([disabled]).rt-button-inverse&]:text-(--button-neutral-color)',
    neutral && (primary ? 'rt-button-primary' : accent ? 'rt-button-accent' : 'rt-button-neutral'),
    inverse && inverseClasses,
    className,
  );
  const element = (
    <ButtonElement
      {...native}
      asChild={asChild}
      disabled={disabled}
      className={classes}
      ink={ink}
      leading={
        <>
          {icon &&
            (typeof icon === 'string' ? <FontIcon aria-hidden={true} className={iconClasses} value={icon} /> : icon)}
        </>
      }
    >
      {children}
    </ButtonElement>
  );
  return element;
}
export default IconButton;
