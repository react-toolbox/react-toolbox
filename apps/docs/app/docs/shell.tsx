'use client';

import { useEffect, useId, useState, useSyncExternalStore, type ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { Button, IconButton } from 'react-toolbox/button';
import { Layout, NavDrawer, Panel } from 'react-toolbox/layout';
import SiteIcon from '../site-icon';
import DocsSidebar, { type ComponentLink } from './sidebar';

const desktopNavigation = '(min-width: 1025px)';

function subscribeToViewport(onChange: () => void) {
  const viewport = window.matchMedia(desktopNavigation);
  viewport.addEventListener('change', onChange);
  return () => viewport.removeEventListener('change', onChange);
}

function isDesktopViewport() {
  return window.matchMedia(desktopNavigation).matches;
}

export default function DocumentationShell({
  header,
  children,
  components,
}: {
  header: ReactNode;
  children: ReactNode;
  components: ComponentLink[];
}) {
  const [navigationOpen, setNavigationOpen] = useState(false);
  const pathname = usePathname();
  const navigationId = useId();
  /** Render navigation in the server HTML; responsive CSS hides it on small screens before hydration. */
  const desktop = useSyncExternalStore(subscribeToViewport, isDesktopViewport, () => true);

  useEffect(() => {
    setNavigationOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (desktop) setNavigationOpen(false);
  }, [desktop]);

  return (
    <Layout className="[--drawer-desktop-width:256px]">
      {header}
      <NavDrawer
        key={desktop ? 'permanent' : 'modal'}
        id={navigationId}
        active={navigationOpen}
        pinned={desktop}
        clipped={desktop}
        aria-label="Documentation navigation"
        onOverlayClick={() => setNavigationOpen(false)}
        onEscKeyDown={() => setNavigationOpen(false)}
        onCloseAutoFocus={(event) => {
          if (isDesktopViewport()) {
            event.preventDefault();
            document.getElementById('docs-content')?.focus({ preventScroll: true });
          }
        }}
        className="overscroll-y-contain bg-white max-[1025px]:[&.rt-layout-pinned]:hidden min-[1025px]:transform-none min-[1025px]:transition-none"
        style={{ height: desktop ? 'calc(100dvh - var(--docs-appbar-height))' : '100dvh', paddingTop: 0 }}
      >
        <div className="flex h-(--docs-appbar-height) items-center justify-between border-b border-toolbox-divider pr-2 pl-4 toolbox-desktop:pl-6 min-[1025px]:hidden">
          <span className="font-medium">Documentation</span>
          <IconButton
            icon={<SiteIcon name="close" />}
            aria-label="Close navigation"
            onClick={() => setNavigationOpen(false)}
            className="inline-flex size-toolbox-touch items-center justify-center [&_svg]:size-6"
          />
        </div>
        <DocsSidebar components={components} onNavigate={() => setNavigationOpen(false)} />
      </NavDrawer>
      <Panel
        className="inset-s-0 top-(--docs-appbar-height) flex flex-col bg-white [--layout-side-transition:none] min-[1025px]:inset-s-(--layout-nav-width)"
        style={{ height: 'auto', maxHeight: 'none', minHeight: 'calc(100dvh - var(--docs-appbar-height))' }}
      >
        <div className="shrink-0 border-b border-toolbox-divider min-[1025px]:hidden">
          <Button
            icon={<SiteIcon name="menu" />}
            aria-haspopup="dialog"
            aria-expanded={navigationOpen}
            aria-controls={navigationId}
            onClick={() => setNavigationOpen(true)}
            className="flex min-h-toolbox-touch w-full items-center justify-start gap-8 rounded-none px-4 text-left text-sm normal-case text-toolbox-text-secondary toolbox-desktop:px-6 [&_svg]:size-6 [&_svg]:shrink-0"
            classNames={{ icon: 'size-6 shrink-0 leading-none [.rt-button-squared_&]:me-0' }}
          >
            <span>Browse documentation</span>
          </Button>
        </div>
        {children}
      </Panel>
    </Layout>
  );
}
