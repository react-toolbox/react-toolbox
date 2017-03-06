import merge from 'ramda/src/merge';
import path from 'ramda/src/path';

const noop = () => ({});

function getPropsOverrides(tagName, props) {
  const overrides = path(['overrides', tagName], props) || noop;
  return overrides(props);
}

export default function withOverrides(tagName, defaultOverrides = noop) {
  return props => merge(
    defaultOverrides(props),
    getPropsOverrides(tagName, props),
  );
}
