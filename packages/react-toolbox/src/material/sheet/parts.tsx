'use client';
import '../drawer/tokens.css';
import '../overlay/tokens.css';

import { Drawer as Primitive } from 'vaul';
import type { ComponentProps } from 'react';
import { cn } from '../foundations/styles/cn';
import { usePortalTheme } from '../foundations/portal/usePortalTheme';
import { surfaceClasses } from '../foundations/styles/composition';

export type SheetRootProps = ComponentProps<typeof Primitive.Root>;
/** Gesture and snap-point behavior is opt-in; modal sheets still receive keyboard focus by default. */
export function SheetRoot({ autoFocus = true, ...props }: SheetRootProps) {
  return <Primitive.Root autoFocus={autoFocus} {...props} />;
}
export type SheetNestedRootProps = ComponentProps<typeof Primitive.NestedRoot>;
export function SheetNestedRoot({ autoFocus = true, ...props }: SheetNestedRootProps) {
  return <Primitive.NestedRoot autoFocus={autoFocus} {...props} />;
}
export type SheetTriggerProps = ComponentProps<typeof Primitive.Trigger>;
export function SheetTrigger(props: SheetTriggerProps) {
  return <Primitive.Trigger {...props} />;
}
export type SheetCloseProps = ComponentProps<typeof Primitive.Close>;
export function SheetClose(props: SheetCloseProps) {
  return <Primitive.Close {...props} />;
}
export type SheetPortalProps = ComponentProps<typeof Primitive.Portal>;
export function SheetPortal(props: SheetPortalProps) {
  return <Primitive.Portal {...props} />;
}

/** Vaul injects unlayered gesture styles; explicit overrides keep its motion on the Material tokens. */
const motionClasses =
  '[animation-duration:var(--animation-duration)]! [transition-duration:var(--animation-duration)]! [animation-timing-function:var(--animation-curve-default)]! [transition-timing-function:var(--animation-curve-default)]! motion-reduce:animate-none! motion-reduce:transition-none!';

export type SheetOverlayProps = ComponentProps<typeof Primitive.Overlay>;
export function SheetOverlay({ className, style, ...props }: SheetOverlayProps) {
  const theme = usePortalTheme();
  return (
    <Primitive.Overlay
      data-slot="SheetOverlay"
      {...props}
      {...theme}
      style={{ ...theme.style, ...style }}
      className={cn(
        'fixed inset-0 z-(--z-index-higher) bg-[rgb(from_var(--overlay-color)_r_g_b/var(--overlay-opacity))]',
        motionClasses,
        className,
      )}
    />
  );
}
export type SheetContentProps = ComponentProps<typeof Primitive.Content>;
export function SheetContent({ className, style, ...props }: SheetContentProps) {
  const theme = usePortalTheme();
  return (
    <Primitive.Content
      data-slot="SheetContent"
      {...props}
      {...theme}
      style={{ ...theme.style, ...style }}
      className={cn(
        surfaceClasses,
        'fixed z-(--z-index-higher) flex flex-col bg-(--drawer-background-color) text-(--drawer-text-color) rounded-none [box-shadow:var(--shadow-16p)]',
        'data-[vaul-drawer-direction=bottom]:inset-x-0 data-[vaul-drawer-direction=bottom]:bottom-0 data-[vaul-drawer-direction=bottom]:max-h-[calc(100dvh-var(--standard-increment-mobile))]',
        'data-[vaul-drawer-direction=top]:inset-x-0 data-[vaul-drawer-direction=top]:top-0 data-[vaul-drawer-direction=top]:max-h-[calc(100dvh-var(--standard-increment-mobile))]',
        'data-[vaul-drawer-direction=left]:inset-y-0 data-[vaul-drawer-direction=left]:left-0 data-[vaul-drawer-direction=left]:h-dvh data-[vaul-drawer-direction=left]:w-(--drawer-mobile-width) min-[600px]:data-[vaul-drawer-direction=left]:w-(--drawer-desktop-width) data-[vaul-drawer-direction=left]:max-w-[calc(100vw-var(--standard-increment-mobile))]',
        'data-[vaul-drawer-direction=right]:inset-y-0 data-[vaul-drawer-direction=right]:right-0 data-[vaul-drawer-direction=right]:h-dvh data-[vaul-drawer-direction=right]:w-(--drawer-mobile-width) min-[600px]:data-[vaul-drawer-direction=right]:w-(--drawer-desktop-width) data-[vaul-drawer-direction=right]:max-w-[calc(100vw-var(--standard-increment-mobile))]',
        'data-[vaul-snap-points=true]:data-[vaul-drawer-direction=bottom]:h-dvh data-[vaul-snap-points=true]:data-[vaul-drawer-direction=bottom]:max-h-dvh data-[vaul-snap-points=true]:data-[vaul-drawer-direction=top]:h-dvh data-[vaul-snap-points=true]:data-[vaul-drawer-direction=top]:max-h-dvh',
        'data-[vaul-snap-points=true]:data-[vaul-drawer-direction=left]:w-screen data-[vaul-snap-points=true]:data-[vaul-drawer-direction=left]:max-w-full data-[vaul-snap-points=true]:data-[vaul-drawer-direction=right]:w-screen data-[vaul-snap-points=true]:data-[vaul-drawer-direction=right]:max-w-full',
        motionClasses,
        className,
      )}
    />
  );
}
export type SheetTitleProps = ComponentProps<typeof Primitive.Title>;
export function SheetTitle({ className, ...props }: SheetTitleProps) {
  return (
    <Primitive.Title
      data-slot="SheetTitle"
      {...props}
      className={cn('m-0 text-[20px] leading-[28px] font-medium', className)}
    />
  );
}
export type SheetDescriptionProps = ComponentProps<typeof Primitive.Description>;
export function SheetDescription({ className, ...props }: SheetDescriptionProps) {
  return (
    <Primitive.Description
      data-slot="SheetDescription"
      {...props}
      className={cn('m-0 text-[14px] leading-[20px] text-(--rt-color-text-secondary)', className)}
    />
  );
}
export type SheetHandleProps = ComponentProps<typeof Primitive.Handle>;
/** A pointer drag target; include a SheetClose or explicit snap controls for keyboard users. */
export function SheetHandle({ className, ...props }: SheetHandleProps) {
  return (
    <Primitive.Handle
      data-slot="SheetHandle"
      {...props}
      className={cn(
        'mx-auto my-[16px] h-[4px]! w-[32px] shrink-0 rounded-full bg-(--rt-color-text-secondary)!',
        className,
      )}
    />
  );
}
