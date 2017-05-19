import * as React from 'react';
import { assoc, dissoc, keys } from 'ramda';
import { Component, ComponentClass, MouseEvent, ReactNode } from 'react';
import { NativeComponent } from 'react-native';
import { Component as GenericComponent }  from '../../types';
import getPassThrough, { PassTroughFunction } from '../../utils/getPassThrough';
import getMousePosition from '../../utils/getMousePosition';
import getTouchPosition from '../../utils/getTouchPosition';
import measureElement from '../../utils/measureElement';

export type RippleOptions = {
  centered: boolean,
  className: string,
  multiple: boolean,
  passthrough: boolean,
  spread: number,
};

export interface RippleWrapperProps {
  className: string;
  innerRef(instance: HTMLElement): void;
}

export interface RippleNodeProps {
  active: boolean;
  idx: string;
  innerRef(instance: HTMLElement): void;
  isTouch: boolean;
  onDeactivate(): void;
  onFinish(idx: string): void;
  spreadSize: number;
  startX: number;
  startY: number;
}

export interface WithRippleFactoryArgs {
  RippleNode: GenericComponent<RippleNodeProps>;
  RippleWrapper: GenericComponent<RippleWrapperProps>;
  passthrough: PassTroughFunction<RippledProps, 'RippleWrapper' | 'RippleNode'>;
}

export interface RippledProps {
  children: ReactNode;
  disabled: boolean;
  onMouseDown(event: MouseEvent<any>): void;
  onMouseUp(event: MouseEvent<any>): void;
  onTouchEnd(event: MouseEvent<any>): void;
  onTouchStart(event: MouseEvent<any>): void;
  ripple: boolean;
  rippleCentered: boolean;
  rippleClassName: string;
  rippleMultiple: boolean;
  rippleSpread: number;
}

export type RippleWrapperDescriptor = {
  width: number,
  x: number,
  y: number,
};

export type RippleDescriptor = {
  active: boolean,
  isTouch: boolean,
  width: number,
  x: number,
  y: number,
};

export interface RippledState {
  ripples: {
    [key: string]: RippleDescriptor,
  };
}

const defaults: RippleOptions = {
  centered: false,
  className: '',
  multiple: true,
  passthrough: true,
  spread: 2,
};

export interface DecoratedProps {
  onMouseDown(event: MouseEvent<any>): void;
  onMouseUp(event: MouseEvent<any>): void;
  onTouchEnd(event: MouseEvent<any>): void;
  onTouchStart(event: MouseEvent<any>): void;
}

