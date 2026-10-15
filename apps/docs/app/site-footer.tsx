export default function SiteFooter() {
  return (
    <footer className="border-t border-toolbox-divider bg-white">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-x-8 gap-y-2 px-4 py-4 text-xs leading-6 text-toolbox-text-secondary min-[600px]:px-6 lg:px-12">
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
