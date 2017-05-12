import { Component } from 'react';
import { pick } from 'ramda';

export interface PassTroughFunction<P, N> {
  (prop: P, nodeName: N, instance: Component<P, any>): object
};

export default function getPassThroughProps<P, N>(
  option: string[] | PassTroughFunction<P, N> = []
): PassTroughFunction<P, N> {
  return (props, node, instance) => (
    Array.isArray(option)
      ? pick(option, props)
      : option(props, node, instance)
  );
}
