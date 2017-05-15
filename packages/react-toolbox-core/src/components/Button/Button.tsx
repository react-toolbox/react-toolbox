import * as React from 'react';
import { ComponentClass, MouseEvent, ReactNode, PureComponent, PropTypes } from 'react';
import getPassThrough, { PassTroughFunction } from '../../utils/getPassThrough';
import { Component }  from '../../types';

export interface ButtonProps {
  accent: boolean,
  children: ReactNode,
  flat: boolean,
  floating: boolean,
  href: string,
  innerRef: (instance: HTMLElement) => void,
  label: string,
  mini: boolean,
  neutral: boolean,
  onMouseLeave: (event: MouseEvent<any>) => void,
  onMouseUp: (event: MouseEvent<any>) => void,
  primary: boolean,
  raised: boolean,
  toggle: boolean,
  type: string,
}

export interface ButtonNodeProps {
  flat: boolean,
  innerRef: (instance: HTMLElement) => void,
  onMouseLeave: (event: MouseEvent<any>) => void,
  onMouseUp: (event: MouseEvent<any>) => void,
  primary: boolean,
  type: string | null,
}

export interface ButtonFactoryArgs {
  ButtonNode: Component<ButtonNodeProps>,
  LinkNode: Component<ButtonNodeProps>,
  passthrough: PassTroughFunction<ButtonProps, 'ButtonNode' | 'LinkNode'>
}

export type Button = ComponentClass<ButtonProps>;

const buttonFactory = ({ ButtonNode, LinkNode, passthrough }: ButtonFactoryArgs): Button => {
  const passProps = getPassThrough(passthrough);
  return class Button extends PureComponent<ButtonProps, void> {
    static defaultProps = {
      accent: false,
      flat: false,
      floating: false,
      mini: false,
      neutral: true,
      primary: false,
      raised: false,
      type: 'button',
    };

    rootNode: HTMLElement | null = null;

    handleMouseUp = event => {
      if (this.rootNode) this.rootNode.blur();
      if (this.props.onMouseUp) {
        this.props.onMouseUp(event);
      }
    };

    handleMouseLeave = event => {
      if (this.rootNode) this.rootNode.blur();
      if (this.props.onMouseLeave) {
        this.props.onMouseLeave(event);
      }
    };

    handleInnerRef = node => {
      const { innerRef } = this.props;
      this.rootNode = node;
      if (innerRef) innerRef(node);
    };

    render() {
      const nodeTag = this.props.href ? 'LinkNode' : 'ButtonNode';
      const ButtonElement = this.props.href ? LinkNode : ButtonNode;
      const { children, primary, flat, label, type, ...others } = this.props;
      const isPrimary = primary || (!others.accent && !others.neutral);
      const isNoneOther = !others.raised && !others.floating && !others.toggle;
      const isFlat = flat || isNoneOther;

      return (
        <ButtonElement
          {...others}
          {...passProps(this.props, nodeTag, this)}
          flat={isFlat}
          innerRef={this.handleInnerRef}
          onMouseLeave={this.handleMouseLeave}
          onMouseUp={this.handleMouseUp}
          primary={isPrimary}
          type={!this.props.href ? type : null}
        >
          {children}
          {label}
        </ButtonElement>
      );
    }
  }
};

export default buttonFactory;
