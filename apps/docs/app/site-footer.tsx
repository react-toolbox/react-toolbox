export default function SiteFooter({ documentation = false }: { documentation?: boolean }) {
  return (
    <footer className="border-t border-toolbox-divider bg-white">
      <div
        className={`flex w-full flex-wrap items-center justify-between gap-x-8 gap-y-2 px-4 py-4 text-xs leading-6 text-toolbox-text-secondary ${documentation ? 'mx-auto max-w-6xl min-[600px]:px-6 lg:px-12' : 'toolbox-desktop:px-6'}`}
      >
        <p>
          Made by{' '}
          <a
            className="inline-flex min-h-toolbox-touch items-center font-medium text-toolbox-text hover:text-toolbox-primary"
            href="https://github.com/javivelasco"
          >
            Javi Velasco
          </a>
          .
        </p>
        <a
          className="inline-flex min-h-toolbox-touch items-center hover:text-toolbox-primary"
          href="https://github.com/react-toolbox/react-toolbox/blob/dev/LICENSE"
        >
          Open source. MIT licensed.
        </a>
      </div>
    </footer>
  );
}
