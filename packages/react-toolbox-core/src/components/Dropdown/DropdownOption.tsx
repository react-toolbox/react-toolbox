import * as React from 'react';
import { Component, ComponentClass, MouseEvent, ReactNode } from 'react';
import getPassThrough, { PassTroughFunction } from '../../utils/getPassThrough';

export interface DropdownOptionProps<T> {
  children: ReactNode;
  className?: string;
  disabled: boolean;
  innerRef(instance: HTMLElement): void;
  onClick(event: MouseEvent<any>, value: T): void;
  selected: boolean;
  value: T;
}

export interface OptionNodeProps {
  className?: string;
  disabled?: boolean;
  children: ReactNode;
  innerRef(instance: HTMLElement): void;
  onClick(event: MouseEvent<any>): void;
  selected: boolean;
}

export interface DefaultTemplateProps {
  className?: string;
  disabled?: boolean;
  children: ReactNode;
  innerRef(instance: HTMLElement): void;
  onClick(event: MouseEvent<any>): void;
  selected: boolean;
}

export interface DropdownOptionFactoryArgs<T> {
  OptionNode: ComponentClass<OptionNodeProps>;
  DefaultTemplate: ComponentClass<DefaultTemplateProps>;
  passthrough: PassTroughFunction<
    DropdownOptionProps<T>,
    'OptionNode' | 'DefaultTemplate'
  >;
}

export default function dropdownOptionFactory<T>({
  OptionNode,
  DefaultTemplate,
  passthrough,
}: DropdownOptionFactoryArgs<T>): ComponentClass<DropdownOptionProps<T>> {
  const passProps = getPassThrough(passthrough);
  return class DropdownOption extends Component<DropdownOptionProps<T>, {}> {
    rootNode: HTMLElement | null = null;

    handleClick = (event: MouseEvent<any>) => {
      if (this.props.onClick) {
        this.props.onClick(event, this.props.value);
      }
    };

    render() {
      const {
        children,
        className,
        disabled,
        innerRef,
        onClick,
        selected,
        value,
        ...rest,
      } = this.props;
      let content;

      if (!children || typeof children === 'string') {
        content = (
          <DefaultTemplate
            {...passProps(this.props, 'DefaultTemplate', this)}
            className={className}
            disabled={disabled}
            innerRef={innerRef}
            onClick={this.handleClick}
            selected={selected}
            {...rest}
          >
            {children}
          </DefaultTemplate>
        );
      }

      return (
        <OptionNode
          {...passProps(this.props, 'OptionNode', this)}
          className={className}
          disabled={disabled}
          innerRef={innerRef}
          onClick={this.handleClick}
          selected={selected}
          {...rest}
        >
          {content || children}
        </OptionNode>
      );
    }
  };
}
