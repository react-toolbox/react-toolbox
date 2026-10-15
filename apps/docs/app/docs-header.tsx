import Link from 'next/link';
import { AppBar } from 'react-toolbox';
import { ToolboxMark } from './brand-icons';
import GithubLink from './github-link';

export default function DocsHeader({ documentation = false }: { documentation?: boolean }) {
  return (
    <AppBar
      flat
      className="sticky top-0 z-30 border-b border-toolbox-divider [--appbar-color:var(--rt-color-white)] [--appbar-contrast:var(--rt-color-text)] [--appbar-h-padding:0px] [--appbar-h-padding-mobile:0px]"
      theme={{
        inner: 'justify-between gap-3 px-4 min-[600px]:px-6',
      }}
    >
      <Link
        className="flex min-h-12 shrink-0 items-center gap-2 text-base font-medium tracking-tight no-underline sm:gap-3"
        href="/"
        aria-label="React Toolbox home"
      >
        <ToolboxMark className="size-8 text-toolbox-primary" />
        <span className="hidden min-[380px]:inline">React Toolbox</span>
      </Link>
      <nav
        className="flex items-center gap-4 text-xs text-toolbox-text-secondary sm:gap-8 sm:text-sm"
        aria-label="Main navigation"
      >
        <Link
          className={`inline-flex min-h-12 items-center no-underline hover:text-toolbox-primary ${documentation ? 'font-medium text-toolbox-primary' : ''}`}
          href="/docs"
          aria-current={documentation ? 'true' : undefined}
        >
          Documentation
        </Link>
        <GithubLink />
      </nav>
    </AppBar>
  );
}
