import * as React from 'react';
import { Component, ComponentClass, MouseEvent, ReactNode } from 'react';
import getPassThrough, { PassTroughFunction } from '../../utils/getPassThrough';
import { OverlayProps } from '../Overlay';

export interface DialogFactoryArgs {
  Overlay: ComponentClass<OverlayProps>;
  WrapperNode: ComponentClass<WrapperNodeProps>;
  passthrough: PassTroughFunction<
    DialogProps,
    'Overlay' | 'ContainerNode' | 'BackdropNode'
  >;
}

export interface DialogProps {
  active: boolean;
  children: ReactNode;
  onOverlayClick(event: MouseEvent<any>): void;
}

export interface WrapperNodeProps {
  active: boolean;
}

export default function dialogFactory({
  Overlay,
  WrapperNode,
  passthrough,
}: DialogFactoryArgs): ComponentClass<DialogProps> {
  const passProps = getPassThrough(passthrough);
  return class Dialog extends Component<DialogProps, void> {
    render() {
      const { active, children, onOverlayClick } = this.props;
      return (
        <Overlay
          {...passProps(this.props, 'Overlay', this)}
          active={active}
          onClick={onOverlayClick}
        >
          <WrapperNode active={active}>{children}</WrapperNode>
        </Overlay>
      );
    }
  };
}
