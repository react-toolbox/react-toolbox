'use client';

import { materialRoot, materialDescendants } from '../foundations/styles/classes';
import { iconClasses } from './styles';
import type { MenuClassNames } from './types';

import {
  useId,
  useImperativeHandle,
  useRef,
  useState,
  type HTMLAttributes,
  type ReactNode,
  type ReactElement,
  type HTMLProps,
  type Ref,
} from 'react';
import { cn } from '../foundations/styles/cn';
import { IconButton } from '../button';
import { Slot } from '@radix-ui/react-slot';
import Menu, { type MenuProps, type MenuPosition } from './Menu';

export type IconMenuClassNames = MenuClassNames;
export interface IconMenuHandle {
  open(): void;
  close(): void;
  readonly node: HTMLDivElement | null;
}
export interface IconMenuProps<Value = unknown> extends Omit<HTMLAttributes<HTMLDivElement>, 'onSelect' | 'onClick'> {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** A ref-forwarding button or router link used as the trigger. */
  trigger?: ReactElement<HTMLProps<HTMLElement>>;
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
  /** Classes for the component's rendered parts. */
  classNames?: IconMenuClassNames;
  ref?: Ref<IconMenuHandle>;
}
export function IconMenu<Value = unknown>({
  open: controlledOpen,
  defaultOpen,
  onOpenChange,
  trigger,
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
  classNames,
  ref,
  ...attributes
}: IconMenuProps<Value>) {
  const id = `toolbox-menu-${useId()}`;
  const node = useRef<HTMLDivElement>(null);
  const [internalOpen, setOpen] = useState(defaultOpen ?? false);
  const visible = controlledOpen ?? internalOpen;
  const setVisible = (next: boolean) => {
    if (controlledOpen === undefined) setOpen(next);
    if (next !== visible) onOpenChange?.(next);
  };
  const triggerId = trigger?.props.id ?? `${id}-trigger`;
  const Trigger = trigger ? Slot : IconButton;
  const initialFocus = useRef<'first' | 'last'>('first');
  useImperativeHandle(
    ref,
    () => ({
      open: () => setVisible(true),
      close: () => setVisible(false),
      get node() {
        return node.current;
      },
    }),
    [controlledOpen, visible, onOpenChange],
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
        classNames?.iconMenu,
        className,
      )}
    >
      <Trigger
        id={triggerId}
        aria-label={attributes['aria-label'] || (trigger ? undefined : 'More options')}
        aria-haspopup="menu"
        aria-expanded={visible}
        aria-controls={id}
        className={cn(iconClasses, classNames?.icon)}
        {...(trigger ? {} : { icon, inverse, ripple: iconRipple })}
        onClick={(event) => {
          onClick?.(event);
          if (event.defaultPrevented) return;
          // Safari does not focus buttons on pointer activation. Establish the
          // actual opener before Menu captures its focus-restoration target.
          if (!visible) event.currentTarget.focus({ preventScroll: true });
          initialFocus.current = 'first';
          setVisible(!visible);
        }}
        onKeyDown={(event) => {
          if (
            !event.defaultPrevented &&
            !event.nativeEvent.isComposing &&
            (event.key === 'ArrowDown' || event.key === 'ArrowUp')
          ) {
            event.preventDefault();
            initialFocus.current = event.key === 'ArrowUp' ? 'last' : 'first';
            setVisible(true);
          }
        }}
      >
        {trigger}
      </Trigger>
      <Menu
        id={id}
        aria-labelledby={triggerId}
        initialFocus={initialFocus.current}
        open={visible}
        onOpenChange={setVisible}
        onHide={onHide}
        onSelect={onSelect}
        onShow={onShow}
        position={position}
        ripple={menuRipple}
        selectable={selectable}
        selected={selected}
        classNames={classNames}
      >
        {children}
      </Menu>
    </div>
  );
}
export default IconMenu;
