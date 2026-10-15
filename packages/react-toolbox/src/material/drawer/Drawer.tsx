'use client';
import { mergeStyleSlots } from '../foundations/styles/slots';

import { materialRoot, materialDescendants } from '../foundations/styles/classes';
import type { DrawerTheme } from './types';

import type { HTMLAttributes, MouseEventHandler, Ref } from 'react';
import { cn } from '../foundations/styles/cn';
import Portal from '../foundations/portal/Portal';
import usePresence from '../foundations/motion/usePresence';
import useMergedRefs from '../foundations/portal/useMergedRefs';
import Overlay from '../overlay';
import useModalFocus from '../overlay/useModalFocus';

export type { DrawerTheme, DrawerClassNames } from './types';
export interface DrawerCommonProps {
  active?: boolean;
  delay?: number;
  insideTree?: boolean;
  onOverlayClick?: MouseEventHandler<HTMLDivElement>;
  onEscKeyDown?: (event: KeyboardEvent) => void;
  type?: 'left' | 'right';
  withOverlay?: boolean;
}
export interface DrawerProps extends HTMLAttributes<HTMLElement>, DrawerCommonProps {
  /** Classes for the component's rendered parts. Applied after legacy theme overrides. */
  classNames?: DrawerTheme;
  /** @deprecated Use classNames for style slots; use ThemeProvider for design tokens. */
  theme?: DrawerTheme;
  ref?: Ref<HTMLElement>;
}
export function Drawer({
  active = false,
  delay = 500,
  children,
  className,
  insideTree = false,
  onOverlayClick,
  onEscKeyDown,
  theme: legacyTheme,
  classNames,
  type = 'left',
  withOverlay = true,
  ref,
  ...attributes
}: DrawerProps) {
  const theme = mergeStyleSlots(legacyTheme, classNames);
  const { present, visible } = usePresence(active, delay);
  const focusRef = useModalFocus(visible && withOverlay);
  const drawerRef = useMergedRefs(focusRef, ref);
  if (!present) return null;
  const content = (
    <>
      {withOverlay && <Overlay active={visible} onClick={onOverlayClick} onEscKeyDown={onEscKeyDown} />}
      <aside
        {...attributes}
        ref={drawerRef}
        data-react-toolbox="drawer"
        className={cn(
          'rt-drawer-drawer',
          'bg-(--drawer-background-color) [box-shadow:var(--shadow-16p)] text-(--drawer-text-color) block h-screen overflow-x-hidden overflow-y-auto pointer-events-none fixed top-0 transform-3d [transition:transform_var(--animation-duration)_var(--animation-curve-default)] delay-[0s] w-(--drawer-mobile-width) max-w-[calc(100vw-var(--standard-increment-mobile))] [outline:none] will-change-transform',
          materialRoot,
          materialDescendants,
          '[@media_screen_and_(min-width:_600px)]:w-(--drawer-desktop-width)',
          theme?.drawer,
          type === 'left'
            ? cn(
                'rt-drawer-left',
                '[.rt-drawer-drawer&]:[border-right:1px_solid_var(--drawer-border-color)] [.rt-drawer-drawer&]:left-0',
                '[.rt-drawer-drawer&:not(.rt-drawer-active)]:transform-[translateX(calc(-1*100%))]',
                theme?.left,
              )
            : type === 'right'
              ? cn(
                  'rt-drawer-right',
                  '[.rt-drawer-drawer&]:[border-left:1px_solid_var(--drawer-border-color)] [.rt-drawer-drawer&]:right-0',
                  '[.rt-drawer-drawer&:not(.rt-drawer-active)]:transform-[translateX(100%)]',
                  theme?.right,
                )
              : undefined,
          visible &&
            cn(
              'rt-drawer-active',
              '[.rt-drawer-drawer&]:[pointer-events:all] [.rt-drawer-drawer&]:transform-[translateX(0)] [.rt-drawer-drawer&]:delay-(--animation-delay)',
              theme?.active,
            ),
          className,
        )}
        role={attributes.role || (withOverlay ? 'dialog' : undefined)}
        aria-modal={withOverlay ? true : undefined}
        aria-hidden={!visible || undefined}
        inert={!visible || undefined}
        tabIndex={withOverlay ? -1 : attributes.tabIndex}
      >
        {children}
      </aside>
    </>
  );
  return insideTree ? (
    <div className={cn('rt-drawer-wrapper', 'relative z-(--z-index-higher)', theme?.wrapper)}>{content}</div>
  ) : (
    <Portal className={cn('rt-drawer-wrapper', 'relative z-(--z-index-higher)', theme?.wrapper)}>{content}</Portal>
  );
}
export default Drawer;
