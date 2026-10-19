'use client';

import { useId } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { List, ListDivider, ListItem, ListSubHeader } from 'react-toolbox/list';
export type ComponentLink = { slug: string; title: string };

const guides = [
  { href: '/docs', title: 'Introduction' },
  { href: '/docs/installation', title: 'Installation' },
  { href: '/docs/theming', title: 'Theming' },
  { href: '/docs/components', title: 'All components' },
];

export default function DocsSidebar({ components, onNavigate }: { components: ComponentLink[]; onNavigate?: () => void }) {
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
            className={`flex min-h-toolbox-touch min-w-0 flex-1 items-center px-4 toolbox-desktop:px-6 min-[1025px]:px-6 text-sm font-medium no-underline outline-none focus-visible:bg-(--list-item-hover-color) forced-colors:focus-visible:[outline:2px_solid_Highlight] forced-colors:focus-visible:-outline-offset-2 ${active ? 'text-toolbox-primary' : 'text-toolbox-text'}`}
          >
            {title}
          </Link>
        }
      />
    );
  }
  return (
    <nav aria-label="Documentation sidebar" className="toolbox-desktop:[--list-horizontal-padding:24px] min-[1025px]:[--list-horizontal-padding:24px] min-[1025px]:py-8">
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
