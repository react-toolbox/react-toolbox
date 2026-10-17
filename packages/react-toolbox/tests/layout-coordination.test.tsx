import { StrictMode, createRef } from 'react';
import { act, cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import AppBar from '../src/material/app-bar';
import { Layout, NavDrawer, Panel, Sidebar } from '../src/material/layout';

describe('responsive layout and app-bar scrolling', () => {
  afterEach(cleanup);

  it('maps layout classes directly and recomputes permanent drawers after resizing', () => {
    const previous = window.innerWidth;
    Object.defineProperty(window, 'innerWidth', { configurable: true, value: 1000 });
    const { container } = render(<Layout>
      <AppBar fixed title="Toolbar" leftIcon="menu" />
      <NavDrawer permanentAt="sm" clipped><p>Left</p></NavDrawer>
      <Panel>Content</Panel>
      <Sidebar pinned width={4}><p>Right</p></Sidebar>
    </Layout>);
    expect(container.firstChild).toHaveClass('rt-layout-navDrawerPinned', 'rt-layout-sidebarWidth4', 'rt-layout-appbarFixed');
    expect(screen.getByRole('banner')).toHaveClass('rt-layout-appbarAppBar', 'rt-app-bar-appBar');
    expect(container.querySelector('.rt-layout-navDrawerDrawer')).toHaveClass('rt-layout-pinned', 'rt-layout-clipped');
    act(() => { Object.defineProperty(window, 'innerWidth', { configurable: true, value: 700 }); window.dispatchEvent(new Event('resize')); });
    expect(container.firstChild).not.toHaveClass('rt-layout-navDrawerPinned');
    Object.defineProperty(window, 'innerWidth', { configurable: true, value: previous });
  });

  it('cleans up AppBar scroll listeners in StrictMode and clears hiding when disabled', () => {
    const previousScroll = window.scrollY;
    const header = createRef<HTMLElement>();
    const { rerender, unmount } = render(<StrictMode><AppBar ref={header} scrollHide title="Toolbar" /></StrictMode>);
    expect(header.current).toBe(screen.getByRole('banner'));
    act(() => { Object.defineProperty(window, 'scrollY', { configurable: true, value: 100 }); window.dispatchEvent(new Event('scroll')); });
    expect(header.current).toHaveClass('rt-app-bar-scrollHide');
    rerender(<StrictMode><AppBar ref={header} title="Toolbar" /></StrictMode>);
    expect(header.current).not.toHaveClass('rt-app-bar-scrollHide');
    unmount();
    expect(header.current).toBeNull();
    Object.defineProperty(window, 'scrollY', { configurable: true, value: previousScroll });
  });
});

describe('wrapper-safe layout coordination', () => {
  it('coordinates wrapped shell parts and removes registrations on unmount', () => {
    function Navigation() {
      return (
        <NavDrawer pinned clipped>
          Navigation
        </NavDrawer>
      );
    }
    function Header() {
      return <AppBar title="Workspace" fixed />;
    }
    function Aside({ pinned }: { pinned: boolean }) {
      return (
        <Sidebar width={50} pinned={pinned}>
          Tools
        </Sidebar>
      );
    }
    const shell = (pinned: boolean, navigation = true) => (
      <Layout data-testid="layout">
        <Header />
        {navigation && <Navigation />}
        <Panel>Content</Panel>
        <Aside pinned={pinned} />
      </Layout>
    );
    const { rerender } = render(shell(false));
    const layout = screen.getByTestId('layout');
    expect(layout).toHaveClass('rt-layout-appbarFixed', 'rt-layout-navDrawerPinned', 'rt-layout-sidebarWidth50');
    expect(layout).not.toHaveClass('rt-layout-sidebarPinned');
    expect(screen.getByRole('banner')).toHaveClass('rt-layout-appbarAppBar');
    expect(layout.style.getPropertyValue('--layout-sidebar-percent')).toBe('50%');
    rerender(shell(true, false));
    expect(layout).toHaveClass('rt-layout-sidebarPinned');
    expect(layout).not.toHaveClass('rt-layout-navDrawerPinned');
  });
});
