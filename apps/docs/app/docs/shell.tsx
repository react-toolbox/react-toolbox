'use client';

import { useEffect, useId, useState, type ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { Button, IconButton } from 'react-toolbox/button';
import { Drawer } from 'react-toolbox/drawer';
import SiteIcon from '../site-icon';
import DocsSidebar, { type ComponentLink } from './sidebar';

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

  useEffect(() => {
    setNavigationOpen(false);
  }, [pathname]);

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 1025px)');
    const closeMobileNavigation = () => {
      if (desktop.matches) setNavigationOpen(false);
    };
    desktop.addEventListener('change', closeMobileNavigation);
    return () => desktop.removeEventListener('change', closeMobileNavigation);
  }, []);

  return (
    <div className="min-h-svh pt-(--docs-appbar-height) [--drawer-desktop-width:256px]">
      {header}
      <aside className="fixed inset-s-0 bottom-0 top-(--docs-appbar-height) hidden w-64 overflow-y-auto overscroll-y-contain border-e border-toolbox-divider bg-white min-[1025px]:block">
        <DocsSidebar components={components} />
      </aside>
      <Drawer
        id={navigationId}
        active={navigationOpen}
        aria-label="Documentation navigation"
        onOverlayClick={() => setNavigationOpen(false)}
        onEscKeyDown={() => setNavigationOpen(false)}
        onCloseAutoFocus={(event) => {
          if (window.matchMedia('(min-width: 1025px)').matches) {
            event.preventDefault();
            document.getElementById('docs-content')?.focus({ preventScroll: true });
          }
        }}
        className="overscroll-y-contain bg-white"
        style={{ height: '100dvh' }}
        insideTree
      >
        <div className="flex h-(--docs-appbar-height) items-center justify-between border-b border-toolbox-divider pr-2 pl-4 toolbox-desktop:pl-6">
          <span className="font-medium">Documentation</span>
          <IconButton
            icon={<SiteIcon name="close" />}
            aria-label="Close navigation"
            onClick={() => setNavigationOpen(false)}
            className="inline-flex size-toolbox-touch items-center justify-center [&_svg]:size-6"
          />
        </div>
        <DocsSidebar components={components} onNavigate={() => setNavigationOpen(false)} />
      </Drawer>
      <div className="flex min-h-[calc(100dvh-var(--docs-appbar-height))] flex-col bg-white min-[1025px]:ms-64">
        <div className="shrink-0 border-b border-toolbox-divider min-[1025px]:hidden">
          <Button
            icon={<SiteIcon name="menu" />}
            aria-haspopup="dialog"
            aria-expanded={navigationOpen}
            aria-controls={navigationId}
            onClick={() => setNavigationOpen(true)}
            className="flex min-h-toolbox-touch w-full items-center justify-start gap-8 rounded-none px-4 text-left text-sm normal-case text-toolbox-text-secondary toolbox-desktop:px-6 [&_svg]:size-6 [&_svg]:shrink-0 [&_.rt-button-icon]:size-6 [&_.rt-button-icon]:shrink-0 [&_.rt-button-icon]:leading-none [&.rt-button-squared_.rt-button-icon]:me-0"
          >
            <span>Browse documentation</span>
          </Button>
        </div>
        {children}
      </div>
    </div>
  );
}
