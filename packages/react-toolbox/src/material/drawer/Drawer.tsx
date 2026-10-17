'use client';
import './tokens.css';

import { materialRoot, materialDescendants } from '../foundations/styles/classes';
import type { DrawerClassNames } from './types';

import type { HTMLAttributes, MouseEventHandler, Ref } from 'react';
import { cn } from '../foundations/styles/cn';
import Portal, { type PortalContainer } from '../foundations/portal/Portal';
import usePresence from '../foundations/motion/usePresence';
import Overlay from '../overlay';
import { ModalSurface } from '../overlay/ModalSurface';

export type { DrawerClassNames } from './types';
export interface DrawerCommonProps {
  active?: boolean;
  /** Cancel the default focus placement and focus a specific field instead. */
  onOpenAutoFocus?: (event: Event) => void;
  /** Cancel the default return focus, for example after deleting the opener. */
  onCloseAutoFocus?: (event: Event) => void;
  portalContainer?: PortalContainer;
  delay?: number;
  insideTree?: boolean;
  onOverlayClick?: MouseEventHandler<HTMLDivElement>;
  onEscKeyDown?: (event: KeyboardEvent) => void;
  type?: 'left' | 'right';
  withOverlay?: boolean;
}
export interface DrawerProps extends HTMLAttributes<HTMLElement>, DrawerCommonProps {
  /** Classes for the component's rendered parts. */
  classNames?: DrawerClassNames;
  ref?: Ref<HTMLElement>;
}
export function Drawer({
  active = false,
  onOpenAutoFocus,
  onCloseAutoFocus,
  portalContainer,
  delay = 500,
  children,
  className,
  insideTree = false,
  onOverlayClick,
  onEscKeyDown,
  classNames,
  type = 'left',
  withOverlay = true,
  ref,
  ...attributes
}: DrawerProps) {
  const { present, visible } = usePresence(active, delay);
  if (!present) return null;
  const content = (
    <>
      {withOverlay && <Overlay active={visible} lockScroll={false} onClick={onOverlayClick} />}
      <ModalSurface
        active={active && withOverlay}
        onOpenAutoFocus={onOpenAutoFocus}
        onCloseAutoFocus={onCloseAutoFocus}
        onEscKeyDown={onEscKeyDown}
      >
        <aside
          {...attributes}
          ref={ref}
          data-react-toolbox="drawer"
          className={cn(
            'rt-drawer-drawer',
            'bg-(--drawer-background-color) [box-shadow:var(--shadow-16p)] text-(--drawer-text-color) block h-screen overflow-x-hidden overflow-y-auto pointer-events-none fixed top-0 transform-3d [transition:transform_var(--animation-duration)_var(--animation-curve-default)] delay-[0s] w-(--drawer-mobile-width) max-w-[calc(100vw-var(--standard-increment-mobile))] [outline:none] will-change-transform',
            materialRoot,
            materialDescendants,
            '[@media_screen_and_(min-width:_600px)]:w-(--drawer-desktop-width)',
            classNames?.drawer,
            type === 'left'
              ? cn(
                  'rt-drawer-left',
                  '[.rt-drawer-drawer&]:[border-right:1px_solid_var(--drawer-border-color)] [.rt-drawer-drawer&]:left-0',
                  '[.rt-drawer-drawer&:not(.rt-drawer-active)]:transform-[translateX(calc(-1*100%))]',
                  classNames?.left,
                )
              : type === 'right'
                ? cn(
                    'rt-drawer-right',
                    '[.rt-drawer-drawer&]:[border-left:1px_solid_var(--drawer-border-color)] [.rt-drawer-drawer&]:right-0',
                    '[.rt-drawer-drawer&:not(.rt-drawer-active)]:transform-[translateX(100%)]',
                    classNames?.right,
                  )
                : undefined,
            visible &&
              cn(
                'rt-drawer-active',
                '[.rt-drawer-drawer&]:[pointer-events:all] [.rt-drawer-drawer&]:transform-[translateX(0)] [.rt-drawer-drawer&]:delay-(--animation-delay)',
                classNames?.active,
              ),
            className,
          )}
          role={attributes.role || (withOverlay ? 'dialog' : undefined)}
          aria-modal={withOverlay ? true : undefined}
          aria-hidden={!active || undefined}
          inert={!active || undefined}
          tabIndex={withOverlay ? -1 : attributes.tabIndex}
        >
          {children}
        </aside>
      </ModalSurface>
    </>
  );
  return insideTree ? (
    <div className={cn('rt-drawer-wrapper', 'relative z-(--z-index-higher)', classNames?.wrapper)}>{content}</div>
  ) : (
    <Portal
      container={portalContainer}
      className={cn('rt-drawer-wrapper', 'relative z-(--z-index-higher)', classNames?.wrapper)}
    >
      {content}
    </Portal>
  );
}
export default Drawer;
