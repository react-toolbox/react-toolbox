'use client';
import './tokens.css';

import {
  cloneElement,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  type HTMLAttributes,
  type KeyboardEvent,
  type ReactElement,
  type Ref,
} from 'react';
import { cn } from '../foundations/styles/cn';
import { MenuContext } from './context';
import { DropdownMenuRoot, DropdownMenuTrigger, DropdownMenuContent } from './parts';

export type MenuPosition = 'auto' | 'static' | 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';
export interface MenuHandle {
  show(): void;
  hide(): void;
  readonly node: HTMLDivElement | null;
}
export interface MenuProps<Value = unknown> extends Omit<HTMLAttributes<HTMLDivElement>, 'onSelect' | 'onKeyDown'> {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  initialFocus?: 'first' | 'last';
  onHide?: () => void;
  onSelect?: (value: Value | undefined) => void;
  onShow?: () => void;
  onKeyDown?: (event: KeyboardEvent<HTMLUListElement>) => void;
  outline?: boolean;
  position?: MenuPosition;
  ripple?: boolean;
  selectable?: boolean;
  selected?: Value;
  ref?: Ref<MenuHandle>;
}

/** The IconMenu adapter supplies its real trigger; standalone menus retain an imperative anchor. */
export function MenuSurface<Value = unknown>({
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  children,
  className,
  initialFocus = 'first',
  onHide,
  onSelect,
  onShow,
  onKeyDown,
  outline = true,
  position = 'static',
  ripple = true,
  selectable = true,
  selected,
  ref,
  style,
  trigger,
  ...attributes
}: MenuProps<Value> & { trigger?: ReactElement<HTMLAttributes<HTMLElement>> }) {
  const root = useRef<HTMLDivElement>(null);
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const visible = controlledOpen ?? internalOpen;
  const isStatic = position === 'static';
  const current = useRef({ controlledOpen, visible, onOpenChange, onHide, onShow });
  current.current = { controlledOpen, visible, onOpenChange, onHide, onShow };
  const setVisible = useCallback((open: boolean) => {
    if (current.current.controlledOpen === undefined) setInternalOpen(open);
    if (current.current.visible !== open) current.current.onOpenChange?.(open);
  }, []);
  useImperativeHandle(
    ref,
    () => ({
      show: () => setVisible(true),
      hide: () => setVisible(false),
      get node() {
        return root.current;
      },
    }),
    [setVisible],
  );
  const previousVisible = useRef(visible);
  useEffect(() => {
    if (previousVisible.current === visible) return;
    previousVisible.current = visible;
    if (visible) current.current.onShow?.();
    else current.current.onHide?.();
  }, [visible]);
  const previousFocus = useRef<HTMLElement | null>(null);
  const align = position.endsWith('Right') ? 'end' : 'start';
  const side = position.startsWith('bottom') ? 'top' : 'bottom';
  return (
    <DropdownMenuRoot open={isStatic || visible} onOpenChange={isStatic ? undefined : setVisible} modal={false}>
      <div
        {...attributes}
        id={undefined}
        ref={root}
        data-react-toolbox="menu"
        style={style}
        className={cn(
          'rt-menu-menu inline-block relative',
          isStatic && 'rt-menu-static [&_[data-radix-popper-content-wrapper]]:contents!',
          visible && 'rt-menu-active',
          !isStatic && position !== 'auto' && cn(`rt-menu-${position}`),
          className,
        )}
      >
        <DropdownMenuTrigger asChild>
          {trigger ? (
            cloneElement(trigger, attributes.id ? { 'aria-controls': visible ? attributes.id : undefined } : {})
          ) : (
            <span aria-hidden="true" tabIndex={-1} className="pointer-events-none absolute inset-0" />
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent
          asChild
          side={side}
          align={align}
          sideOffset={0}
          collisionPadding={24}
          loop
          onOpenAutoFocus={(event) => {
            previousFocus.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
            if (isStatic) event.preventDefault();
            else if (initialFocus === 'last') {
              const items = root.current?.querySelectorAll<HTMLElement>(
                '[data-react-toolbox="menu-item"]:not([aria-disabled="true"]):not([hidden])',
              );
              const last = items?.[items.length - 1];
              if (last) {
                event.preventDefault();
                last.focus();
              }
            }
          }}
          onCloseAutoFocus={
            trigger
              ? undefined
              : (event) => {
                  event.preventDefault();
                  if (
                    previousFocus.current?.isConnected &&
                    (document.activeElement === document.body || root.current?.contains(document.activeElement))
                  )
                    previousFocus.current.focus({ preventScroll: true });
                }
          }
          onEscapeKeyDown={
            isStatic
              ? (event) => {
                  event.preventDefault();
                  setVisible(false);
                }
              : undefined
          }
          onInteractOutside={
            isStatic
              ? (event) => {
                  event.preventDefault();
                  setVisible(false);
                }
              : undefined
          }
          className={cn(
            'relative p-0 max-h-none overflow-visible [box-shadow:none] bg-transparent rounded-none',
            isStatic && 'visible! animate-none!',
          )}
        >
          <div
            {...(attributes.id ? { id: attributes.id } : {})}
            aria-label={attributes['aria-label']}
            aria-labelledby={attributes['aria-labelledby']}
          >
            <ul
              role="presentation"
              onKeyDown={(event) => {
                onKeyDown?.(event);
                /** An inline menu participates in page tab order, unlike a popup menu. */
                if (isStatic && event.key === 'Tab') event.stopPropagation();
              }}
              className={cn(
                'rt-menu-menuInner relative m-0 block list-none p-(--menu-padding) text-left whitespace-nowrap overflow-y-auto',
                isStatic ? 'max-h-[calc(100vh-var(--menu-item-height))]' : 'max-h-(--radix-popper-available-height)',
                outline &&
                  'rt-menu-outline rounded-(--menu-outline-border-radius) bg-(--menu-background-color) [box-shadow:var(--shadow-8p)]',
              )}
            >
              <MenuContext
                value={{
                  isStatic,
                  ripple,
                  selectable,
                  selected,
                  select: (value) => onSelect?.(value as Value | undefined),
                }}
              >
                {children}
              </MenuContext>
            </ul>
          </div>
        </DropdownMenuContent>
      </div>
    </DropdownMenuRoot>
  );
}
export function Menu<Value = unknown>(props: MenuProps<Value>) {
  return <MenuSurface {...props} />;
}
export default Menu;
