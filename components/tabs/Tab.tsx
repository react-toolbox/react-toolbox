'use client';

import {
  useEffect,
  useRef,
  type HTMLAttributes,
  type KeyboardEvent,
  type MouseEvent,
  type ReactNode,
  type Ref,
} from 'react';
import classnames from 'classnames';
import { mergeTheme } from '../theming';
import { useRipple } from '../ripple';
import { FontIcon } from '../font_icon';
import defaults from './theme';

export type TabTheme = Partial<typeof defaults>;
export type TabEvent = MouseEvent<HTMLDivElement> | KeyboardEvent<HTMLDivElement>;
export interface TabProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onClick'> {
  active?: boolean;
  activeClassName?: string;
  disabled?: boolean;
  icon?: ReactNode;
  index?: number;
  label?: ReactNode;
  onActive?: () => void;
  onClick?: (event: TabEvent, index?: number) => void;
  ripple?: boolean;
  theme?: TabTheme;
  ref?: Ref<HTMLDivElement>;
}
export function Tab({
  active = false,
  activeClassName,
  children,
  className,
  disabled = false,
  hidden = false,
  label,
  icon,
  index,
  onActive,
  onClick,
  onKeyDown,
  onMouseDown,
  onTouchStart,
  onTouchEnd,
  onTouchCancel,
  ripple = true,
  theme: overrides,
  ref,
  ...attributes
}: TabProps) {
  const theme = mergeTheme(defaults, overrides);
  const previousActive = useRef(active);
  useEffect(() => {
    if (!previousActive.current && active) onActive?.();
    previousActive.current = active;
  }, [active, onActive]);
  const ink = useRipple({ centered: false, disabled: disabled || hidden, ripple, theme });
  const click = (event: TabEvent) => {
    if (!disabled && !hidden) onClick?.(event, index);
  };
  return (
    <div
      {...attributes}
      ref={ref}
      data-react-toolbox="tab"
      role="tab"
      aria-selected={active}
      aria-disabled={disabled || undefined}
      aria-hidden={hidden || undefined}
      tabIndex={disabled || hidden ? -1 : (attributes.tabIndex ?? (active ? 0 : -1))}
      className={classnames(
        theme.label,
        active && theme.active,
        hidden && theme.hidden,
        Boolean(label) && theme.withText,
        Boolean(icon) && theme.withIcon,
        disabled && theme.disabled,
        active && activeClassName,
        className,
      )}
      onClick={click}
      onKeyDown={(event) => {
        onKeyDown?.(event);
        if (!event.defaultPrevented && (event.key === 'Enter' || event.key === ' ')) {
          event.preventDefault();
          click(event);
        }
      }}
      onMouseDown={(event) => {
        onMouseDown?.(event);
        if (!event.defaultPrevented) ink.onMouseDown(event);
      }}
      onTouchStart={(event) => {
        onTouchStart?.(event);
        if (!event.defaultPrevented) ink.onTouchStart(event);
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
      {icon && <FontIcon className={theme.icon} value={icon} />}
      {label}
      {children}
      {ink.ripple}
    </div>
  );
}
export default Tab;