const withRippleFactory = ({ RippleNode, RippleWrapper, passthrough }: WithRippleFactoryArgs) => (
  (options: Partial<RippleOptions> = {}) => {
    const passProps = getPassThrough(passthrough);
    const {
      centered: defaultCentered,
      className: defaultClassName,
      multiple: defaultMultiple,
      passthrough: defaultPassthrough,
      spread: defaultSpread,
    }: RippleOptions = { ...defaults, ...options };

    return function withRipple<P extends DecoratedProps>(
      ComposedComponent: ComponentClass<P>,
    ): ComponentClass<RippledProps> {
      return class RippledComponent extends Component<RippledProps, RippledState> {
        public static defaultProps = {
          disabled: false,
          ripple: true,
          rippleCentered: defaultCentered,
          rippleClassName: defaultClassName,
          rippleMultiple: defaultMultiple,
          rippleSpread: defaultSpread,
        };

        public state = {
          ripples: {},
        };

        private currentCount = 0;
        private deactivateTimeout: number | null = null;
        private ripples: {[key: string]: HTMLElement} = {};
        private rootNode: HTMLElement | NativeComponent | null = null;
        private touchCache = false;

        public componentWillUnmount() {
          if (this.deactivateTimeout) {
            clearTimeout(this.deactivateTimeout);
          }
        }

        private getDescriptor = (x: number, y: number, isTouch: boolean) => (
          new Promise<RippleDescriptor>(resolve => {
            if (this.rootNode) {
              measureElement(this.rootNode).then(({ left, top, height, width }) => {
                resolve({
                  active: true,
                  isTouch,
                  width: Math.max(width, height) * this.props.rippleSpread,
                  x: this.props.rippleCentered ? left + width / 2 : x - left,
                  y: this.props.rippleCentered ? top + height / 2 : y - top,
                });
              });
            } else {
              resolve({
                active: true,
                isTouch,
                width: 0,
                x: 0,
                y: 0,
              });
            }
          })
        )

        private getNextKey = () => {
          this.currentCount += 1;
          return `ripple${this.currentCount}`;
        }

        private rippleShouldTrigger(isTouch) {
          const shouldStart = isTouch ? true : !this.touchCache;
          this.touchCache = isTouch;
          return shouldStart;
        }

        private createRipple(interactionX, interactionY, isTouch) {
          if (this.rippleShouldTrigger(isTouch)) {
            this.getDescriptor(interactionX, interactionY, isTouch).then((descriptor) => {
              const ripples = { [this.getNextKey()]: descriptor };
              this.setState({
                ripples: this.props.rippleMultiple
                  ? { ...this.state.ripples, ...ripples }
                  : ripples,
              });
            });
          }
        }

        private handleDeactivate = () => {
          this.setState({
            ripples: keys(this.state.ripples).reduce(
              (result: {[key: string]: RippleDescriptor}, rippleKey: string) =>
                assoc(
                  rippleKey,
                  { ...this.state.ripples[rippleKey], active: false },
                  result,
                ),
              {},
            ),
          });
        }

        private handleRippleFinish = (key: string) => {
          const ripples = dissoc(key, this.state.ripples) as {[key: string]: RippleDescriptor};
          this.setState({ ripples });
        }

        private handleInnerRef = node => {
          this.rootNode = node;
        }

        private handleMouseDown = event => {
          if (!this.props.disabled && this.props.ripple) {
            const { x, y } = getMousePosition(event);
            this.createRipple(x, y, false);
          }

          if (this.props.onMouseDown) {
            this.props.onMouseDown(event);
          }
        }

        private handleTouchStart = event => {
          if (!this.props.disabled) {
            const { x, y } = getTouchPosition(event);
            this.createRipple(x, y, true);
          }

          if (this.props.onTouchStart) {
            this.props.onTouchStart(event);
          }
        }

        private handleMouseUp = event => {
          this.deactivateTimeout = window.setTimeout(this.handleDeactivate, 100);
          if (this.props.onMouseUp) {
            this.props.onMouseUp(event);
          }
        }

        private handleTouchEnd = (event) => {
          this.deactivateTimeout = window.setTimeout(this.handleDeactivate, 100);
          if (this.props.onMouseUp) {
            this.props.onTouchEnd(event);
          }
        }

        private renderRipple = (key, className, { x, y, width, active, isTouch }) => (
          <RippleWrapper
            {...passProps(this.props, 'RippleWrapper', this)}
            className={className}
            innerRef={this.handleInnerRef}
            key={key}
          >
            <RippleNode
              {...passProps(this.props, 'RippleNode', this)}
              active={active}
              idx={key}
              innerRef={node => { this.ripples[key] = node; }}
              isTouch={isTouch}
              onDeactivate={this.handleDeactivate}
              onFinish={this.handleRippleFinish}
              spreadSize={width}
              startX={x}
              startY={y}
            />
          </RippleWrapper>
        )

        public render() {
          const {
            children,
            disabled,
            ripple,
            rippleCentered,
            rippleClassName,
            rippleMultiple,
            rippleSpread,
            ...other,
          } = this.props;
          const { ripples } = this.state;
          const childRipples = keys(ripples).map(key =>
            this.renderRipple(key, rippleClassName, ripples[key]),
          );

          const childProps = {
            ...other,
            onMouseDown: this.handleMouseDown,
            onTouchStart: this.handleTouchStart,
            onTouchEnd: this.handleTouchEnd,
            onMouseUp: this.handleMouseUp,
          };

          const finalProps = (
            defaultPassthrough
              ? { ...childProps, disabled }
              : childProps
          ) as P;

          return !ripple
            ? React.createElement(ComposedComponent, finalProps, children)
            : React.createElement(ComposedComponent, finalProps, [ children, childRipples ]);
        }
      };
    };
  }
);

export default withRippleFactory;
