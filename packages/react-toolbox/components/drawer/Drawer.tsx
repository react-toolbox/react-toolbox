'use client';

import type { HTMLAttributes, MouseEventHandler, Ref } from 'react';
import classnames from 'classnames';
import { mergeTheme } from '../theming';
import Portal from '../hoc/Portal';
import usePresence from '../hoc/usePresence';
import useMergedRefs from '../hoc/useMergedRefs';
import Overlay from '../overlay';
import useModalFocus from '../overlay/useModalFocus';
import defaults from './theme';

export type DrawerTheme = Partial<typeof defaults>;
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
  theme: overrides,
  type = 'left',
  withOverlay = true,
  ref,
  ...attributes
}: DrawerProps) {
  const theme = mergeTheme(defaults, overrides);
  const { present, visible } = usePresence(active, delay);
  const focusRef = useModalFocus(visible && withOverlay);
  const drawerRef = useMergedRefs(focusRef, ref);
  if (!present) return null;
  const content = (
    <>
      {withOverlay && (
        <Overlay active={visible} onClick={onOverlayClick} onEscKeyDown={onEscKeyDown} />
      )}
      <aside
        {...attributes}
        ref={drawerRef}
        data-react-toolbox="drawer"
        className={classnames(theme.drawer, theme[type], visible && theme.active, className)}
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
    <div className={theme.wrapper}>{content}</div>
  ) : (
    <Portal className={theme.wrapper}>{content}</Portal>
  );
}
export default Drawer;
