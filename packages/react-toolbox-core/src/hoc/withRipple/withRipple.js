import React, { Component, PropTypes } from 'react';
import assoc from 'ramda/src/assoc';
import dissoc from 'ramda/src/dissoc';
import keys from 'ramda/src/keys';
import getMousePosition from '../../utils/getMousePosition';
import getPassThrough from '../../utils/getPassThrough';
import getTouchPosition from '../../utils/getTouchPosition';
import measureElement from '../../utils/measureElement';

const defaults = {
  centered: false,
  className: '',
  multiple: true,
  passthrough: true,
  spread: 2,
};

const withRippleFactory = ({
  RippleNode,
  RippleWrapper,
  passthrough,
}) => (options = {}) => {
  const {
    centered: defaultCentered,
    className: defaultClassName,
    multiple: defaultMultiple,
    passthrough: defaultPassthrough,
    spread: defaultSpread,
  } = { ...defaults, ...options };
  const passProps = getPassThrough(passthrough);
  return (ComposedComponent) => {
    class RippledComponent extends Component {
      static propTypes = {
        children: PropTypes.node,
        disabled: PropTypes.bool,
        onMouseDown: PropTypes.func,
        onMouseUp: PropTypes.func,
        onRippleEnded: PropTypes.func,
        onTouchEnd: PropTypes.func,
        onTouchStart: PropTypes.func,
        ripple: PropTypes.bool,
        rippleCentered: PropTypes.bool,
        rippleClassName: PropTypes.string,
        rippleMultiple: PropTypes.bool,
        rippleSpread: PropTypes.number,
      };

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
      getDescriptor = (x, y) => (
        new Promise((resolve) => {
          measureElement(this.rootNode).then(({ left, top, height, width }) => {
            const { rippleCentered: centered, rippleSpread: spread } = this.props;
            resolve({
              x: centered ? left + (width / 2) : x - left,
              y: centered ? top + (height / 2) : y - top,
              width: Math.max(width, height) * spread,
            });
          });
        })
      )

      /**
       * Increments and internal counter and returns the next value as a string. It
       * is used to assign key references to new ripple elements.
       *
       * @return {String} Key to be assigned to a ripple.
       */
      getNextKey = () => {
        this.currentCount = this.currentCount ? this.currentCount + 1 : 1;
        return `ripple${this.currentCount}`;
      }

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
          this.getDescriptor(interactionX, interactionY).then(({ x, y, width }) => {
            const ripples = { [this.getNextKey()]: { active: true, x, y, width, isTouch } };
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
          ripples: keys(this.state.ripples).reduce((result, rippleKey) => (
            assoc(rippleKey, { ...this.state.ripples[rippleKey], active: false }, result)
          ), []),
        });
      }

      /**
       * Modifies the state to remove the ripple given as the first argument. This
       * method should be called when the animation ripple is finish by the injected
       * RippleNode component.
       *
       * @param {String} key Key of the ripple that has to be removed
       */
      handleRippleFinish = (key) => {
        this.setState({ ripples: dissoc(key, this.state.ripples) });
      }

      ripples = [];

      handleInnerRef = (node) => {
        this.rootNode = node;
      };

      handleMouseDown = (event) => {
        if (!this.props.disabled && this.props.ripple) {
          const { x, y } = getMousePosition(event);
          this.createRipple(x, y, false);
        }

        if (this.props.onMouseDown) {
          this.props.onMouseDown(event);
        }
      };

      handleTouchStart = (event) => {
        if (!this.props.disabled) {
          const { x, y } = getTouchPosition(event);
          this.createRipple(x, y, true);
        }

        if (this.props.onTouchStart) {
          this.props.onTouchStart(event);
        }
      };

      handleMouseUp = (event) => {
        this.deactivateTimeout = setTimeout(this.handleDeactivate, 100);
        if (this.props.onMouseUp) {
          this.props.onMouseUp(event);
        }
      }

      handleTouchEnd = () => {
        this.deactivateTimeout = setTimeout(this.handleDeactivate, 100);
        if (this.props.onMouseUp) {
          this.props.onTouchEnd(event);
        }
      }

      renderRipple = (key, className, { x, y, width, active, isTouch }) => (
        <RippleWrapper
          {...passProps(this.props, 'RippleWrapper')}
          className={className}
          key={key}
        >
          <RippleNode
            {...passProps(this.props, 'RippleNode')}
            active={active}
            idx={key}
            innerRef={(node) => { this.ripples[key] = node; }}
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
          onRippleEnded,   // eslint-disable-line
          ripple,
          rippleCentered,  // eslint-disable-line
          rippleClassName,
          rippleMultiple,  // eslint-disable-line
          rippleSpread,    // eslint-disable-line
          ...other
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
          innerRef: this.handleInnerRef,
        };

        const finalProps = defaultPassthrough
          ? { ...childProps, disabled }
          : childProps;

        return !ripple
          ? React.createElement(ComposedComponent, finalProps, children)
          : React.createElement(ComposedComponent, finalProps, [children, childRipples]);
      }
    }

    return RippledComponent;
  };
};

export default withRippleFactory;
