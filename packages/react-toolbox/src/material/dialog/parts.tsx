'use client';
import './tokens.css';
import { titleClasses, descriptionClasses } from './styles';
import '../overlay/tokens.css';
import * as Primitive from '@radix-ui/react-dialog';
import { useContext, type ComponentProps } from 'react';
import { cn } from '../foundations/styles/cn';
import { usePortalTheme } from '../foundations/portal/usePortalTheme';
import {
  ReturnFocusModal,
  ReturnFocusParent,
  ReturnFocusParentMounted,
  useReturnFocus,
} from '../foundations/portal/useReturnFocus';
import useMergedRefs from '../foundations/portal/useMergedRefs';
import { surfaceClasses } from '../foundations/styles/composition';
export type DialogRootProps = ComponentProps<typeof Primitive.Root>;
/** Publishes the effective modal mode so content only adds fallback return focus to modal roots. */
export function DialogRoot({ modal = true, ...props }: DialogRootProps) {
  const parentMounted = useContext(ReturnFocusParentMounted);
  if (!parentMounted && (props.open ?? props.defaultOpen)) return null;
  return (
    <ReturnFocusModal value={modal}>
      <Primitive.Root modal={modal} {...props} />
    </ReturnFocusModal>
  );
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
        'fixed inset-0 z-(--z-index-higher) bg-[rgb(from_var(--overlay-color)_r_g_b/var(--overlay-opacity))] data-[state=open]:animate-[toolbox-fade-in_var(--animation-duration)_var(--animation-curve-default)] data-[state=closed]:animate-[toolbox-fade-out_var(--animation-duration)_var(--animation-curve-default)] motion-reduce:animate-none!',
        className,
      )}
    />
  );
}
export type DialogContentProps = ComponentProps<typeof Primitive.Content>;
export function DialogContent({ className, style, onCloseAutoFocus, ref, ...props }: DialogContentProps) {
  const theme = usePortalTheme();
  const { node, handleCloseAutoFocus, mounted } = useReturnFocus(onCloseAutoFocus);
  return (
    <ReturnFocusParent value={node}>
      <ReturnFocusParentMounted value={mounted}>
        <Primitive.Content
          data-slot="DialogContent"
          {...props}
          ref={useMergedRefs(ref, node)}
          onCloseAutoFocus={handleCloseAutoFocus}
          {...theme}
          style={{ ...theme.style, ...style }}
          className={cn(
            surfaceClasses,
            'bg-(--dialog-color-white) text-(--dialog-color-text) rounded-(--dialog-border-radius) fixed left-1/2 top-1/2 z-(--z-index-higher) flex w-[560px] max-w-[calc(100vw-48px)] max-h-[calc(100dvh-48px)] -translate-x-1/2 -translate-y-1/2 flex-col [box-shadow:var(--zdepth-shadow-5)] data-[state=open]:animate-[toolbox-enter_var(--animation-duration)_var(--animation-curve-linear-out-slow-in)] data-[state=closed]:animate-[toolbox-exit_var(--animation-duration)_var(--animation-curve-fast-out-linear-in)] motion-reduce:animate-none!',
            className,
          )}
        />
      </ReturnFocusParentMounted>
    </ReturnFocusParent>
  );
}
export type DialogTitleProps = ComponentProps<typeof Primitive.Title>;
export function DialogTitle({ className, ...props }: DialogTitleProps) {
  return <Primitive.Title data-slot="DialogTitle" {...props} className={cn('m-0', titleClasses, className)} />;
}
export type DialogDescriptionProps = ComponentProps<typeof Primitive.Description>;
export function DialogDescription({ className, ...props }: DialogDescriptionProps) {
  return (
    <Primitive.Description
      data-slot="DialogDescription"
      {...props}
      className={cn('m-0', descriptionClasses, className)}
    />
  );
}
export type DialogBodyProps = ComponentProps<'div'>;
export function DialogBody({ className, ...props }: DialogBodyProps) {
  return (
    <div
      data-slot="DialogBody"
      {...props}
      className={cn('min-h-0 overflow-y-auto p-(--dialog-content-padding)', descriptionClasses, className)}
    />
  );
}
export type DialogFooterProps = ComponentProps<'div'>;
export function DialogFooter({ className, ...props }: DialogFooterProps) {
  return (
    <div
      data-slot="DialogFooter"
      {...props}
      className={cn(
        'flex shrink-0 flex-wrap items-center justify-end gap-(--dialog-navigation-padding) p-(--dialog-navigation-padding)',
        className,
      )}
    />
  );
}
