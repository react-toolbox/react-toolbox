'use client';

import { useEffect } from 'react';

const locks = new WeakMap<HTMLElement, { count: number; wasInert: boolean }>();

/** Supplement a primitive's aria-hidden modal background with native focus exclusion. */
export default function useInertOthers(node: HTMLElement | null) {
  useEffect(() => {
    if (!node?.isConnected) return;
    const siblings: HTMLElement[] = [];
    const lockBranch = (element: Element) => {
      if (!(element instanceof HTMLElement) || element.matches('[aria-live], script, template, style, link')) return;
      /** Preserve announcements without leaving unrelated controls in their ancestor branch focusable. */
      if (element.querySelector('[aria-live]')) {
        Array.from(element.children).forEach(lockBranch);
        return;
      }
      const lock = locks.get(element) ?? { count: 0, wasInert: element.hasAttribute('inert') };
      lock.count++;
      locks.set(element, lock);
      element.setAttribute('inert', '');
      siblings.push(element);
    };
    for (let branch: HTMLElement | null = node; branch?.parentElement; branch = branch.parentElement) {
      for (const sibling of branch.parentElement.children) {
        if (sibling !== branch) lockBranch(sibling);
      }
      if (branch.parentElement === node.ownerDocument.body) break;
    }
    return () => {
      for (const sibling of siblings) {
        const lock = locks.get(sibling)!;
        if (--lock.count) continue;
        if (!lock.wasInert) sibling.removeAttribute('inert');
        locks.delete(sibling);
      }
    };
  }, [node]);
}
