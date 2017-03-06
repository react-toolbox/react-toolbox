import React from 'react';

/**
 * Looks through a collection of React children elements, filtering them
 * according to the predicate passed.
 *
 * @param {Array/Object} children - colleciton of >=1 react elements
 * @param {function} predicate - function returning true when provided with an entry as argument
 */
export default function (children, predicate) {
  if (children) {
    const result = [];
    React.Children.forEach(children, (entry, idx) => {
      if (predicate && predicate.call(this, entry, idx)) {
        result.push(entry);
      }
    });
    return result;
  }

  return undefined;
}
