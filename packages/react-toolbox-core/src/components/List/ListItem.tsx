import * as React from 'react';
import { Component, ComponentClass, MouseEvent, ReactNode } from 'react';
import getPassThrough, { PassTroughFunction } from '../../utils/getPassThrough';

export interface ListItemNodeProps {
  className?: string;
  disabled?: boolean;
  onClick(event: MouseEvent<any>): void;
  onMouseDown(event: MouseEvent<any>): void;
  onMouseEnter(event: MouseEvent<any>): void;
  onMouseLeave(event: MouseEvent<any>): void;
}

export interface ListItemFactoryArgs<T> {
  ListItemNode: ComponentClass<ListItemNodeProps>;
  passthrough: PassTroughFunction<ListItemProps<T>, 'ListItemNode'>;
}

export interface ListItemProps<T> {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?(event: MouseEvent<any>, value: T): void;
  onMouseDown?(event: MouseEvent<any>, value: T): void;
  onMouseEnter?(event: MouseEvent<any>, value: T): void;
  onMouseLeave?(event: MouseEvent<any>, value: T): void;
  value: T;
}

export default function listItemFactory<T>({
  ListItemNode,
  passthrough,
}: ListItemFactoryArgs<T>): ComponentClass<ListItemProps<T>> {
  const passProps = getPassThrough(passthrough);
  return class ListItem extends Component<ListItemProps<T>, {}> {
    static defaultProps = {
      disabled: false,
    };

    handleClick = (event: MouseEvent<any>) => {
      const { disabled, onClick, value } = this.props;
      if (!disabled && onClick) {
        onClick(event, value);
      }
    };

    handleMouseDown = (event: MouseEvent<any>) => {
      const { disabled, onMouseDown, value } = this.props;
      if (!disabled && onMouseDown) {
        onMouseDown(event, value);
      }
    };

    handleMouseEnter = (event: MouseEvent<any>) => {
      const { disabled, onMouseEnter, value } = this.props;
      if (!disabled && onMouseEnter) {
        onMouseEnter(event, value);
      }
    };

    handleMouseLeave = (event: MouseEvent<any>) => {
      const { disabled, onMouseLeave, value } = this.props;
      if (!disabled && onMouseLeave) {
        onMouseLeave(event, value);
      }
    };

    render() {
      const {
        children,
        className,
        disabled,
        onClick,
        onMouseDown,
        onMouseEnter,
        onMouseLeave,
        value,
        ...rest,
      } = this.props;
      return (
        <ListItemNode
          {...passProps(this.props, 'ListItemNode', this)}
          className={className}
          disabled={disabled}
          onClick={this.handleClick}
          onMouseDown={this.handleMouseDown}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
          {...rest}
        >
          {children}
        </ListItemNode>
      );
    }
  };
}
