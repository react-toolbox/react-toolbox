import { Component, createElement, ComponentClass, ReactNode } from 'react';
import getPassThrough, { PassTroughFunction } from '../../utils/getPassThrough';
import measureElement from '../../utils/measureElement';

export type OriginTopLeft = 'topLeft';
export type OriginTopRight = 'topRight';
export type OriginBottomLeft = 'bottomLeft';
export type OriginBottomRight = 'bottomRight';

export type Origin =
  | OriginTopLeft
  | OriginTopRight
  | OriginBottomLeft
  | OriginBottomRight;

export const ORIGINS = {
  BOTTOM_LEFT: 'bottomLeft' as OriginBottomLeft,
  BOTTOM_RIGHT: 'bottomRight' as OriginBottomRight,
  TOP_LEFT: 'topLeft' as OriginTopLeft,
  TOP_RIGHT: 'topRight' as OriginTopRight,
};

export interface InnerNodeProps {
  active: boolean;
  className?: string;
  height?: number;
  innerRef(instance: HTMLElement): void;
  origin: Origin;
  width?: number;
}

export interface WrapperNodeProps {
  height?: number;
  width?: number;
}

export interface OutlineNodeProps {
  active: boolean;
  height?: number;
  origin: Origin;
  width?: number;
}

export interface ClippingBoxProps {
  active: boolean;
  children: ReactNode;
  className?: string;
  origin: Origin;
}

export interface ClippingBoxState {
  active: boolean;
  height?: number;
  width?: number;
}

export interface ClippingBoxFactoryArgs {
  InnerNode: ComponentClass<InnerNodeProps>;
  OutlineNode: ComponentClass<OutlineNodeProps>;
  WrapperNode: ComponentClass<WrapperNodeProps>;
  passthrough: PassTroughFunction<
    ClippingBoxProps,
    'InnerNode' | 'WrapperNode' | 'OutlineNode'
  >;
}

export default function clippingBoxFactory({
  InnerNode,
  OutlineNode,
  WrapperNode,
  passthrough,
}: ClippingBoxFactoryArgs): ComponentClass<ClippingBoxProps> {
  const passProps = getPassThrough(passthrough);
  return class ClippingBox extends Component<
    ClippingBoxProps,
    ClippingBoxState
  > {
    static defaultProps = {
      active: false,
      origin: 'topLeft' as OriginTopLeft,
    };

    state = {
      active: false,
      height: undefined,
      width: undefined,
    };

    clipperNode: HTMLElement | null = null;
    requestPositionFrame: number | null = null;

    componentDidMount() {
      this.requestPositionFrame = requestAnimationFrame(() => {
        if (this.clipperNode) {
          measureElement(this.clipperNode).then(({ height, width }) => {
            this.setState({ height, width });
          });
        }
      });
    }

    componentDidUpdate(prevProps) {
      if (
        this.props.active !== prevProps.active ||
        this.props.children !== prevProps.children
      ) {
        this.resize();
      }
    }

    componentWillUnmount() {
      if (this.requestPositionFrame) {
        cancelAnimationFrame(this.requestPositionFrame);
      }
    }

    handleInnerNode = node => {
      this.clipperNode = node;
    };

    resize() {
      this.requestPositionFrame = requestAnimationFrame(() => {
        if (this.clipperNode) {
          measureElement(this.clipperNode).then(({ height, width }) => {
            this.setState({ active: this.props.active, height, width });
          });
        }
      });
    }

    render() {
      const { active, height, width } = this.state;
      const { children, className, origin } = this.props;

      return createElement(
        WrapperNode,
        { ...passProps(this.props, 'WrapperNode', this), height, width },
        createElement(OutlineNode, {
          ...passProps(this.props, 'OutlineNode', this),
          active,
          height,
          origin,
          width,
        }),
        createElement(
          InnerNode,
          {
            ...passProps(this.props, 'InnerNode', this),
            innerRef: this.handleInnerNode,
            active,
            className,
            height,
            origin,
            width,
          },
          children,
        ),
      );
    }
  };
}
