import { ReactChild } from 'react';
import { Component } from '../types';

export default function isComponentOfType(classType: Component<any>, reactElement: ReactChild): boolean {
  if (typeof reactElement === 'string' || typeof reactElement === 'number' || !reactElement) return false;
  return reactElement.type === classType;
}
