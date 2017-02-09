import { path } from 'ramda';

export default function withOverride(key) {
  return props => path(['overrides', key], props);
}
