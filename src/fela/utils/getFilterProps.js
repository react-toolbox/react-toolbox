import { assoc, concat, keys } from 'ramda';

export default function getFilterProps(toRemove = []) {
  const _toRemove = concat(['innerRef', 'overrides'], toRemove);
  return props => keys(props).reduce((result, prop) => (
    _toRemove.indexOf(prop) === -1
      ? assoc(prop, props[prop], result)
      : result
  ), {});
}
