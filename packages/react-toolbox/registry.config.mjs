/** All source/output paths are relative to packages/react-toolbox, where the
 * source catalog lives. Installed targets remain relative to the consumer's
 * configured component alias, independent of this repository's workspace. */
export default {
  name: 'react-toolbox',
  homepage: 'https://react-toolbox.io',
  target: '@ui/react-toolbox',
  entries: '@ui/material',
  // Keep the private workspace's reference gallery working, but do not ship
  // these redundant routing wrappers in new source installations.
  retiredFamilies: ['link', 'navigation'],
  output: 'registry/public',
  defaultOrigin: 'https://react-toolbox.io',
};
