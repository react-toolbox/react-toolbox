import { Children, ReactChildren, ReactChild } from 'react';

export default function(
  children: ReactChildren,
  predicate: (child: ReactChild) => boolean,
): Partial<ReactChildren> {
  if (children) {
    const result: Array<ReactChild> = [];

    Children.forEach(children, (entry, idx) => {
      if (predicate && predicate.call(this, entry, idx)) {
        result.push(entry);
      }
    });
    return result;
  }

  return [];
}
