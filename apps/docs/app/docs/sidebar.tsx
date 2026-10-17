'use client';

import { useEffect, useId, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IconButton } from 'react-toolbox/button';
import { Drawer } from 'react-toolbox/drawer';
import { List, ListDivider, ListItem, ListSubHeader } from 'react-toolbox/list';
import SiteIcon from '../site-icon';
type ComponentLink = { slug: string; title: string };

const guides = [
  { href: '/docs', title: 'Introduction' },
  { href: '/docs/installation', title: 'Installation' },
  { href: '/docs/theming', title: 'Theming' },
  { href: '/docs/recipes', title: 'Recipes' },
  { href: '/docs/components', title: 'All components' },
];

function SidebarNavigation({ components, onNavigate }: { components: ComponentLink[]; onNavigate?: () => void }) {
  const pathname = usePathname();
  const id = useId();
  function item(href: string, title: string) {
    const active = pathname === href;
    return (
      <ListItem
        key={href}
        className="[--list-horizontal-padding:0px]"
        rippleClassName={active ? 'text-toolbox-primary' : undefined}
        itemContent={
          <Link
            href={href}
            aria-current={active ? 'page' : undefined}
            onNavigate={onNavigate}
            className={`flex min-h-toolbox-touch min-w-0 flex-1 items-center px-4 min-[600px]:px-6 text-sm font-medium no-underline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-toolbox-primary ${active ? 'text-toolbox-primary' : 'text-toolbox-text'}`}
          >
            {title}
          </Link>
        }
      />
    );
  }
  return (
    <nav aria-label="Documentation sidebar" className="min-[600px]:[--list-horizontal-padding:24px] lg:py-8">
      <section aria-labelledby={`${id}-guides`}>
        <ListSubHeader id={`${id}-guides`} caption="Getting started" className="sticky top-0 z-10 m-0 bg-white" />
        <List selectable ripple className="block pt-0">
          {guides.map((guide) => item(guide.href, guide.title))}
        </List>
      </section>
      <ListDivider className="m-0 mb-2" />
      <section aria-labelledby={`${id}-components`}>
        <ListSubHeader id={`${id}-components`} caption="Components" className="sticky top-0 z-10 m-0 bg-white" />
        <List selectable ripple className="block pt-0">
          {components.map((component) => item(`/docs/components/${component.slug}`, component.title))}
        </List>
      </section>
    </nav>
  );
}

function MobileNavigation({ components }: { components: ComponentLink[] }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 1024px)');
    const closeOnDesktop = () => {
      if (desktop.matches) setOpen(false);
    };
    desktop.addEventListener('change', closeOnDesktop);
    return () => desktop.removeEventListener('change', closeOnDesktop);
  }, []);
  return (
    <div className="border-b border-toolbox-divider lg:hidden">
      <div className="flex min-h-toolbox-touch items-center gap-1 px-4 min-[600px]:px-6">
        <IconButton
          icon={<SiteIcon name="menu" style={{ width: 'var(--button-toggle-font-size)' }} />}
          aria-label="Browse documentation"
          className="-ml-3 shrink-0 text-toolbox-text-secondary hover:text-toolbox-text [--button-toggle-size:48px]"
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-controls={open ? id : undefined}
          onClick={() => setOpen(true)}
        />
        <span className="text-sm font-medium">Browse documentation</span>
      </div>
      <Drawer
        id={id}
        active={open}
        aria-label="Documentation navigation"
        onOverlayClick={() => setOpen(false)}
        onEscKeyDown={() => setOpen(false)}
      >
        <div className="flex min-h-14 items-center justify-between border-b border-toolbox-divider pr-2 pl-4 sm:min-h-16 sm:pl-6">
          <span className="font-medium">Documentation</span>
          <IconButton
            icon={<SiteIcon name="close" style={{ width: 'var(--button-toggle-font-size)' }} />}
            aria-label="Close navigation"
            onClick={() => setOpen(false)}
          />
        </div>
        <div className="bg-white">
          <SidebarNavigation components={components} onNavigate={() => setOpen(false)} />
        </div>
      </Drawer>
    </div>
  );
}

/** Viewport anchoring prevents a fractional document bottom from pulling navigation under the app bar. */
export default function DocsSidebar({ components }: { components: ComponentLink[] }) {
  const pathname = usePathname();
  return (
    <>
      <aside className="fixed inset-s-0 top-(--docs-appbar-height) hidden h-[calc(100svh-var(--docs-appbar-height))] w-[256px] overflow-y-auto overscroll-contain border-r border-toolbox-divider lg:block">
        <SidebarNavigation components={components} />
      </aside>
      <MobileNavigation key={pathname} components={components} />
    </>
  );
}
