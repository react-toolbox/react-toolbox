import ProjectStory from './project-story';

export default function SiteFooter() {
  return (
    <footer className="documentation-content shrink-0 border-t border-toolbox-divider bg-white">
      <div
        className="flex w-full flex-wrap items-center justify-between gap-x-8 gap-y-2 px-4 py-4 text-xs leading-6 text-toolbox-text-secondary toolbox-desktop:px-6"
      >
        <p>
          Made by{' '}
          <a
            className="inline-flex min-h-toolbox-touch items-center font-medium text-toolbox-text hover:text-toolbox-primary"
            href="https://javivelasco.com"
          >
            Javi Velasco
          </a>
          .
        </p>
        <div className="flex flex-wrap items-center gap-x-6">
          <ProjectStory />
          <a
            className="inline-flex min-h-toolbox-touch items-center hover:text-toolbox-primary"
            href="https://github.com/react-toolbox/react-toolbox/blob/dev/LICENSE"
          >
            MIT licensed
          </a>
        </div>
      </div>
    </footer>
  );
}
