'use client';
import './tokens.css';
import '../overlay/tokens.css';
import * as Primitive from '@radix-ui/react-dialog';
import type { ComponentProps } from 'react';
import { cn } from '../foundations/styles/cn';
import { usePortalTheme } from '../foundations/portal/usePortalTheme';
import { surfaceClasses } from '../foundations/styles/composition';
export type DrawerRootProps = ComponentProps<typeof Primitive.Root>;
export function DrawerRoot(props: DrawerRootProps) {
  return <Primitive.Root {...props} />;
}
export type DrawerTriggerProps = ComponentProps<typeof Primitive.Trigger>;
export function DrawerTrigger(props: DrawerTriggerProps) {
  return <Primitive.Trigger {...props} />;
}
export type DrawerCloseProps = ComponentProps<typeof Primitive.Close>;
export function DrawerClose(props: DrawerCloseProps) {
  return <Primitive.Close {...props} />;
}
export type DrawerPortalProps = ComponentProps<typeof Primitive.Portal>;
export function DrawerPortal(props: DrawerPortalProps) {
  return <Primitive.Portal {...props} />;
}
export type DrawerOverlayProps = ComponentProps<typeof Primitive.Overlay>;
export function DrawerOverlay({ className, style, ...props }: DrawerOverlayProps) {
  const theme = usePortalTheme();
  return (
    <Primitive.Overlay
      data-slot="DrawerOverlay"
      {...props}
      {...theme}
      style={{ ...theme.style, ...style }}
      className={cn(
        'fixed inset-0 z-(--z-index-higher) bg-[rgb(from_var(--overlay-color)_r_g_b/var(--overlay-opacity))] data-[state=open]:animate-[toolbox-fade-in_var(--animation-duration)_var(--animation-curve-default)] data-[state=closed]:animate-[toolbox-fade-out_var(--animation-duration)_var(--animation-curve-default)] motion-reduce:animate-none!',
        className,
      )}
    />
  );
}
export type DrawerContentProps = ComponentProps<typeof Primitive.Content> & {
  side?: 'left' | 'right' | 'top' | 'bottom';
};
export function DrawerContent({ side = 'left', className, style, ...props }: DrawerContentProps) {
  const theme = usePortalTheme();
  return (
    <Primitive.Content
      data-slot="DrawerContent"
      data-side={side}
      {...props}
      {...theme}
      style={{ ...theme.style, ...style }}
      className={cn(
        surfaceClasses,
        'bg-(--drawer-background-color) text-(--drawer-text-color) fixed z-(--z-index-higher) flex flex-col overflow-y-auto rounded-none [box-shadow:var(--shadow-16p)] data-[state=open]:animate-[toolbox-drawer-in_var(--animation-duration)_var(--animation-curve-linear-out-slow-in)] data-[state=closed]:animate-[toolbox-drawer-out_var(--animation-duration)_var(--animation-curve-fast-out-linear-in)] motion-reduce:animate-none!',
        (side === 'left' || side === 'right') &&
          'inset-y-0 h-dvh w-(--drawer-mobile-width) min-[600px]:w-(--drawer-desktop-width) max-w-[calc(100vw-var(--standard-increment-mobile))]',
        (side === 'top' || side === 'bottom') && 'inset-x-0 max-h-[calc(100dvh-var(--standard-increment-mobile))]',
        side === 'left' && 'left-0 [--drawer-offset-x:-100%] [--drawer-offset-y:0]',
        side === 'right' && 'right-0 [--drawer-offset-x:100%] [--drawer-offset-y:0]',
        side === 'top' && 'top-0 [--drawer-offset-x:0] [--drawer-offset-y:-100%]',
        side === 'bottom' && 'bottom-0 [--drawer-offset-x:0] [--drawer-offset-y:100%]',
        className,
      )}
    />
  );
}
export type DrawerTitleProps = ComponentProps<typeof Primitive.Title>;
export function DrawerTitle({ className, ...props }: DrawerTitleProps) {
  return (
    <Primitive.Title
      data-slot="DrawerTitle"
      {...props}
      className={cn('m-0 text-[20px] leading-[28px] font-medium', className)}
    />
  );
}
export type DrawerDescriptionProps = ComponentProps<typeof Primitive.Description>;
export function DrawerDescription({ className, ...props }: DrawerDescriptionProps) {
  return (
    <Primitive.Description
      data-slot="DrawerDescription"
      {...props}
      className={cn('m-0 text-[14px] leading-[20px] text-(--rt-color-text-secondary)', className)}
    />
  );
}
