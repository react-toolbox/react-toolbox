'use client';
import * as Primitive from '@radix-ui/react-dialog';
import type { ComponentProps } from 'react';
import { cn } from '../foundations/styles/cn';
import { usePortalTheme } from '../foundations/portal/usePortalTheme';
import { surfaceClasses } from '../foundations/styles/composition';
export type DialogRootProps = ComponentProps<typeof Primitive.Root>;
export function DialogRoot(props: DialogRootProps) {
  return <Primitive.Root {...props} />;
}
export type DialogPortalProps = ComponentProps<typeof Primitive.Portal>;
export function DialogPortal(props: DialogPortalProps) {
  return <Primitive.Portal {...props} />;
}
export type DialogTriggerProps = ComponentProps<typeof Primitive.Trigger>;
export function DialogTrigger(props: DialogTriggerProps) {
  return <Primitive.Trigger {...props} />;
}
export type DialogCloseProps = ComponentProps<typeof Primitive.Close>;
export function DialogClose(props: DialogCloseProps) {
  return <Primitive.Close {...props} />;
}
export type DialogOverlayProps = ComponentProps<typeof Primitive.Overlay>;
export function DialogOverlay({ className, style, ...props }: DialogOverlayProps) {
  const theme = usePortalTheme();
  return (
    <Primitive.Overlay
      data-slot="DialogOverlay"
      {...props}
      {...theme}
      style={{ ...theme.style, ...style }}
      className={cn(
        'fixed inset-0 z-300 bg-[rgb(from_var(--overlay-color)_r_g_b/var(--overlay-opacity))] data-[state=open]:animate-[toolbox-fade-in_var(--animation-duration)_var(--animation-curve-default)] data-[state=closed]:animate-[toolbox-fade-out_var(--animation-duration)_var(--animation-curve-default)] motion-reduce:animate-none!',
        className,
      )}
    />
  );
}
export type DialogContentProps = ComponentProps<typeof Primitive.Content>;
export function DialogContent({ className, style, ...props }: DialogContentProps) {
  const theme = usePortalTheme();
  return (
    <Primitive.Content
      data-slot="DialogContent"
      {...props}
      {...theme}
      style={{ ...theme.style, ...style }}
      className={cn(
        surfaceClasses,
        'fixed left-1/2 top-1/2 z-301 flex w-[560px] max-w-[calc(100vw-48px)] max-h-[calc(100dvh-48px)] -translate-x-1/2 -translate-y-1/2 flex-col [box-shadow:var(--zdepth-shadow-5)] data-[state=open]:animate-[toolbox-enter_var(--animation-duration)_var(--animation-curve-linear-out-slow-in)] data-[state=closed]:animate-[toolbox-exit_var(--animation-duration)_var(--animation-curve-fast-out-linear-in)] motion-reduce:animate-none!',
        className,
      )}
    />
  );
}
export type DialogTitleProps = ComponentProps<typeof Primitive.Title>;
export function DialogTitle({ className, ...props }: DialogTitleProps) {
  return (
    <Primitive.Title
      data-slot="DialogTitle"
      {...props}
      className={cn('m-0 text-[20px] leading-[28px] font-medium text-(--rt-color-text)', className)}
    />
  );
}
export type DialogDescriptionProps = ComponentProps<typeof Primitive.Description>;
export function DialogDescription({ className, ...props }: DialogDescriptionProps) {
  return (
    <Primitive.Description
      data-slot="DialogDescription"
      {...props}
      className={cn('m-0 text-[16px] leading-[24px] text-(--rt-color-text-secondary)', className)}
    />
  );
}
export type DialogBodyProps = ComponentProps<'div'>;
export function DialogBody({ className, ...props }: DialogBodyProps) {
  return (
    <div
      data-slot="DialogBody"
      {...props}
      className={cn('min-h-0 overflow-y-auto p-[24px] text-[16px] leading-[24px]', className)}
    />
  );
}
export type DialogFooterProps = ComponentProps<'div'>;
export function DialogFooter({ className, ...props }: DialogFooterProps) {
  return (
    <div
      data-slot="DialogFooter"
      {...props}
      className={cn('flex shrink-0 flex-wrap items-center justify-end gap-[8px] p-[8px]', className)}
    />
  );
}
