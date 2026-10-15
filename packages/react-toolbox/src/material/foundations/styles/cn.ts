import classNames, { type Argument } from 'classnames';
import { extendTailwindMerge } from 'tailwind-merge';

// Material typography uses independent font sizes and line heights. Arbitrary
// text sizes do not set leading, so retain an explicitly supplied line height.
const merge = extendTailwindMerge({
  override: { conflictingClassGroups: { 'font-size': [] } },
});

/** Consumer utilities win over component defaults, including theme slot overrides. */
export function cn(...inputs: Argument[]): string {
  return [
    ...new Set(
      merge(classNames(...inputs))
        .split(/\s+/)
        .filter(Boolean),
    ),
  ].join(' ');
}
export default cn;
