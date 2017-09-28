import { Component } from 'react';
import { findDOMNode } from 'react-dom';
import hasOwnProperty from './hasOwnProperty';

export default function getDOMElement(
  node: Component<any, any> | HTMLElement | null,
): HTMLElement | null {
  if (!node) {
    return node;
  }

  if (hasOwnProperty(node, 'getBoundingClientRect')) {
    return node as HTMLElement;
  }

  return findDOMNode(node);
}
