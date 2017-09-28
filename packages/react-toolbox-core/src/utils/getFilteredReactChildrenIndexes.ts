import { Children, ReactChildren, ReactChild } from 'react';

export default function(
  children: ReactChildren,
  predicate: (child: ReactChild) => boolean,
): Array<number> {
  const result: Array<number> = [];

  Children.forEach(children, (entry, idx) => {
    if (predicate && predicate.call(this, entry, idx)) {
      result.push(idx);
    }
  });
  return result;
}
