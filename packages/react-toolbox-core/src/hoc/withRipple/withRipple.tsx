import * as React from 'react';
import { assoc, keys, dissoc } from 'ramda';
import { ComponentClass, ReactNode, Component, PropTypes, MouseEvent } from 'react';
import { Component as GenericComponent }  from '../../types';
import { NativeComponent } from 'react-native';
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
  className: string,
  innerRef: (instance: HTMLElement) => void,
}

export interface RippleNodeProps {
  active: boolean,
  idx: string,
  innerRef: (instance: HTMLElement) => void,
  isTouch: boolean,
  onDeactivate: () => void,
  onFinish: (idx: string) => void,
  spreadSize: number
  startX: number,
  startY: number,
}

export interface WithRippleFactoryArgs {
  RippleNode: GenericComponent<RippleNodeProps>,
  RippleWrapper: GenericComponent<RippleWrapperProps>,
  passthrough: PassTroughFunction<RippledProps, 'RippleWrapper' | 'RippleNode'>,
}

export interface RippledProps {
  children: ReactNode,
  disabled: boolean,
  onMouseDown: (event: MouseEvent<any>) => void,
  onMouseUp: (event: MouseEvent<any>) => void,
  onTouchEnd: (event: MouseEvent<any>) => void,
  onTouchStart: (event: MouseEvent<any>) => void,
  ripple: boolean,
  rippleCentered: boolean,
  rippleClassName: string,
  rippleMultiple: boolean,
  rippleSpread: number,
}

export type RippleWrapperDescriptor = {
  width: number,
  x: number,
  y: number,
}

export type RippleDescriptor = {
  active: boolean,
  isTouch: boolean,
  width: number,
  x: number,
  y: number,
}

export interface RippledState {
  ripples: {
    [key: string]: RippleDescriptor
  },
}

const defaults: RippleOptions = {
  centered: false,
  className: '',
  multiple: true,
  passthrough: true,
  spread: 2,
};

export interface DecoratedProps {
  onMouseDown: (event: MouseEvent<any>) => void,
  onMouseUp: (event: MouseEvent<any>) => void,
  onTouchEnd: (event: MouseEvent<any>) => void,
  onTouchStart: (event: MouseEvent<any>) => void,
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

    return function withRipple<P extends DecoratedProps>(ComposedComponent: ComponentClass<P>): ComponentClass<RippledProps> {
      return class RippledComponent extends Component<RippledProps, RippledState> {
        static defaultProps = {
          disabled: false,
          ripple: true,
          rippleCentered: defaultCentered,
          rippleClassName: defaultClassName,
          rippleMultiple: defaultMultiple,
          rippleSpread: defaultSpread,
        };

        state = {
          ripples: {},
        };

        currentCount = 0;
        deactivateTimeout: number | null = null;
        ripples: {[key: string]: HTMLElement} = {};
        rootNode: HTMLElement | NativeComponent | null = null;
        touchCache = false;

        componentWillUnmount() {
          if (this.deactivateTimeout) {
            clearTimeout(this.deactivateTimeout);
          }
        }

        /**
         * Find out a descriptor object for the ripple element being created depending on
         * the position where the it was triggered and the component's dimensions.
         *
         * @param {Number} x Coordinate x in the viewport where ripple was triggered
         * @param {Number} y Coordinate y in the viewport where ripple was triggered
         * @return {Object} Descriptor element including starting position and width
         */
        getDescriptor = (x: number, y: number, isTouch: boolean) => (
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
        );

        /**
         * Increments and internal counter and returns the next value as a string. It
         * is used to assign key references to new ripple elements.
         *
         * @return {String} Key to be assigned to a ripple.
         */
        getNextKey = () => {
          this.currentCount += 1;
          return `ripple${this.currentCount}`;
        };

        /**
         * Determine if a ripple should start depending if its a touch event. For mobile both
         * touchStart and mouseDown are launched so in case is touch we should always trigger
         * but if its not we should check if a touch was already triggered to decide.
         *
         * @param {Boolean} isTouch True in case a touch event triggered the ripple false otherwise.
         * @return {Boolean} True in case the ripple should trigger or false if it shouldn't.
         */
        rippleShouldTrigger(isTouch) {
          const shouldStart = isTouch ? true : !this.touchCache;
          this.touchCache = isTouch;
          return shouldStart;
        }

        /**
         * Create a ripple animation on an specific point with touch or mouse events. First
         * decides if the animation should trigger. It retrieves a descriptor for the given
         * interaction point and modifies the state with the data for a new ripple if its
         * multiple or substitutes the current ripple if its unique.
         *
         * @param {Number} interactionX Coordinate X on the screen where the interaction had happened.
         * @param {Number} interactionY Coordinate Y on the screen where the interaction had happened.
         * @param {Boolean} isTouch Determines if the event is a touch or mouse event.
         */
        createRipple(interactionX, interactionY, isTouch) {
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

        /**
         * Modifies the state to set every ripple store in the state to inactive. All of them
         * are deactivated because it's not possible to deactivate one and keep the rest. When
         * the MouseUp happens there should be no ripples left.
         */
        handleDeactivate = () => {
          this.setState({
            ripples: keys(this.state.ripples).reduce(
              (result: {[key: string]: RippleDescriptor}, rippleKey: string) =>
                assoc(
                  rippleKey,
                  { ...this.state.ripples[rippleKey], active: false },
                  result
                ),
              {}
            ),
          });
        };

        /**
         * Modifies the state to remove the ripple given as the first argument. This
         * method should be called when the animation ripple is finish by the injected
         * RippleNode component.
         *
         * @param {String} key Key of the ripple that has to be removed
         */
        handleRippleFinish = (key: string) => {
          const ripples = dissoc(key, this.state.ripples) as {[key: string]: RippleDescriptor};
          this.setState({ ripples });
        };

        handleInnerRef = node => {
          this.rootNode = node;
        };

        handleMouseDown = event => {
          if (!this.props.disabled && this.props.ripple) {
            const { x, y } = getMousePosition(event);
            this.createRipple(x, y, false);
          }

          if (this.props.onMouseDown) {
            this.props.onMouseDown(event);
          }
        };

        handleTouchStart = event => {
          if (!this.props.disabled) {
            const { x, y } = getTouchPosition(event);
            this.createRipple(x, y, true);
          }

          if (this.props.onTouchStart) {
            this.props.onTouchStart(event);
          }
        };

        handleMouseUp = event => {
          this.deactivateTimeout = setTimeout(this.handleDeactivate, 100);
          if (this.props.onMouseUp) {
            this.props.onMouseUp(event);
          }
        };

        handleTouchEnd = (event) => {
          this.deactivateTimeout = setTimeout(this.handleDeactivate, 100);
          if (this.props.onMouseUp) {
            this.props.onTouchEnd(event);
          }
        };

        renderRipple = (key, className, { x, y, width, active, isTouch }) => (
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
        );

        render() {
          const {
            children,
            disabled,
            ripple,
            rippleCentered,
            rippleClassName,
            rippleMultiple,
            rippleSpread,
            ...other
          } = this.props;
          const { ripples } = this.state;
          const childRipples = keys(ripples).map(key =>
            this.renderRipple(key, rippleClassName, ripples[key])
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
      }
    }
  }
);

export default withRippleFactory;
