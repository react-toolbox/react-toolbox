'use client';

import { materialRoot, materialDescendants } from '../foundations/styles/classes';
import { iconClasses } from './styles';

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
import { rippleWrapperClasses } from '../button/styles';
import { useRipple } from '../ripple';
import { Slot } from '@radix-ui/react-slot';
import { MenuSurface, type MenuProps, type MenuPosition } from './Menu';

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
  ref,
  ...attributes
}: IconMenuProps<Value>) {
  const id = `toolbox-menu-${useId()}`;
  const node = useRef<HTMLDivElement>(null);
  const touchPress = useRef<{ pointerId: number; x: number; y: number } | null>(null);
  const touchTrigger = useRef<HTMLElement | null>(null);
  const [internalOpen, setOpen] = useState(defaultOpen ?? false);
  const visible = controlledOpen ?? internalOpen;
  const setVisible = (next: boolean) => {
    if (controlledOpen === undefined) setOpen(next);
    if (next !== visible) onOpenChange?.(next);
  };
  const triggerId = trigger?.props.id ?? `${id}-trigger`;
  const Trigger = trigger ? Slot : IconButton;
  const ink = useRipple({
    centered: true,
    ripple: !trigger && iconRipple,
    wrapperClassName: rippleWrapperClasses,
  });
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
      onClickCapture={(event) => {
        /** Touch release dispatches the click itself; some browsers also send a later native click. */
        if (
          event.isTrusted &&
          event.detail > 0 &&
          event.target instanceof Node &&
          touchTrigger.current?.contains(event.target)
        ) {
          event.preventDefault();
          event.stopPropagation();
          return;
        }
        attributes.onClickCapture?.(event);
      }}
      className={cn(
        'rt-menu-iconMenu',
        'inline-block relative text-center',
        materialRoot,
        materialDescendants,
        className,
      )}
    >
      <MenuSurface
        trigger={
          <Trigger
            id={triggerId}
            aria-label={attributes['aria-label'] || (trigger ? undefined : 'More options')}
            className={iconClasses}
            {...(trigger ? {} : { icon, inverse, ripple: false })}
            onPointerDown={(event) => {
              touchTrigger.current = event.pointerType === 'touch' ? event.currentTarget : null;
              touchPress.current = null;
              if (event.defaultPrevented) return;
              if (event.pointerType === 'touch' && event.isPrimary && event.button === 0)
                touchPress.current = { pointerId: event.pointerId, x: event.clientX, y: event.clientY };
              /** Popup triggers suppress compatibility mousedown; start the shared ink first. */
              if (event.pointerType !== 'touch') ink.onMouseDown(event);
              event.preventDefault();
            }}
            onPointerMove={(event) => {
              const press = touchPress.current;
              if (
                press?.pointerId === event.pointerId &&
                (event.defaultPrevented || Math.hypot(event.clientX - press.x, event.clientY - press.y) > 10)
              )
                touchPress.current = null;
            }}
            onPointerUp={(event) => {
              const press = touchPress.current;
              if (press?.pointerId !== event.pointerId) return;
              touchPress.current = null;
              if (event.defaultPrevented || Math.hypot(event.clientX - press.x, event.clientY - press.y) > 10) return;
              const hit = document.elementFromPoint(event.clientX, event.clientY);
              /** WebKit suppresses the native touch click after the cancelled pointerdown. */
              if (hit && event.currentTarget.contains(hit)) event.currentTarget.click();
            }}
            onPointerCancel={() => {
              touchPress.current = null;
            }}
            onContextMenu={() => {
              touchPress.current = null;
            }}
            onTouchStart={ink.onTouchStart}
            onTouchEnd={ink.onTouchEnd}
            onTouchCancel={ink.onTouchCancel}
            onKeyDown={(event) => {
              touchTrigger.current = null;
              if (!event.defaultPrevented && (event.key === 'Enter' || event.key === ' ')) {
                event.preventDefault();
                event.currentTarget.click();
              }
            }}
            onClick={(event) => {
              onClick?.(event);
              if (!event.defaultPrevented) setVisible(!visible);
            }}
          >
            {trigger ?? ink.ripple}
          </Trigger>
        }
        id={id}
        aria-labelledby={triggerId}
        open={visible}
        onOpenChange={setVisible}
        onHide={onHide}
        onSelect={onSelect}
        onShow={onShow}
        position={position}
        ripple={menuRipple}
        selectable={selectable}
        selected={selected}
      >
        {children}
      </MenuSurface>
    </div>
  );
}
export default IconMenu;
