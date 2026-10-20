import Link from 'next/link';
import { AppBar } from 'react-toolbox/app-bar';
import { ToolboxMark } from './brand-icons';
import GithubLink from './github-link';

export default function DocsHeader({ documentation = false }: { documentation?: boolean }) {
  return (
    <AppBar
      flat
      fixed={documentation}
      className={`${documentation ? '' : 'sticky top-0'} z-30 border-b border-toolbox-divider [--appbar-color:var(--rt-color-white)] [--appbar-contrast:var(--rt-color-text)]`}
    >
      <div className="flex w-full items-center justify-between gap-3">
        <Link
          className="flex min-h-toolbox-touch min-w-toolbox-touch shrink-0 items-center gap-2 text-toolbox-title no-underline min-[600px]:gap-3"
          href="/"
          aria-label="React Toolbox home"
        >
          <ToolboxMark className="size-8 text-toolbox-primary" />
          <span className="hidden min-[600px]:inline">React Toolbox</span>
        </Link>
        <nav
          className="flex items-center gap-4 text-xs text-toolbox-text-secondary min-[600px]:gap-8 min-[600px]:text-sm"
          aria-label="Main navigation"
        >
          <Link
            className={`inline-flex min-h-toolbox-touch items-center no-underline hover:text-toolbox-primary ${documentation ? 'font-medium text-toolbox-primary' : ''}`}
            href="/docs"
            aria-current={documentation ? 'true' : undefined}
          >
            Documentation
          </Link>
          <GithubLink />
        </nav>
      </div>
    </AppBar>
  );
}
