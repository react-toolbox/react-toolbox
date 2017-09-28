import getDOMElement from './getDOMElement';
import { Component } from 'react';

export default function getDOMParentElement(
  node: Component<any, any> | HTMLElement | null,
): HTMLElement | null {
  const givenElement = getDOMElement(node);
  return givenElement ? givenElement.parentElement : givenElement;
}
