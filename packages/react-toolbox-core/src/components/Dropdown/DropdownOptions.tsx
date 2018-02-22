import * as React from 'react';
import { memoize } from 'ramda';
import {
  Children,
  cloneElement,
  Component,
  ComponentClass,
  MouseEvent,
  ReactChildren,
  ReactElement,
} from 'react';
import { findDOMNode } from 'react-dom';
import getPassThrough, { PassTroughFunction } from '../../utils/getPassThrough';
import isComponentOfType from '../../utils/isComponentOfType';
import getStyle from '../../utils/getStyle';
import { DropdownOptionProps } from './DropdownOption';

export interface DropdownOptionsProps<T> {
  active: boolean;
  children: ReactChildren;
  className?: string;
  isDefaultTemplate: boolean;
  isOptionSelected?(current: T, item: T): boolean;
  onClick?(event: MouseEvent<any>): void;
  onClickOption(event: MouseEvent<any>, value: T): void;
  onClickOutside?(): void;
  value: T;
}

export interface WrapperNodeProps {
  active: boolean;
  isDefaultTemplate: boolean;
  getRef(node: HTMLElement): void;
  onClick?(event: MouseEvent<any>): void;
  onClickOutside?(): void;
  x: number;
  y: number;
}

export interface DropdownOptionsFactoryArgs<T> {
  InnerNode: ComponentClass<{}>;
  WrapperNode: ComponentClass<WrapperNodeProps>;
  DropdownOption: ComponentClass<DropdownOptionProps<T>>;
  passthrough: PassTroughFunction<DropdownOptionsProps<T>, 'WrapperNode'>;
}

export default function dropdownOptionsFactory<T>({
  InnerNode,
  WrapperNode,
  DropdownOption,
  passthrough,
}: DropdownOptionsFactoryArgs<T>): ComponentClass<DropdownOptionsProps<T>> {
  const passProps = getPassThrough(passthrough);
  return class DropdownOptions extends Component<DropdownOptionsProps<T>, {}> {
    positioningTimeout;
    optionsNode;
    rootNode;

    state = {
      position: { x: 0, y: 0 },
    };

    componentDidMount() {
      if (this.props.active) {
        this.syncPosition();
      }
    }

    componentDidUpdate(prevProps) {
      if (!prevProps.active && this.props.active) {
        this.syncPosition();
      }
    }

    componentWillUnmount() {
      clearTimeout(this.positioningTimeout);
    }

    syncPosition = () => {
      this.positioningTimeout = setTimeout(() => {
        this.setState({ position: this.calculatePosition() });
      });
    };

    calculatePosition = () => {
      const currentIndex = this.getValues().reduce(
        (res, value, idx) =>
          this.isOptionSelected(this.props.value, value) ? idx : res,
        -1,
      );

      const optionsElement = findDOMNode(this.rootNode);
      const optionsSize = optionsElement.getBoundingClientRect();
      // console.log('anda?', optionsSize);

      const alignToIndex = currentIndex !== -1 ? currentIndex : 0;
      const optionElement =
        this[`option${alignToIndex}`] &&
        findDOMNode(this[`option${alignToIndex}`]);
      const alignTo = optionElement || optionsElement;

      // // Calculate scroll for the inner list node
      const alignDimensions = alignTo.getBoundingClientRect();
      const itemMiddleLine = alignDimensions.top + alignDimensions.height / 2;
      const listMiddleLine = optionsSize.top + optionsSize.height / 2;
      const difference = itemMiddleLine - listMiddleLine;
      console.log('SCROLL IS', difference);
      optionsElement.scrollTop = difference > 0 ? difference : 0;

      // Once scroll is set, calculate the position
      const itemToAlign = alignTo.getBoundingClientRect();
      const middleItem = itemToAlign.top + itemToAlign.height / 2;
      const positionX = Math.round(
        parseInt(getStyle(alignTo, 'padding-left'), 10) * -1,
      );
      const positionY = Math.round(optionsSize.top - middleItem - 0); // 0 is the filter offset

      return { x: positionX, y: positionY };
      // // If the current element is below the middle line of the list, open from bottom
      // const origin = positionY * -1 > optionsSize.height / 2 ? ORIGINS.BOTTOM_LEFT
      //    : ORIGINS.TOP_LEFT;
      // return { position: { x: positionX, y: positionY }, origin };
    };

    getValues = () =>
      Children.toArray(this.props.children)
        .filter(child => isComponentOfType(DropdownOption, child))
        .map(
          (child: ReactElement<DropdownOptionProps<T>>) => child.props.value,
        );

    handleClick = (event: MouseEvent<any>) => {
      event.stopPropagation();
      if (this.props.onClick) {
        this.props.onClick(event);
      }
    };

    handleWrapperRef = node => {
      this.rootNode = node;
    };

    handleOptionClick = (event, value) => {
      this.props.onClickOption(event, value);
    };

    handleOptionRef = memoize(idx => node => {
      this[`option${idx}`] = node;
    });

    isOptionSelected = (current: T, item: T) =>
      this.props.isOptionSelected
        ? this.props.isOptionSelected(current, item)
        : current === item;

    renderOption = (
      option: ReactElement<DropdownOptionProps<T>>,
      values: Array<T>,
    ) => {
      const idx = values.indexOf(option.props.value);
      return cloneElement(option, {
        onClick: this.handleOptionClick,
        innerRef: this.handleOptionRef(idx),
        selected: this.isOptionSelected(this.props.value, option.props.value),
      });
    };

    renderOptions = () => {
      const values = this.getValues();
      return Children.toArray(this.props.children).map(child => {
        if (isComponentOfType(DropdownOption, child)) {
          return this.renderOption(
            child as ReactElement<DropdownOptionProps<T>>,
            values,
          );
        }
        return child;
      });
    };

    render() {
      const {
        active,
        isDefaultTemplate,
        // onClick,
        onClickOutside,
      } = this.props;
      const { position } = this.state;
      return (
        <WrapperNode
          {...passProps(this.props, 'WrapperNode', this)}
          active={active}
          onClick={this.handleClick}
          onClickOutside={onClickOutside}
          isDefaultTemplate={isDefaultTemplate}
          getRef={this.handleWrapperRef}
          x={position.x}
          y={position.y}
        >
          {this.renderOptions()}
        </WrapperNode>
      );
    }
  };
}
