import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import { themr } from 'react-css-themr';
import dissoc from 'ramda/src/dissoc';
import { RIPPLE } from '../identifiers';
import events from '../utils/events';
import prefixer from '../utils/prefixer';

const defaults = {
  centered: false,
  className: '',
  multiple: true,
  passthrough: true,
  spread: 2,
  theme: {},
};

const rippleFactory = (options = {}) => {
  const {
    centered: defaultCentered,
    className: defaultClassName,
    multiple: defaultMultiple,
    passthrough: defaultPassthrough,
    spread: defaultSpread,
    theme: defaultTheme,
    ...props
  } = { ...defaults, ...options };

  return (ComposedComponent) => {
    class RippledComponent extends Component {
      static propTypes = {
        children: PropTypes.node,
        disabled: PropTypes.bool,
        onMouseDown: PropTypes.func,
        onRippleEnded: PropTypes.func,
        onTouchStart: PropTypes.func,
        ripple: PropTypes.bool,
        rippleCentered: PropTypes.bool,
        rippleClassName: PropTypes.string,
        rippleMultiple: PropTypes.bool,
        rippleSpread: PropTypes.number,
        theme: PropTypes.shape({
          ripple: PropTypes.string,
          rippleActive: PropTypes.string,
          rippleRestarting: PropTypes.string,
          rippleWrapper: PropTypes.string,
        }),
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

      componentDidUpdate(prevProps, prevState) {
        // If a new ripple was just added, add a remove event listener to its animation
        if (Object.keys(prevState.ripples).length < Object.keys(this.state.ripples).length) {
          this.addRippleRemoveEventListener(this.getLastKey());
        }
      }

      componentWillUnmount() {
        // Remove document event listeners for ripple if they still exists
        Object.keys(this.state.ripples).forEach((key) => {
          this.state.ripples[key].endRipple();
        });
      }

      /**
       * Find out a descriptor object for the ripple element being created depending on
       * the position where the it was triggered and the component's dimensions.
       *
       * @param {Number} x Coordinate x in the viewport where ripple was triggered
       * @param {Number} y Coordinate y in the viewport where ripple was triggered
       * @return {Object} Descriptor element including position and size of the element
       */
      getDescriptor(x, y) {
        const { left, top, height, width } = ReactDOM.findDOMNode(this).getBoundingClientRect();
        const { rippleCentered: centered, rippleSpread: spread } = this.props;
        return {
          left: centered ? 0 : x - left - (width / 2),
          top: centered ? 0 : y - top - (height / 2),
          width: width * spread,
        };
      }

      /**
       * Increments and internal counter and returns the next value as a string. It
       * is used to assign key references to new ripple elements.
       *
       * @return {String} Key to be assigned to a ripple.
       */
      getNextKey() {
        this.currentCount = this.currentCount ? this.currentCount + 1 : 1;
        return `ripple${this.currentCount}`;
      }

      /**
       * Return the last generated key for a ripple element. When there is only one ripple
       * and to get the reference when a ripple was just created.
       *
       * @return {String} The last generated ripple key.
       */
      getLastKey() {
        return `ripple${this.currentCount}`;
      }

      /**
       * Variable to store the ripple references
       */
      rippleNodes = {};

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
       * Start a ripple animation on an specific point with touch or mouse events. First
       * decides if the animation should trigger. If the ripple is multiple or there is no
       * ripple present, it creates a new key. If it's a simple ripple and already exists,
       * it just restarts the current ripple. The animation happens in two state changes
       * to allow triggering via css.
       *
       * @param {Number} x Coordinate X on the screen where animation should start
       * @param {Number} y Coordinate Y on the screen where animation should start
       * @param {Boolean} isTouch Use events from touch or mouse.
       */
      animateRipple(x, y, isTouch) {
        if (this.rippleShouldTrigger(isTouch)) {
          const { top, left, width } = this.getDescriptor(x, y);
          const noRipplesActive = Object.keys(this.state.ripples).length === 0;
          const key = (this.props.rippleMultiple || noRipplesActive)
            ? this.getNextKey()
            : this.getLastKey();
          const endRipple = this.addRippleDeactivateEventListener(isTouch, key);
          const initialState = { active: false, restarting: true, top, left, width, endRipple };
          const runningState = { active: true, restarting: false };
          const ripples = { ...this.state.ripples, [key]: initialState };
          this.setState({ ripples }, () => {
            if (this.rippleNodes[key]) this.rippleNodes[key].offsetWidth; // eslint-disable-line
            this.setState({ ripples: {
              ...this.state.ripples,
              [key]: Object.assign({}, this.state.ripples[key], runningState),
            } });
          });
        }
      }

      /**
       * Add an event listener to the reference with given key so when the animation transition
       * ends we can be sure that it finished and it can be safely removed from the state.
       * This function is called whenever a new ripple is added to the component.
       *
       * @param {String} rippleKey Is the key of the ripple to add the event.
       */
      addRippleRemoveEventListener(rippleKey) {
        const self = this;
        const rippleNode = this.rippleNodes[rippleKey];
        events.addEventListenerOnTransitionEnded(rippleNode, function onOpacityEnd(e) {
          if (e.propertyName === 'opacity') {
            if (self.props.onRippleEnded) self.props.onRippleEnded(e);
            events.removeEventListenerOnTransitionEnded(self.rippleNodes[rippleKey], onOpacityEnd);
            // self.rippleNodes = dissoc(rippleKey, self.rippleNodes);
            delete self.rippleNodes[rippleKey];
            self.setState({ ripples: dissoc(rippleKey, self.state.ripples) });
          }
        });
      }

      /**
       * Add an event listener to the document needed to deactivate a ripple and make it dissappear.
       * Deactivation can happen with a touchend or mouseup depending on the trigger type. The
       * ending function is created from a factory function and returned.
       *
       * @param {Boolean} isTouch True in case the trigger was a touch event false otherwise.
       * @param {String} rippleKey It's a key to identify the ripple that should be deactivated.
       * @return {Function} Callback function that deactivates the ripple and removes the listener
       */
      addRippleDeactivateEventListener(isTouch, rippleKey) {
        const eventType = isTouch ? 'touchend' : 'mouseup';
        const endRipple = this.createRippleDeactivateCallback(eventType, rippleKey);
        document.addEventListener(eventType, endRipple);
        return endRipple;
      }

      /**
       * Generates a function that can be called to deactivate a ripple and remove its finishing
       * event listener. If is generated because we need to store it to be called on unmount in case
       * the ripple is still running.
       *
       * @param {String} eventType Is the event type that can be touchend or mouseup
       * @param {String} rippleKey Is the key representing the ripple
       * @return {Function} Callback function that deactivates the ripple and removes the listener
       */
      createRippleDeactivateCallback(eventType, rippleKey) {
        const self = this;
        return function endRipple() {
          document.removeEventListener(eventType, endRipple);
          self.setState({ ripples: {
            ...self.state.ripples,
            [rippleKey]: Object.assign({}, self.state.ripples[rippleKey], { active: false }),
          } });
        };
      }

      doRipple = () => (!this.props.disabled && this.props.ripple)

      handleMouseDown = (event) => {
        if (this.props.onMouseDown) this.props.onMouseDown(event);
        if (this.doRipple()) {
          const { x, y } = events.getMousePosition(event);
          this.animateRipple(x, y, false);
        }
      };

      handleTouchStart = (event) => {
        if (this.props.onTouchStart) this.props.onTouchStart(event);
        if (this.doRipple()) {
          const { x, y } = events.getTouchPosition(event);
          this.animateRipple(x, y, true);
        }
      };

      renderRipple(key, className, { active, left, restarting, top, width }) {
        const scale = restarting ? 0 : 1;
        const transform = `translate3d(${(-width / 2) + left}px, ${(-width / 2) + top}px, 0) scale(${scale})`;
        const _className = classnames(this.props.theme.ripple, {
          [this.props.theme.rippleActive]: active,
          [this.props.theme.rippleRestarting]: restarting,
        }, className);
        return (
          <span key={key} data-react-toolbox="ripple" className={this.props.theme.rippleWrapper} {...props}>
            <span
              className={_className}
              ref={(node) => { if (node) this.rippleNodes[key] = node; }}
              style={prefixer({ transform }, { width, height: width })}
            />
          </span>
        );
      }

      render() {
        const {
          children,
          disabled,
          ripple,
          onRippleEnded,   // eslint-disable-line
          rippleCentered,  // eslint-disable-line
          rippleClassName, // eslint-disable-line
          rippleMultiple,  // eslint-disable-line
          rippleSpread,    // eslint-disable-line
          theme,
          ...other
        } = this.props;
        const { ripples } = this.state;
        const childRipples = Object.keys(ripples).map(key =>
          this.renderRipple(key, rippleClassName, ripples[key]),
        );
        const childProps = {
          onMouseDown: this.handleMouseDown,
          onTouchStart: this.handleTouchStart,
          ...other,
        };
        const finalProps = defaultPassthrough
          ? { ...childProps, theme, disabled }
          : childProps;

        return !ripple
          ? React.createElement(ComposedComponent, finalProps, children)
          : React.createElement(ComposedComponent, finalProps, [children, childRipples]);
      }
    }

    return themr(RIPPLE, defaultTheme)(RippledComponent);
  };
};

export default rippleFactory;
