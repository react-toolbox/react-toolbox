import * as React from 'react';
import { SFC, ReactElement } from 'react';

export default function createElement(
  displayName: string,
  tagName: string = 'div',
): SFC<any> {
  const fn: SFC<any> = (props: any, ...children): ReactElement<any> =>
    React.createElement(tagName, props, ...children);
  fn.displayName = displayName;
  return fn;
}
