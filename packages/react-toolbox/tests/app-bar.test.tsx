import { StrictMode, createRef } from 'react';
import { act, cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import AppBar from '../src/material/app-bar';

describe('AppBar scrolling', () => {
  afterEach(cleanup);

  it('cleans up AppBar scroll listeners in StrictMode and clears hiding when disabled', () => {
    const previousScroll = window.scrollY;
    const header = createRef<HTMLElement>();
    const { rerender, unmount } = render(
      <StrictMode>
        <AppBar ref={header} scrollHide title="Toolbar" />
      </StrictMode>,
    );
    expect(header.current).toBe(screen.getByRole('banner'));
    act(() => {
      Object.defineProperty(window, 'scrollY', { configurable: true, value: 100 });
      window.dispatchEvent(new Event('scroll'));
    });
    expect(header.current).toHaveClass('rt-app-bar-scrollHide');
    rerender(
      <StrictMode>
        <AppBar ref={header} title="Toolbar" />
      </StrictMode>,
    );
    expect(header.current).not.toHaveClass('rt-app-bar-scrollHide');
    unmount();
    expect(header.current).toBeNull();
    Object.defineProperty(window, 'scrollY', { configurable: true, value: previousScroll });
  });
});
