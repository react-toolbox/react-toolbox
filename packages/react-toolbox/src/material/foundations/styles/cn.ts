import classNames, { type Argument } from 'classnames';
import { extendTailwindMerge } from 'tailwind-merge';

// Material typography uses independent font sizes and line heights. Arbitrary
// text sizes do not set leading, so retain an explicitly supplied line height.
const merge = extendTailwindMerge({
  override: { conflictingClassGroups: { 'font-size': [] } },
  extend: {
    classGroups: {
      'font-size': [
        {
          text: [
            'toolbox',
            'toolbox-tiny',
            'toolbox-small',
            'toolbox-big',
            'toolbox-display-2',
            'toolbox-display-1',
            'toolbox-headline',
            'toolbox-title',
            'toolbox-subheading',
            'toolbox-body',
            'toolbox-body-desktop',
            'toolbox-caption',
          ],
        },
      ],
    },
  },
});

/** Consumer utilities win over component defaults, including style-slot overrides. */
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
