'use client';

import {
  useCallback,
  useImperativeHandle,
  cloneElement,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { DismissableLayer } from '@radix-ui/react-dismissable-layer';
import { FocusScope, FocusScopeBranchProvider, useFocusScopeBranchRegistry } from '@radix-ui/react-focus-scope';
import { Slot } from '@radix-ui/react-slot';
import { RemoveScroll } from 'react-remove-scroll';
import { hideOthers } from 'aria-hidden';
import { ActiveSurface, type SurfaceElement } from './ActiveSurface';

interface ReturnFocus {
  node: HTMLElement | null;
  opener: HTMLElement | null;
  parent: ReturnFocus | null;
}
const ReturnFocusContext = createContext<ReturnFocus | null>(null);
export interface ModalSurfaceProps {
  active: boolean;
  children: SurfaceElement;
  onOpenAutoFocus?: (event: Event) => void;
  onCloseAutoFocus?: (event: Event) => void;
  onEscKeyDown?: (event: KeyboardEvent) => void;
}

/** Share Radix ownership while preserving the convenience API's DOM and focus contract. */
export function ModalSurface({ active, children, onOpenAutoFocus, onCloseAutoFocus, onEscKeyDown }: ModalSurfaceProps) {
  const parent = useContext(ReturnFocusContext);
  const restoration = useRef<ReturnFocus>({
    node: null,
    opener:
      typeof document !== 'undefined' && document.activeElement instanceof HTMLElement ? document.activeElement : null,
    parent,
  });
  restoration.current.parent = parent;
  const [node, setNode] = useState<HTMLElement | null>(null);
  const callbacks = useRef({ onOpenAutoFocus, onCloseAutoFocus, onEscKeyDown });
  callbacks.current = { onOpenAutoFocus, onCloseAutoFocus, onEscKeyDown };
  const opened = useRef(false);
  const [childrenReady, setChildrenReady] = useState(!active);
  const focusAfterChildren = useRef(false);
  useImperativeHandle<HTMLElement | null, HTMLElement | null>(children.props.ref, () => (childrenReady ? node : null), [
    childrenReady,
    node,
  ]);
  const placeFocus = useCallback(() => {
    if (!active || !node || opened.current) return;
    opened.current = true;
    const event = new Event('toolbox.openAutoFocus', { cancelable: true });
    callbacks.current.onOpenAutoFocus?.(event);
    if (!event.defaultPrevented && !node.contains(document.activeElement)) node.focus({ preventScroll: true });
  }, [active, node]);
  const branches = useFocusScopeBranchRegistry();
  useEffect(() => {
    if (!active || !node) return;
    const target = restoration.current;
    target.node = node;
    if (document.activeElement instanceof HTMLElement && !node.contains(document.activeElement)) {
      target.opener = document.activeElement;
    }
    if (node.contains(document.activeElement) && !opened.current) {
      if (!childrenReady) {
        focusAfterChildren.current = true;
        setChildrenReady(true);
      } else placeFocus();
    }
    const reveal = hideOthers(node);
    return () => {
      reveal();
      opened.current = false;
      const event = new Event('toolbox.closeAutoFocus', { cancelable: true });
      callbacks.current.onCloseAutoFocus?.(event);
      if (event.defaultPrevented) return;
      let current: ReturnFocus | null = target;
      while (current) {
        const opener = current.opener;
        if (opener?.isConnected && opener !== document.body && !opener.closest('[inert]')) {
          opener.focus({ preventScroll: true });
          return;
        }
        const fallback = current.parent?.node;
        if (fallback?.isConnected && !fallback.closest('[inert]')) {
          fallback.focus({ preventScroll: true });
          return;
        }
        current = current.parent;
      }
    };
  }, [active, node]);
  useEffect(() => {
    if (!childrenReady || !focusAfterChildren.current) return;
    focusAfterChildren.current = false;
    placeFocus();
  }, [childrenReady, placeFocus]);

  return (
    <ReturnFocusContext value={restoration.current}>
      <FocusScopeBranchProvider registry={branches.registry}>
        <RemoveScroll as={Slot} enabled={active} allowPinchZoom shards={branches.nodes}>
          <FocusScope
            asChild
            loop={active}
            trapped={active}
            branches={branches.nodes}
            onMountAutoFocus={(event) => {
              event.preventDefault();
              if (!active || !node || opened.current) return;
              if (childrenReady) placeFocus();
              else {
                /** Mount child autofocus controls after Radix has paused the containing modal. */
                focusAfterChildren.current = true;
                setChildrenReady(true);
              }
            }}
            onUnmountAutoFocus={(event) => event.preventDefault()}
          >
            <DismissableLayer
              asChild
              disableOutsidePointerEvents
              onEscapeKeyDown={(event) => {
                if (!active || event.defaultPrevented) return;
                callbacks.current.onEscKeyDown?.(event);
                event.preventDefault();
              }}
              onInteractOutside={(event) => event.preventDefault()}
            >
              <ActiveSurface active={active}>
                {cloneElement(children, {
                  ref: setNode,
                  children: childrenReady ? children.props.children : null,
                  onKeyDown: (event) => {
                    children.props.onKeyDown?.(event);
                    if (
                      !active ||
                      event.defaultPrevented ||
                      event.key !== 'Tab' ||
                      event.target !== node ||
                      event.altKey ||
                      event.ctrlKey ||
                      event.metaKey
                    )
                      return;
                    /** The convenience API initially focuses its surface, outside Radix's tabbable edges. */
                    const candidates = Array.from(
                      node.querySelectorAll<HTMLElement>(
                        'a[href],button,input,select,textarea,[tabindex],[contenteditable="true"]',
                      ),
                    ).filter((element) => {
                      if (
                        element.tabIndex < 0 ||
                        element.matches(':disabled') ||
                        element.closest('[hidden],[inert],[aria-hidden="true"]')
                      )
                        return false;
                      for (
                        let current: HTMLElement | null = element;
                        current && current !== node;
                        current = current.parentElement
                      ) {
                        const style = getComputedStyle(current);
                        if (style.display === 'none' || style.visibility === 'hidden') return false;
                      }
                      return true;
                    });
                    event.preventDefault();
                    (event.shiftKey ? candidates.at(-1) : candidates[0])?.focus({ preventScroll: true });
                  },
                })}
              </ActiveSurface>
            </DismissableLayer>
          </FocusScope>
        </RemoveScroll>
      </FocusScopeBranchProvider>
    </ReturnFocusContext>
  );
}
