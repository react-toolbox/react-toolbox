import { FontIcon } from 'react-toolbox/font-icon';
import { GithubMark } from './brand-icons';

const repository = 'https://github.com/react-toolbox/react-toolbox';

async function getStarCount(): Promise<number | null> {
  try {
    const response = await fetch('https://api.github.com/repos/react-toolbox/react-toolbox', {
      headers: { Accept: 'application/vnd.github+json' },
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(3000),
    });
    if (!response.ok) return null;
    const data = await response.json();
    return Number.isSafeInteger(data.stargazers_count) && data.stargazers_count >= 0 ? data.stargazers_count : null;
  } catch {
    // The repository link stays useful if GitHub is unavailable or rate limited.
    return null;
  }
}

export default async function GithubLink() {
  const stars = await getStarCount();
  const count = stars?.toLocaleString('en-US');

  return (
    <a
      href={repository}
      className="inline-flex min-h-12 items-center gap-2 text-toolbox-text no-underline transition-colors hover:text-toolbox-primary"
      aria-label={count ? `React Toolbox on GitHub, ${count} stars` : 'React Toolbox on GitHub'}
      title={count ? `${count} GitHub stars · refreshed hourly` : 'React Toolbox on GitHub'}
    >
      <GithubMark className="size-5 shrink-0" />
      {count ? (
        <span className="inline-flex items-center gap-1 tabular-nums">
          <FontIcon
            value="star_border"
            className="text-base leading-none text-toolbox-text-secondary"
            aria-hidden="true"
          />
          {count}
          <span className="sr-only"> stars</span>
        </span>
      ) : (
        <span>GitHub</span>
      )}
    </a>
  );
}
