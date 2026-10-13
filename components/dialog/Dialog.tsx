'use client';

import {
  useId,
  type HTMLAttributes,
  type MouseEventHandler,
  type ReactNode,
  type Ref,
} from 'react';
import classnames from 'classnames';
import { mergeTheme } from '../theming';
import Portal from '../hoc/Portal';
import usePresence from '../hoc/usePresence';
import useMergedRefs from '../hoc/useMergedRefs';
import { Button, type ButtonProps } from '../button';
import Overlay from '../overlay';
import useModalFocus from '../overlay/useModalFocus';
import defaults from './theme';

export type DialogTheme = Partial<typeof defaults>;
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
  theme: overrides,
  title,
  ref,
  ...attributes
}: DialogProps) {
  const theme = mergeTheme(defaults, overrides);
  const titleId = useId();
  const { present, visible } = usePresence(active, delay);
  const focusRef = useModalFocus(visible);
  const dialogRef = useMergedRefs<HTMLDivElement>(focusRef, ref);
  if (!present) return null;
  return (
    <Portal className={theme.wrapper}>
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
        className={classnames(
          theme.dialog,
          type !== 'custom' && theme[type],
          visible && theme.active,
          className,
        )}
        role={attributes.role || 'dialog'}
        aria-modal="true"
        aria-labelledby={
          attributes['aria-labelledby'] ||
          (!attributes['aria-label'] && title ? titleId : undefined)
        }
        aria-hidden={!visible || undefined}
        inert={!visible || undefined}
        tabIndex={-1}
      >
        <section className={theme.body}>
          {title ? (
            <h6 id={titleId} className={theme.title}>
              {title}
            </h6>
          ) : null}
          {children}
        </section>
        {actions.length ? (
          <nav className={theme.navigation}>
            {actions.map((action, index) => (
              <Button
                key={index}
                {...action}
                className={classnames(theme.button, action.className)}
              />
            ))}
          </nav>
        ) : null}
      </div>
    </Portal>
  );
}
export default Dialog;
