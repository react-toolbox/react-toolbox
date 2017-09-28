import * as React from 'react';
import { Component, ComponentClass, ReactNode } from 'react';
import getPassThrough, { PassTroughFunction } from '../../utils/getPassThrough';

export interface ListNodeProps {
  className?: string;
}

export interface ListFactoryArgs {
  ListNode: ComponentClass<ListNodeProps>;
  passthrough: PassTroughFunction<ListProps, 'ListNode'>;
}

export interface ListProps {
  children: ReactNode;
  className?: string;
}

export default function listFactory({
  ListNode,
  passthrough,
}: ListFactoryArgs): ComponentClass<ListProps> {
  const passProps = getPassThrough(passthrough);
  return class List extends Component<ListProps, {}> {
    render() {
      const { className, children, ...rest } = this.props;
      return (
        <ListNode
          {...passProps(this.props, 'ListNode', this)}
          className={className}
          {...rest}
        >
          {children}
        </ListNode>
      );
    }
  };
}
