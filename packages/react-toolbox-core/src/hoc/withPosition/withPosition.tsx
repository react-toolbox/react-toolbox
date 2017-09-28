import * as React from 'react';
import { Component, ComponentClass } from 'react';
import getViewport from '../../utils/getViewport';
import getDOMParentElement from '../../utils/getDOMParentElement';

export type PositionAuto = 'auto';
export type PositionBottom = 'bottom';
export type PositionCenter = 'center';
export type PositionLeft = 'left';
export type PositionRight = 'right';
export type PositionTop = 'top';
export type Position =
  | PositionAuto
  | PositionBottom
  | PositionCenter
  | PositionLeft
  | PositionRight
  | PositionTop;

export type OrientationHorizontal = 'horizontal';
export type OrientationVertical = 'vertical';
export type Orientation = OrientationHorizontal | OrientationVertical;

export const POSITIONS = {
  AUTO: 'auto' as PositionAuto,
  BOTTOM: 'bottom' as PositionBottom,
  CENTER: 'center' as PositionCenter,
  LEFT: 'left' as PositionLeft,
  RIGHT: 'right' as PositionRight,
  TOP: 'top' as PositionTop,
};

export const ORIENTATIONS = {
  VERTICAL: 'vertical' as OrientationVertical,
  HORIZONTAL: 'horizontal' as OrientationHorizontal,
};

export interface WithPositionProps {
  active?: boolean;
  align?: Position;
  orientation?: Orientation;
  position?: Position;
  providerNode?: HTMLElement | null;
}

export interface WithPositionArgs {
  align?: Position;
  orientation?: Orientation;
  position?: Position;
}

export type WithPositionHOC = <T>(
  decorated: ComponentClass<T & WithPositionProps>,
) => ComponentClass<T>;

export default function withPosition(
  {
    align: defaultAlign,
    orientation: defaultOrientation,
    position: defaultPosition,
  }: WithPositionArgs = {},
): WithPositionHOC {
  return function<T>(DecoratedComponent) {
    return class PositionedComponent extends Component<
      T & WithPositionProps,
      {}
    > {
      static defaultProps = {
        align: defaultAlign || POSITIONS.AUTO,
        orientation: defaultOrientation || ORIENTATIONS.VERTICAL,
        position: defaultPosition || POSITIONS.AUTO,
      } as any;

      calculatedAlign: Position | null = null;
      calculatedPosition: Position | null = null;
      providerNode?: HTMLElement | null = null;

      componentDidMount() {
        this.calculateAlignAndPosition(this.props);
        if (this.props.active) {
          this.forceUpdate();
        }
      }

      componentWillUpdate(nextProps) {
        this.calculateAlignAndPosition(nextProps);
      }

      calculateAlignAndPosition = (props: WithPositionProps) => {
        if (
          this.providerNode &&
          props.active === true &&
          (props.align === POSITIONS.AUTO || props.position === POSITIONS.AUTO)
        ) {
          const { height: wh, width: ww } = getViewport();
          const {
            top,
            left,
            height,
            width,
          } = this.providerNode.getBoundingClientRect();

          this.calculatedAlign =
            this.props.orientation === ORIENTATIONS.VERTICAL
              ? left <= ww / 2 - width / 2 ? POSITIONS.LEFT : POSITIONS.RIGHT
              : top > wh / 2 - height / 2 ? POSITIONS.BOTTOM : POSITIONS.TOP;

          this.calculatedPosition =
            this.props.orientation === ORIENTATIONS.VERTICAL
              ? top > wh / 2 - height / 2 ? POSITIONS.TOP : POSITIONS.BOTTOM
              : left <= ww / 2 - width / 2 ? POSITIONS.RIGHT : POSITIONS.LEFT;
        }
      };

      handleProviderRef = node => {
        this.providerNode = this.props.providerNode
          ? this.props.providerNode
          : getDOMParentElement(node);
      };

      render() {
        const {
          active,
          align,
          orientation,
          position,
          providerNode,
          ...other,
        } = this.props as any;
        const calcAlign =
          align === POSITIONS.AUTO ? this.calculatedAlign : align;
        const calcPosition =
          position === POSITIONS.AUTO ? this.calculatedPosition : position;
        return (
          <DecoratedComponent
            active={active}
            align={calcAlign}
            position={calcPosition}
            providerNode={this.providerNode}
            ref={this.handleProviderRef}
            {...other}
          />
        );
      }
    };
  };
}
