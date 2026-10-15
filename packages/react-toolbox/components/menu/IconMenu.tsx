'use client';

import {
  useEffect,
  useId,
  useImperativeHandle,
  useRef,
  useState,
  type HTMLAttributes,
  type ReactNode,
  type Ref,
} from 'react';
import classnames from 'classnames';
import { mergeTheme } from '../theming';
import { IconButton } from '../button';
import Menu, { type MenuProps, type MenuPosition } from './Menu';
import defaults from './theme';

export type IconMenuTheme = Partial<typeof defaults>;
export interface IconMenuHandle {
  open(): void;
  close(): void;
  readonly node: HTMLDivElement | null;
}
export interface IconMenuProps<Value = unknown> extends Omit<
  HTMLAttributes<HTMLDivElement>,
  'onSelect' | 'onClick'
> {
  active?: boolean;
  icon?: ReactNode;
  iconRipple?: boolean;
  inverse?: boolean;
  menuRipple?: boolean;
  onClick?: React.MouseEventHandler<HTMLElement>;
  onHide?: () => void;
  onSelect?: MenuProps<Value>['onSelect'];
  onShow?: () => void;
  position?: MenuPosition;
  selectable?: boolean;
  selected?: Value;
  theme?: IconMenuTheme;
  ref?: Ref<IconMenuHandle>;
}
export function IconMenu<Value = unknown>({
  active = false,
  children,
  className,
  icon = 'more_vert',
  iconRipple = true,
  inverse,
  menuRipple = true,
  onClick,
  onHide,
  onSelect,
  onShow,
  position = 'auto',
  selectable = false,
  selected,
  theme: overrides,
  ref,
  ...attributes
}: IconMenuProps<Value>) {
  const theme = mergeTheme(defaults, overrides);
  const id = `toolbox-menu-${useId()}`;
  const node = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(active);
  const initialFocus = useRef<'first' | 'last'>('first');
  useEffect(
    () => setVisible(active),
    [
      active,
      children,
      className,
      icon,
      iconRipple,
      inverse,
      menuRipple,
      onClick,
      onHide,
      onSelect,
      onShow,
      position,
      selectable,
      selected,
      overrides,
    ],
  );
  useImperativeHandle(
    ref,
    () => ({
      open: () => setVisible(true),
      close: () => setVisible(false),
      get node() {
        return node.current;
      },
    }),
    [],
  );
  return (
    <div {...attributes} ref={node} className={classnames(theme.iconMenu, className)}>
      <IconButton
        id={`${id}-trigger`}
        aria-label={attributes['aria-label'] || 'More options'}
        aria-haspopup="menu"
        aria-expanded={visible}
        aria-controls={id}
        className={theme.icon}
        icon={icon}
        inverse={inverse}
        onClick={(event) => {
          initialFocus.current = 'first';
          setVisible((current) => !current);
          onClick?.(event);
        }}
        onKeyDown={(event) => {
          if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
            event.preventDefault();
            initialFocus.current = event.key === 'ArrowUp' ? 'last' : 'first';
            setVisible(true);
          }
        }}
        ripple={iconRipple}
      />
      <Menu
        id={id}
        aria-labelledby={`${id}-trigger`}
        initialFocus={initialFocus.current}
        active={visible}
        onHide={() => {
          setVisible(false);
          onHide?.();
        }}
        onSelect={onSelect}
        onShow={onShow}
        position={position}
        ripple={menuRipple}
        selectable={selectable}
        selected={selected}
        theme={overrides}
      >
        {children}
      </Menu>
    </div>
  );
}
export default IconMenu;
