import { useEffect, useRef, useState } from 'react';

interface ModalEntry {
  node: HTMLElement;
  previous: HTMLElement | null;
}
const modals: ModalEntry[] = [];
const focusableSelector =
  'a[href], button, input, select, textarea, [tabindex], [contenteditable="true"]';

function focusableElements(node: HTMLElement) {
  return Array.from(node.querySelectorAll<HTMLElement>(focusableSelector)).filter((element) => {
    if (
      element.matches(':disabled') ||
      element.tabIndex < 0 ||
      element.closest('[hidden], [inert], [aria-hidden="true"]')
    )
      return false;
    for (
      let current: HTMLElement | null = element;
      current && current !== node;
      current = current.parentElement
    ) {
      const style = window.getComputedStyle(current);
      if (style.display === 'none' || style.visibility === 'hidden') return false;
    }
    return true;
  });
}

// A callback ref also handles Portal's deferred mount. Only the top modal owns
// focus, so a picker opened from a full-screen dialog remains usable.
export default function useModalFocus(active: boolean) {
  const [node, setNode] = useState<HTMLElement | null>(null);
  const opener = useRef<HTMLElement | null>(
    typeof document === 'undefined'
      ? null
      : document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null,
  );
  useEffect(() => {
    if (!active || !node) return undefined;
    // A child with autoFocus can focus itself before this effect runs.
    const previous = node.contains(document.activeElement)
      ? opener.current
      : document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    opener.current = previous;
    const entry = { node, previous };
    modals.push(entry);
    const isTop = () => modals[modals.length - 1] === entry;
    const focus = (element: HTMLElement) => element.focus({ preventScroll: true });
    if (!node.contains(document.activeElement)) focus(node);

    const handleFocus = (event: FocusEvent) => {
      if (isTop() && !(event.target instanceof Node && node.contains(event.target))) focus(node);
    };
    const handleKey = (event: KeyboardEvent) => {
      if (!isTop() || event.key !== 'Tab' || event.defaultPrevented) return;
      const elements = focusableElements(node);
      const first = elements[0];
      const last = elements[elements.length - 1];
      const current = document.activeElement;
      if (!first) {
        event.preventDefault();
        focus(node);
      } else if (
        event.shiftKey &&
        (current === first || current === node || !node.contains(current))
      ) {
        event.preventDefault();
        focus(last);
      } else if (
        !event.shiftKey &&
        (current === last || current === node || !node.contains(current))
      ) {
        event.preventDefault();
        focus(first);
      }
    };
    document.addEventListener('focusin', handleFocus);
    document.addEventListener('keydown', handleKey);
    return () => {
      const wasTop = isTop();
      modals.splice(modals.indexOf(entry), 1);
      // When a whole nested modal tree closes, the parent's cleanup may run
      // first. Pass its opener down before that parent DOM disappears.
      modals.forEach((remaining) => {
        if (remaining.previous && node.contains(remaining.previous))
          remaining.previous = entry.previous;
      });
      document.removeEventListener('focusin', handleFocus);
      document.removeEventListener('keydown', handleKey);
      if (wasTop) {
        const usableOpener =
          entry.previous &&
          entry.previous.isConnected &&
          entry.previous !== document.body &&
          entry.previous !== document.documentElement;
        const target = usableOpener ? entry.previous : modals[modals.length - 1]?.node;
        if (target && target.isConnected) focus(target);
      }
    };
  }, [active, node]);
  return setNode;
}
