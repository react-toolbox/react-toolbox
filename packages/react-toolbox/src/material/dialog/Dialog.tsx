'use client';
import './tokens.css';

import { materialRoot, materialDescendants } from '../foundations/styles/classes';
import type { DialogClassNames } from './types';

import { useId, type HTMLAttributes, type MouseEventHandler, type ReactNode, type Ref } from 'react';
import { cn } from '../foundations/styles/cn';
import Portal, { type PortalContainer } from '../foundations/portal/Portal';
import usePresence from '../foundations/motion/usePresence';
import { Button, type ButtonProps } from '../button';
import Overlay from '../overlay';
import { ModalSurface } from '../overlay/ModalSurface';

export type { DialogClassNames } from './types';
export type DialogActionProps = ButtonProps;
export interface DialogProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  actions?: DialogActionProps[];
  active?: boolean;
  /** Cancel the default focus placement and focus a specific field instead. */
  onOpenAutoFocus?: (event: Event) => void;
  /** Cancel the default return focus, for example after deleting the opener. */
  onCloseAutoFocus?: (event: Event) => void;
  portalContainer?: PortalContainer;
  delay?: number;
  onEscKeyDown?: (event: KeyboardEvent) => void;
  onOverlayClick?: MouseEventHandler<HTMLDivElement>;
  onOverlayMouseDown?: MouseEventHandler<HTMLDivElement>;
  onOverlayMouseMove?: MouseEventHandler<HTMLDivElement>;
  onOverlayMouseUp?: MouseEventHandler<HTMLDivElement>;
  /** Classes for the component's rendered parts. */
  classNames?: DialogClassNames;
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
  delay = 500,
  type = 'normal',
  children,
  className,
  onEscKeyDown,
  onOverlayClick,
  onOverlayMouseDown,
  onOverlayMouseMove,
  onOverlayMouseUp,
  classNames,
  title,
  ref,
  ...attributes
}: DialogProps) {
  const titleId = useId();
  const { present, visible } = usePresence(active, delay);
  if (!present) return null;
  return (
    <Portal
      container={portalContainer}
      className={cn(
        'rt-dialog-wrapper',
        'items-center flex h-screen justify-center fixed top-0 w-screen z-(--z-index-higher)',
        materialRoot,
        materialDescendants,
        classNames?.wrapper,
      )}
    >
      <Overlay
        active={visible}
        lockScroll={false}
        onClick={onOverlayClick}
        onMouseDown={onOverlayMouseDown}
        onMouseMove={onOverlayMouseMove}
        onMouseUp={onOverlayMouseUp}
      />
      <ModalSurface
        active={active}
        onOpenAutoFocus={onOpenAutoFocus}
        onCloseAutoFocus={onCloseAutoFocus}
        onEscKeyDown={onEscKeyDown}
      >
        <div
          {...attributes}
          ref={ref}
          data-react-toolbox="dialog"
          className={cn(
            'rt-dialog-dialog',
            'bg-(--dialog-color-white) rounded-(--dialog-border-radius) [box-shadow:var(--zdepth-shadow-5)] flex flex-col max-w-[96vw] max-h-[calc(100vh-4.8*var(--unit))] [outline:none] opacity-0 [overflow:var(--overflow)] transform-[translateY(calc(-1*var(--dialog-translate-y)))] [transition:opacity_var(--animation-duration)_var(--animation-curve-default),transform_var(--animation-duration)_var(--animation-curve-default)] [&&]:delay-(--animation-delay)',
            classNames?.dialog,
            type !== 'custom' &&
              (type === 'small'
                ? cn(
                    'rt-dialog-small',
                    'w-[30vw]',
                    '[@media_screen_and_(max-width:_720px)]:w-[50vw]',
                    '[@media_screen_and_(max-width:_600px)]:w-[75vw]',
                    classNames?.small,
                  )
                : type === 'normal'
                  ? cn(
                      'rt-dialog-normal',
                      'w-[50vw]',
                      '[@media_screen_and_(max-width:_600px)]:w-[96vw]',
                      classNames?.normal,
                    )
                  : type === 'large'
                    ? cn('rt-dialog-large', 'w-[96vw]', classNames?.large)
                    : type === 'fullscreen'
                      ? cn(
                          'rt-dialog-fullscreen',
                          'w-[96vw]',
                          '[@media_screen_and_(max-width:_600px)]:rounded-none [@media_screen_and_(max-width:_600px)]:max-h-screen [@media_screen_and_(max-width:_600px)]:max-w-[100vw] [@media_screen_and_(max-width:_600px)]:min-h-screen [@media_screen_and_(max-width:_600px)]:w-screen',
                          classNames?.fullscreen,
                        )
                      : undefined),
            visible &&
              cn(
                'rt-dialog-active',
                '[.rt-dialog-dialog&]:opacity-[1] [.rt-dialog-dialog&]:transform-[translateY(0%)]',
                classNames?.active,
              ),
            className,
          )}
          role={attributes.role || 'dialog'}
          aria-modal="true"
          aria-labelledby={attributes['aria-labelledby'] || (!attributes['aria-label'] && title ? titleId : undefined)}
          aria-hidden={!active || undefined}
          inert={!active || undefined}
          tabIndex={-1}
        >
          <section
            className={cn(
              'rt-dialog-body',
              'text-(--rt-color-text-secondary) grow-2 min-h-0 overflow-y-auto p-(--dialog-content-padding)',
              '[&_p]:text-[calc(1.4*var(--unit))] [&_p]:[font-weight:400] [&_p]:tracking-[0] [&_p]:leading-[calc(2.4*var(--unit))] [&_p]:m-0',
              classNames?.body,
            )}
          >
            {title ? (
              <h6
                id={titleId}
                className={cn(
                  'rt-dialog-title',
                  'text-(--dialog-color-title) grow-0 text-[calc(2*var(--unit))] [font-weight:500] tracking-[0.02em] leading-none m-[0_0_calc(2*var(--unit))]',
                  classNames?.title,
                )}
              >
                {title}
              </h6>
            ) : null}
            {children}
          </section>
          {actions.length ? (
            <nav
              className={cn(
                'rt-dialog-navigation',
                'grow-0 shrink-0 p-(--dialog-navigation-padding) text-right',
                classNames?.navigation,
              )}
            >
              {actions.map((action, index) => (
                <Button
                  key={index}
                  {...action}
                  className={cn(
                    'rt-dialog-button',
                    'ml-(--dialog-navigation-padding) min-w-[calc(6.4*var(--unit))] pl-(--dialog-navigation-padding) pr-(--dialog-navigation-padding)',
                    classNames?.button,
                    action.className,
                  )}
                />
              ))}
            </nav>
          ) : null}
        </div>
      </ModalSurface>
    </Portal>
  );
}
export default Dialog;
