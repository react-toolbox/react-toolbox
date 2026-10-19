import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach, beforeEach, vi } from 'vitest';

/** jsdom has no pointer capture or layout observers; geometry stays covered in browser tests. */
beforeEach(() => {
  if (typeof HTMLElement === 'undefined') return;
  vi.stubGlobal(
    'PointerEvent',
    class extends MouseEvent {
      constructor(type, init = {}) {
        super(type, init);
        this.pointerType = init.pointerType ?? 'mouse';
        this.pointerId = init.pointerId ?? 1;
      }
    },
  );
  vi.stubGlobal(
    'ResizeObserver',
    class {
      observe() {}
      unobserve() {}
      disconnect() {}
    },
  );
  for (const [name, implementation] of Object.entries({
    hasPointerCapture: () => false,
    setPointerCapture: () => {},
    releasePointerCapture: () => {},
    scrollIntoView: () => {},
  })) {
    if (!HTMLElement.prototype[name]) {
      Object.defineProperty(HTMLElement.prototype, name, { configurable: true, writable: true, value: implementation });
    }
  }
});

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});
