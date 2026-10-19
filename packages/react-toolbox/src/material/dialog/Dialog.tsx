'use client';
import './tokens.css';
import { descriptionClasses } from './styles';

import { materialRoot, materialDescendants } from '../foundations/styles/classes';

import { useId, type HTMLAttributes, type MouseEventHandler, type ReactNode, type Ref } from 'react';
import { cn } from '../foundations/styles/cn';
import Portal, { type PortalContainer } from '../foundations/portal/Portal';
import usePresence from '../foundations/motion/usePresence';
import useMergedRefs from '../foundations/portal/useMergedRefs';
import { Button, type ButtonProps } from '../button';
import { DialogContent, DialogOverlay, DialogRoot, DialogTitle } from './parts';

export type DialogActionProps = ButtonProps;
export interface DialogProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  actions?: DialogActionProps[];
  active?: boolean;
  /** Cancel the default focus placement and focus a specific field instead. */
  onOpenAutoFocus?: (event: Event) => void;
  /** Cancel the default return focus, for example after deleting the opener. */
  onCloseAutoFocus?: (event: Event) => void;
  portalContainer?: PortalContainer;
  /** Override exit retention in milliseconds; by default it follows the surface animation. */
  delay?: number;
  onEscKeyDown?: (event: KeyboardEvent) => void;
  onOverlayClick?: MouseEventHandler<HTMLDivElement>;
  onOverlayMouseDown?: MouseEventHandler<HTMLDivElement>;
  onOverlayMouseMove?: MouseEventHandler<HTMLDivElement>;
  onOverlayMouseUp?: MouseEventHandler<HTMLDivElement>;
  title?: ReactNode;
  type?: 'small' | 'normal' | 'large' | 'fullscreen' | 'custom';
  ref?: Ref<HTMLDivElement>;
}
export function Dialog({
  actions = [],
  active = false,
  onOpenAutoFocus,
  onCloseAutoFocus,
  portalContainer,
  delay,
  type = 'normal',
  children,
  className,
  onEscKeyDown,
  onOverlayClick,
  onOverlayMouseDown,
  onOverlayMouseMove,
  onOverlayMouseUp,
  title,
  ref,
  ...attributes
}: DialogProps) {
  const titleId = useId();
  const { present, visible, motionRef } = usePresence<HTMLDivElement>(active, delay);
  const surfaceRef = useMergedRefs(ref, motionRef);
  if (!present) return null;
  return (
    <DialogRoot open={active}>
      {/* usePresence owns the delayed exit: parts stay force-mounted, so Radix keeps aria-hidden and scroll lock until unmount, then returns focus asynchronously. */}
      <Portal
        container={portalContainer}
        className={cn(
          'rt-dialog-wrapper',
          'items-center flex h-screen justify-center fixed top-0 w-screen z-(--z-index-higher)',
          materialRoot,
          materialDescendants,
        )}
      >
        <DialogOverlay
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
          onMouseDown={onOverlayMouseDown}
          onMouseMove={onOverlayMouseMove}
          onMouseUp={onOverlayMouseUp}
        />
        <DialogContent
          forceMount
          {...attributes}
          ref={surfaceRef}
          onOpenAutoFocus={onOpenAutoFocus}
          onCloseAutoFocus={onCloseAutoFocus}
          onEscapeKeyDown={(event) => {
            if (active) onEscKeyDown?.(event);
            event.preventDefault();
          }}
          data-react-toolbox="dialog"
          className={cn(
            'rt-dialog-dialog',
            'static w-auto translate-none data-[state=open]:animate-none data-[state=closed]:animate-none',
            'bg-(--dialog-color-white) rounded-(--dialog-border-radius) [box-shadow:var(--zdepth-shadow-5)] flex flex-col max-w-[96vw] max-h-[calc(100vh-4.8*var(--unit))] [outline:none] opacity-0 [overflow:var(--overflow)] transform-[translateY(calc(-1*var(--dialog-translate-y)))] [transition:opacity_var(--animation-duration-exit)_var(--animation-curve-fast-out-linear-in),transform_var(--animation-duration-exit)_var(--animation-curve-fast-out-linear-in)] [&&]:delay-0',
            type !== 'custom' &&
              (type === 'small'
                ? cn(
                    'rt-dialog-small',
                    'w-[30vw]',
                    '[@media_screen_and_(max-width:_720px)]:w-[50vw]',
                    '[@media_screen_and_(max-width:_600px)]:w-[75vw]',
                  )
                : type === 'normal'
                  ? cn('rt-dialog-normal', 'w-[50vw]', '[@media_screen_and_(max-width:_600px)]:w-[96vw]')
                  : type === 'large'
                    ? cn('rt-dialog-large', 'w-[96vw]')
                    : type === 'fullscreen'
                      ? cn(
                          'rt-dialog-fullscreen',
                          'w-[96vw]',
                          '[@media_screen_and_(max-width:_600px)]:rounded-none [@media_screen_and_(max-width:_600px)]:max-h-screen [@media_screen_and_(max-width:_600px)]:max-w-[100vw] [@media_screen_and_(max-width:_600px)]:min-h-screen [@media_screen_and_(max-width:_600px)]:w-screen',
                        )
                      : undefined),
            visible &&
              cn(
                'rt-dialog-active',
                '[.rt-dialog-dialog&]:opacity-[1] [.rt-dialog-dialog&]:transform-[translateY(0%)] [.rt-dialog-dialog&]:duration-(--animation-duration-enter) [.rt-dialog-dialog&]:ease-(--animation-curve-linear-out-slow-in) [.rt-dialog-dialog&]:delay-(--animation-delay)',
              ),
            className,
          )}
          role={attributes.role || 'dialog'}
          aria-modal="true"
          aria-labelledby={attributes['aria-labelledby'] || (!attributes['aria-label'] && title ? titleId : undefined)}
          aria-hidden={!active || undefined}
          inert={!active || undefined}
        >
          <section
            className={cn(
              'rt-dialog-body',
              descriptionClasses,
              'grow-2 min-h-0 overflow-y-auto p-(--dialog-content-padding)',
              '[&_p]:text-[calc(1.6*var(--unit))] [&_p]:[font-weight:400] [&_p]:tracking-[0] [&_p]:leading-[calc(2.4*var(--unit))] [&_p]:m-0',
            )}
          >
            {title ? (
              <DialogTitle
                asChild
                id={titleId}
                className={cn('rt-dialog-title', 'grow-0 tracking-[0.02em] m-[0_0_calc(2*var(--unit))]')}
              >
                <h6>{title}</h6>
              </DialogTitle>
            ) : null}
            {children}
          </section>
          {actions.length ? (
            <nav className={cn('rt-dialog-navigation', 'grow-0 shrink-0 p-(--dialog-navigation-padding) text-right')}>
              {actions.map((action, index) => (
                <Button
                  key={index}
                  {...action}
                  className={cn(
                    'rt-dialog-button',
                    'ml-(--dialog-navigation-padding) min-w-[calc(6.4*var(--unit))] pl-(--dialog-navigation-padding) pr-(--dialog-navigation-padding)',
                    action.className,
                  )}
                />
              ))}
            </nav>
          ) : null}
        </DialogContent>
      </Portal>
    </DialogRoot>
  );
}
export default Dialog;
