import * as React from 'react';
import {
  Component,
  ComponentClass,
  cloneElement,
  MouseEvent,
  ReactChildren,
  ReactElement,
  FocusEvent,
} from 'react';
import getPassThrough, { PassTroughFunction } from '../../utils/getPassThrough';
import filterReactChildren from '../../utils/filterReactChildren';
import isComponentOfType from '../../utils/isComponentOfType';
import { DropdownOptionProps } from './DropdownOption';
import { DropdownOptionsProps } from './DropdownOptions';

export interface DropdownProps<T> {
  active: boolean;
  children: ReactChildren;
  className?: string;
  disabled: boolean;
  error: Array<string> | string | boolean;
  fit: boolean;
  isOptionSelected?(current: T, item: T): boolean;
  label: string;
  name: string;
  onChange(value: T): void;
  onClick(event: MouseEvent<any>): void;
  onClickOutside?(): void;
  onFocus(): void;
  placeholder?: string;
  showError?: boolean;
  value: T;
}

export interface ValueNodeProps {
  onClick(event: MouseEvent<any>): void;
}

export interface LabelNodeProps {
  hasValue: boolean;
}

export interface WrapperNodeProps {
  onFocus(event: FocusEvent<any>): void;
}

export interface DropdownFactoryArgs<T> {
  DropdownOption: ComponentClass<DropdownOptionProps<T>>;
  DropdownOptions: ComponentClass<DropdownOptionsProps<T>>;
  DefaultTemplate: ComponentClass<{}>;
  PlaceholderNode: ComponentClass<{}>;
  LabelNode: ComponentClass<LabelNodeProps>;
  WrapperNode: ComponentClass<WrapperNodeProps>;
  ValueNode: ComponentClass<ValueNodeProps>;
  passthrough: PassTroughFunction<
    DropdownProps<T>,
    'WrapperNode' | 'DropdownOptions'
  >;
}

export default function dropdownFactory<T>({
  DefaultTemplate,
  DropdownOption,
  DropdownOptions,
  LabelNode,
  PlaceholderNode,
  ValueNode,
  WrapperNode,
  passthrough,
}: DropdownFactoryArgs<T>): ComponentClass<DropdownProps<T>> {
  const passProps = getPassThrough(passthrough);

  function getSelectedDropdownOption(props: DropdownProps<T>) {
    return filterReactChildren(props.children, child => {
      if (isComponentOfType(DropdownOption, child)) {
        const option = child as ReactElement<DropdownOptionProps<T>>;
        return (
          !option.props.disabled &&
          props.value &&
          props.value === option.props.value
        );
      }

      return false;
    })[0];
  }

  function getDropdownOptionValue(
    option: ReactElement<DropdownOptionProps<T>> | undefined,
  ) {
    return option ? option.props.children : undefined;
  }

  return class Dropdown extends Component<DropdownProps<T>, {}> {
    handleClick = (event: MouseEvent<any>) => {
      this.props.onClick(event);
    };

    handleClickOption = (event: MouseEvent<any>, value: T) => {
      this.props.onChange(value);
    };

    isOptionSelected = (current: T, item: T) =>
      this.props.isOptionSelected
        ? this.props.isOptionSelected(current, item)
        : current === item;

    getSelectedDropdownOption = () =>
      filterReactChildren(this.props.children, child => {
        if (isComponentOfType(DropdownOption, child)) {
          const option = child as ReactElement<DropdownOptionProps<T>>;
          return (
            !option.props.disabled &&
            this.props.value &&
            this.isOptionSelected(this.props.value, option.props.value)
          );
        }

        return false;
      })[0];

    render() {
      const {
        active,
        children,
        isOptionSelected,
        label,
        onClickOutside,
        onFocus,
        placeholder,
        value,
      } = this.props;

      const selectedValue = getDropdownOptionValue(
        getSelectedDropdownOption(this.props),
      );

      const isDefaultTemplate = typeof selectedValue === 'string';

      const hasValue = !!selectedValue;
      const renderSelected = isDefaultTemplate ? (
        <DefaultTemplate>{selectedValue}</DefaultTemplate>
      ) : (
        selectedValue
      );

      const renderValue = selectedValue ? (
        renderSelected
      ) : (
        <PlaceholderNode>{placeholder}</PlaceholderNode>
      );

      return (
        <WrapperNode
          {...passProps(this.props, 'WrapperNode', this)}
          onFocus={onFocus}
        >
          <LabelNode hasValue={hasValue}>{label}</LabelNode>
          <ValueNode onClick={this.handleClick}>
            {cloneElement(renderValue as ReactElement<any>, {
              selected: false,
            })}
            <DropdownOptions
              {...passProps(this.props, 'DropdownOptions', this)}
              active={active}
              onClickOption={this.handleClickOption}
              onClickOutside={onClickOutside}
              isOptionSelected={isOptionSelected}
              isDefaultTemplate={isDefaultTemplate}
              value={value}
            >
              {children}
            </DropdownOptions>
          </ValueNode>
        </WrapperNode>
      );
    }
  };
}
