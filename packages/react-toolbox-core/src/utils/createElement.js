import React from 'react';

export default function createElement(displayName, tagName = 'div') {
  const fn = (props, ...children) =>
    React.createElement(tagName, props, ...children);
  fn.displayName = displayName;
  return fn;
}
