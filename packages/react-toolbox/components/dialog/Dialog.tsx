'use client';
import { materialRoot, materialDescendants } from '../utils/styles';
import type { DialogTheme } from './types';

import { useId, type HTMLAttributes, type MouseEventHandler, type ReactNode, type Ref } from 'react';
import { cn } from '../utils/cn';
import Portal from '../hoc/Portal';
import usePresence from '../hoc/usePresence';
import useMergedRefs from '../hoc/useMergedRefs';
import { Button, type ButtonProps } from '../button';
import Overlay from '../overlay';
import useModalFocus from '../overlay/useModalFocus';

export type { DialogTheme } from './types';
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
  theme,
  title,
  ref,
  ...attributes
}: DialogProps) {
  const titleId = useId();
  const { present, visible } = usePresence(active, delay);
  const focusRef = useModalFocus(visible);
  const dialogRef = useMergedRefs<HTMLDivElement>(focusRef, ref);
  if (!present) return null;
  return (
    <Portal
      className={cn(
        'rt-dialog-wrapper',
        'items-center flex h-[100vh] justify-center fixed top-0 w-[100vw] z-[var(--z-index-higher)]',
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
          'bg-[var(--dialog-color-white)] rounded-[var(--dialog-border-radius)] [box-shadow:var(--zdepth-shadow-5)] flex flex-col max-w-[96vw] max-h-[calc(100vh_-_4.8_*_var(--unit))] [outline:none] opacity-0 [overflow:var(--overflow)] [transform:translateY(calc(-1_*_var(--dialog-translate-y)))] [transition:opacity_var(--animation-duration)_var(--animation-curve-default),_transform_var(--animation-duration)_var(--animation-curve-default)] [&&]:[transition-delay:var(--animation-delay)]',
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
                        '[@media_screen_and_(max-width:_600px)]:rounded-[0] [@media_screen_and_(max-width:_600px)]:max-h-[100vh] [@media_screen_and_(max-width:_600px)]:max-w-[100vw] [@media_screen_and_(max-width:_600px)]:min-h-[100vh] [@media_screen_and_(max-width:_600px)]:w-[100vw]',
                        theme?.fullscreen,
                      )
                    : undefined),
          visible &&
            cn(
              'rt-dialog-active',
              '[.rt-dialog-dialog&]:opacity-[1] [.rt-dialog-dialog&]:[transform:translateY(0%)]',
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
            'text-[color:var(--rt-color-text-secondary)] grow-[2] min-h-0 overflow-y-auto p-[var(--dialog-content-padding)]',
            '[&_p]:text-[length:calc(1.4_*_var(--unit))] [&_p]:[font-weight:400] [&_p]:tracking-[0] [&_p]:leading-[calc(2.4_*_var(--unit))] [&_p]:m-0',
            theme?.body,
          )}
        >
          {title ? (
            <h6
              id={titleId}
              className={cn(
                'rt-dialog-title',
                'text-[color:var(--dialog-color-title)] grow-0 text-[length:calc(2_*_var(--unit))] [font-weight:500] tracking-[0.02em] leading-[1] m-[0_0_calc(2_*_var(--unit))]',
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
              'grow-0 shrink-0 p-[var(--dialog-navigation-padding)] text-right',
              theme?.navigation,
            )}
          >
            {actions.map((action, index) => (
              <Button
                key={index}
                {...action}
                className={cn(
                  'rt-dialog-button',
                  'ml-[var(--dialog-navigation-padding)] min-w-[calc(6.4_*_var(--unit))] pl-[var(--dialog-navigation-padding)] pr-[var(--dialog-navigation-padding)]',
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
