'use client';
import './tokens.css';

import { materialRoot, materialDescendants } from '../foundations/styles/classes';

import type { HTMLAttributes, MouseEventHandler, ReactNode, Ref } from 'react';
import { cn } from '../foundations/styles/cn';
import Portal, { type PortalContainer } from '../foundations/portal/Portal';
import { usePortalTheme } from '../foundations/portal/usePortalTheme';
import usePresence from '../foundations/motion/usePresence';
import useMergedRefs from '../foundations/portal/useMergedRefs';
import { DrawerContent, DrawerOverlay, DrawerRoot } from './parts';

export interface DrawerCommonProps {
  active?: boolean;
  /** Cancel the default focus placement and focus a specific field instead. */
  onOpenAutoFocus?: (event: Event) => void;
  /** Cancel the default return focus, for example after deleting the opener. */
  onCloseAutoFocus?: (event: Event) => void;
  portalContainer?: PortalContainer;
  /** Override exit retention in milliseconds; by default it follows the surface animation. */
  delay?: number;
  insideTree?: boolean;
  onOverlayClick?: MouseEventHandler<HTMLDivElement>;
  onEscKeyDown?: (event: KeyboardEvent) => void;
  type?: 'left' | 'right';
  withOverlay?: boolean;
}
export interface DrawerProps extends HTMLAttributes<HTMLElement>, DrawerCommonProps {
  ref?: Ref<HTMLElement>;
}
export function Drawer({
  active = false,
  onOpenAutoFocus,
  onCloseAutoFocus,
  portalContainer,
  delay,
  children,
  className,
  insideTree = false,
  onOverlayClick,
  onEscKeyDown,
  type = 'left',
  withOverlay = true,
  ref,
  ...attributes
}: DrawerProps) {
  const { present, visible, motionRef } = usePresence<HTMLElement>(active, delay);
  const surfaceRef = useMergedRefs(ref, motionRef);
  const theme = usePortalTheme(attributes.style);
  if (!present) return null;
  const drawerClassName = cn(
    'data-[state=open]:animate-none data-[state=closed]:animate-none',
    'rt-drawer-drawer',
    'bg-(--drawer-background-color) [box-shadow:var(--shadow-16p)] text-(--drawer-text-color) block h-screen overflow-x-hidden overflow-y-auto pointer-events-none fixed top-0 transform-3d delay-[0s] w-(--drawer-mobile-width) max-w-[calc(100vw-var(--standard-increment-mobile))] [outline:none] will-change-transform',
    withOverlay
      ? '[transition:transform_var(--animation-duration-exit)_var(--animation-curve-fast-out-linear-in)]'
      : '[transition:transform_var(--animation-duration)_var(--animation-curve-default)]',
    materialRoot,
    materialDescendants,
    '[@media_screen_and_(min-width:_600px)]:w-(--drawer-desktop-width)',
    type === 'left'
      ? cn(
          'rt-drawer-left',
          '[.rt-drawer-drawer&]:[border-right:1px_solid_var(--drawer-border-color)] [.rt-drawer-drawer&]:left-0',
          '[.rt-drawer-drawer&:not(.rt-drawer-active)]:transform-[translateX(calc(-1*100%))]',
        )
      : type === 'right'
        ? cn(
            'rt-drawer-right',
            '[.rt-drawer-drawer&]:[border-left:1px_solid_var(--drawer-border-color)] [.rt-drawer-drawer&]:right-0',
            '[.rt-drawer-drawer&:not(.rt-drawer-active)]:transform-[translateX(100%)]',
          )
        : undefined,
    visible &&
      cn(
        'rt-drawer-active',
        '[.rt-drawer-drawer&]:[pointer-events:all] [.rt-drawer-drawer&]:transform-[translateX(0)] [.rt-drawer-drawer&]:delay-(--animation-delay)',
        withOverlay &&
          '[.rt-drawer-drawer&]:duration-(--animation-duration-enter) [.rt-drawer-drawer&]:ease-(--animation-curve-linear-out-slow-in)',
      ),
    className,
  );
  const wrapperClassName = cn('rt-drawer-wrapper', 'relative z-(--z-index-higher)');
  const place = (surface: ReactNode) =>
    insideTree ? (
      <div className={wrapperClassName}>{surface}</div>
    ) : (
      <Portal container={portalContainer} className={wrapperClassName}>
        {surface}
      </Portal>
    );
  if (!withOverlay)
    /** Permanent drawers are page content: a plain aside with the shared presentation, outside Radix's focus scope so Tab flows through the page. */
    return place(
      <aside
        {...attributes}
        {...theme}
        style={{ ...theme.style, ...attributes.style }}
        ref={surfaceRef}
        data-react-toolbox="drawer"
        data-side={type}
        className={drawerClassName}
        aria-hidden={!active || undefined}
        inert={!active || undefined}
      >
        {children}
      </aside>,
    );
  return (
    /* usePresence owns the delayed exit: parts stay force-mounted, so Radix keeps aria-hidden and scroll lock until unmount, then returns focus asynchronously. */
    <DrawerRoot open={active}>
      {place(
        <>
          <DrawerOverlay
            forceMount
            className={cn(
              'rt-overlay-overlay',
              'z-auto opacity-0 data-[state=open]:animate-none data-[state=closed]:animate-none [transition:opacity_var(--animation-duration-exit)_var(--animation-curve-fast-out-linear-in)]',
              visible &&
                'rt-overlay-active opacity-100 duration-(--animation-duration-enter) ease-(--animation-curve-linear-out-slow-in)',
            )}
            style={visible ? undefined : { pointerEvents: 'none' }}
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              onOverlayClick?.(event);
            }}
          />
          <DrawerContent
            asChild
            forceMount
            side={type}
            onOpenAutoFocus={onOpenAutoFocus}
            onCloseAutoFocus={onCloseAutoFocus}
            onEscapeKeyDown={(event) => {
              if (active) onEscKeyDown?.(event);
              event.preventDefault();
            }}
            {...attributes}
            data-react-toolbox="drawer"
            className={drawerClassName}
            role={attributes.role || 'dialog'}
            aria-modal
            aria-hidden={!active || undefined}
            inert={!active || undefined}
            tabIndex={-1}
          >
            <aside ref={surfaceRef}>{children}</aside>
          </DrawerContent>
        </>,
      )}
    </DrawerRoot>
  );
}
export default Drawer;
