'use client';
import { mergeStyleSlots } from '../foundations/styles/slots';

import { materialRoot, materialDescendants } from '../foundations/styles/classes';
import { iconClasses } from './styles';
import type { MenuTheme } from './types';

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
import { cn } from '../foundations/styles/cn';
import { IconButton } from '../button';
import Menu, { type MenuProps, type MenuPosition } from './Menu';

export type IconMenuTheme = MenuTheme;
export interface IconMenuHandle {
  open(): void;
  close(): void;
  readonly node: HTMLDivElement | null;
}
export interface IconMenuProps<Value = unknown> extends Omit<HTMLAttributes<HTMLDivElement>, 'onSelect' | 'onClick'> {
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
  /** Classes for the component's rendered parts. Applied after legacy theme overrides. */
  classNames?: IconMenuTheme;
  /** @deprecated Use classNames for style slots; use ThemeProvider for design tokens. */
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
  theme: legacyTheme,
  classNames,
  ref,
  ...attributes
}: IconMenuProps<Value>) {
  const theme = mergeStyleSlots(legacyTheme, classNames);
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
      theme,
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
    <div
      {...attributes}
      ref={node}
      className={cn(
        'rt-menu-iconMenu',
        'inline-block relative text-center',
        materialRoot,
        materialDescendants,
        theme?.iconMenu,
        className,
      )}
    >
      <IconButton
        id={`${id}-trigger`}
        aria-label={attributes['aria-label'] || 'More options'}
        aria-haspopup="menu"
        aria-expanded={visible}
        aria-controls={id}
        className={cn(iconClasses, theme?.icon)}
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
        theme={theme}
      >
        {children}
      </Menu>
    </div>
  );
}
export default IconMenu;

/** Style slots for the component. */
export type IconMenuClassNames = IconMenuTheme;
