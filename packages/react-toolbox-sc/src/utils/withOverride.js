import path from 'ramda/src/path';

export default function withOverride(key) {
  return props => path(['overrides', key], props);
}
