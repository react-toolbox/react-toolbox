'use client';
import { mergeStyleSlots } from '../foundations/styles/slots';

import { materialRoot, materialDescendants } from '../foundations/styles/classes';
import type { DialogTheme } from './types';

import { useId, type HTMLAttributes, type MouseEventHandler, type ReactNode, type Ref } from 'react';
import { cn } from '../foundations/styles/cn';
import Portal from '../foundations/portal/Portal';
import usePresence from '../foundations/motion/usePresence';
import useMergedRefs from '../foundations/portal/useMergedRefs';
import { Button, type ButtonProps } from '../button';
import Overlay from '../overlay';
import useModalFocus from '../overlay/useModalFocus';

export type { DialogTheme, DialogClassNames } from './types';
export type DialogActionProps = ButtonProps;
export interface DialogProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  actions?: DialogActionProps[];
  active?: boolean;
  delay?: number;
  onEscKeyDown?: (event: KeyboardEvent) => void;
  onOverlayClick?: MouseEventHandler<HTMLDivElement>;
  onOverlayMouseDown?: MouseEventHandler<HTMLDivElement>;
  onOverlayMouseMove?: MouseEventHandler<HTMLDivElement>;
  onOverlayMouseUp?: MouseEventHandler<HTMLDivElement>;
  /** Classes for the component's rendered parts. Applied after legacy theme overrides. */
  classNames?: DialogTheme;
  /** @deprecated Use classNames for style slots; use ThemeProvider for design tokens. */
  theme?: DialogTheme;
  title?: ReactNode;
  type?: 'small' | 'normal' | 'large' | 'fullscreen' | 'custom';
  ref?: Ref<HTMLDivElement>;
}
export function Dialog({
  actions = [],
  active = false,
  delay = 500,
  type = 'normal',
  children,
  className,
  onEscKeyDown,
  onOverlayClick,
  onOverlayMouseDown,
  onOverlayMouseMove,
  onOverlayMouseUp,
  theme: legacyTheme,
  classNames,
  title,
  ref,
  ...attributes
}: DialogProps) {
  const theme = mergeStyleSlots(legacyTheme, classNames);
  const titleId = useId();
  const { present, visible } = usePresence(active, delay);
  const focusRef = useModalFocus(visible);
  const dialogRef = useMergedRefs<HTMLDivElement>(focusRef, ref);
  if (!present) return null;
  return (
    <Portal
      className={cn(
        'rt-dialog-wrapper',
        'items-center flex h-screen justify-center fixed top-0 w-screen z-(--z-index-higher)',
        materialRoot,
        materialDescendants,
        theme?.wrapper,
      )}
    >
      <Overlay
        active={visible}
        onClick={onOverlayClick}
        onEscKeyDown={onEscKeyDown}
        onMouseDown={onOverlayMouseDown}
        onMouseMove={onOverlayMouseMove}
        onMouseUp={onOverlayMouseUp}
      />
      <div
        {...attributes}
        ref={dialogRef}
        data-react-toolbox="dialog"
        className={cn(
          'rt-dialog-dialog',
          'bg-(--dialog-color-white) rounded-(--dialog-border-radius) [box-shadow:var(--zdepth-shadow-5)] flex flex-col max-w-[96vw] max-h-[calc(100vh-4.8*var(--unit))] [outline:none] opacity-0 [overflow:var(--overflow)] transform-[translateY(calc(-1*var(--dialog-translate-y)))] [transition:opacity_var(--animation-duration)_var(--animation-curve-default),transform_var(--animation-duration)_var(--animation-curve-default)] [&&]:delay-(--animation-delay)',
          theme?.dialog,
          type !== 'custom' &&
            (type === 'small'
              ? cn(
                  'rt-dialog-small',
                  'w-[30vw]',
                  '[@media_screen_and_(max-width:_720px)]:w-[50vw]',
                  '[@media_screen_and_(max-width:_600px)]:w-[75vw]',
                  theme?.small,
                )
              : type === 'normal'
                ? cn('rt-dialog-normal', 'w-[50vw]', '[@media_screen_and_(max-width:_600px)]:w-[96vw]', theme?.normal)
                : type === 'large'
                  ? cn('rt-dialog-large', 'w-[96vw]', theme?.large)
                  : type === 'fullscreen'
                    ? cn(
                        'rt-dialog-fullscreen',
                        'w-[96vw]',
                        '[@media_screen_and_(max-width:_600px)]:rounded-none [@media_screen_and_(max-width:_600px)]:max-h-screen [@media_screen_and_(max-width:_600px)]:max-w-[100vw] [@media_screen_and_(max-width:_600px)]:min-h-screen [@media_screen_and_(max-width:_600px)]:w-screen',
                        theme?.fullscreen,
                      )
                    : undefined),
          visible &&
            cn(
              'rt-dialog-active',
              '[.rt-dialog-dialog&]:opacity-[1] [.rt-dialog-dialog&]:transform-[translateY(0%)]',
              theme?.active,
            ),
          className,
        )}
        role={attributes.role || 'dialog'}
        aria-modal="true"
        aria-labelledby={attributes['aria-labelledby'] || (!attributes['aria-label'] && title ? titleId : undefined)}
        aria-hidden={!visible || undefined}
        inert={!visible || undefined}
        tabIndex={-1}
      >
        <section
          className={cn(
            'rt-dialog-body',
            'text-(--rt-color-text-secondary) grow-2 min-h-0 overflow-y-auto p-(--dialog-content-padding)',
            '[&_p]:text-[calc(1.4*var(--unit))] [&_p]:[font-weight:400] [&_p]:tracking-[0] [&_p]:leading-[calc(2.4*var(--unit))] [&_p]:m-0',
            theme?.body,
          )}
        >
          {title ? (
            <h6
              id={titleId}
              className={cn(
                'rt-dialog-title',
                'text-(--dialog-color-title) grow-0 text-[calc(2*var(--unit))] [font-weight:500] tracking-[0.02em] leading-none m-[0_0_calc(2*var(--unit))]',
                theme?.title,
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
              theme?.navigation,
            )}
          >
            {actions.map((action, index) => (
              <Button
                key={index}
                {...action}
                className={cn(
                  'rt-dialog-button',
                  'ml-(--dialog-navigation-padding) min-w-[calc(6.4*var(--unit))] pl-(--dialog-navigation-padding) pr-(--dialog-navigation-padding)',
                  theme?.button,
                  action.className,
                )}
              />
            ))}
          </nav>
        ) : null}
      </div>
    </Portal>
  );
}
export default Dialog;
