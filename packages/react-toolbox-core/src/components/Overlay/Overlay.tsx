import * as React from 'react';
import { Component, ComponentClass, MouseEvent, ReactNode } from 'react';
import getPassThrough, { PassTroughFunction } from '../../utils/getPassThrough';
import { PortalType } from '../Portal';

export interface ContainerNodeProps {
  active: boolean;
}

export interface BackdropNodeProps {
  active: boolean;
  onClick(event: MouseEvent<any>);
}

export interface OverlayFactoryArgs {
  Portal: PortalType;
  ContainerNode: ComponentClass<ContainerNodeProps>;
  BackdropNode: ComponentClass<BackdropNodeProps>;
  passthrough: PassTroughFunction<
    OverlayProps,
    'Portal' | 'ContainerNode' | 'BackdropNode'
  >;
}

export interface OverlayProps {
  active: boolean;
  children: ReactNode;
  container?: HTMLElement | (() => HTMLElement);
  onClick(event: MouseEvent<any>);
  onPortalMount(): void;
  onPortalUnmount(): void;
  parentId?: string;
}

export default function overlayFactory({
  BackdropNode,
  ContainerNode,
  Portal,
  passthrough,
}: OverlayFactoryArgs): ComponentClass<OverlayProps> {
  const passProps = getPassThrough(passthrough);
  return class Overlay extends Component<OverlayProps, void> {
    render() {
      const {
        active,
        children,
        container,
        onClick,
        onPortalMount,
        onPortalUnmount,
        parentId,
      } = this.props;

      return (
        <Portal
          {...passProps(this.props, 'Portal', this)}
          container={container}
          onMount={onPortalMount}
          onUnmount={onPortalUnmount}
          parentId={parentId}
        >
          <ContainerNode
            {...passProps(this.props, 'ContainerNode', this)}
            active={active}
          >
            <BackdropNode
              {...passProps(this.props, 'BackdropNode', this)}
              active={active}
              onClick={onClick}
            />
            {children}
          </ContainerNode>
        </Portal>
      );
    }
  };
}
