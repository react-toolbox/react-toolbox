import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import { themr } from 'react-css-themr';
import { RIPPLE } from '../identifiers.js';
import events from '../utils/events';
import prefixer from '../utils/prefixer';

const defaults = {
  centered: false,
  className: '',
  spread: 2,
  theme: {}
};

const rippleFactory = (options = {}) => {
  const {
    centered: defaultCentered,
    className: defaultClassName,
    spread: defaultSpread,
    theme: defaultTheme,
    ...props
  } = {...defaults, ...options};

  return ComposedComponent => {
    class RippledComponent extends Component {
      static propTypes = {
        children: PropTypes.any,
        disabled: PropTypes.bool,
        onRippleEnded: PropTypes.func,
        ripple: PropTypes.bool,
        rippleCentered: PropTypes.bool,
        rippleClassName: PropTypes.string,
        rippleSpread: PropTypes.number,
        theme: PropTypes.shape({
          ripple: PropTypes.string,
          rippleActive: PropTypes.string,
          rippleRestarting: PropTypes.string,
          rippleWrapper: PropTypes.string
        })
      };

      static defaultProps = {
        disabled: false,
        ripple: true,
        rippleCentered: defaultCentered,
        rippleClassName: defaultClassName,
        rippleSpread: defaultSpread
      };

      state = {
        active: false,
        left: null,
        restarting: false,
        top: null,
        width: null
      };

      componentDidMount () {
        if (this.props.onRippleEnded) {
          events.addEventListenerOnTransitionEnded(this.refs.ripple, (evt) => {
            if (evt.propertyName === 'transform') this.props.onRippleEnded(evt);
          });
        }
      }

      componentWillUnmount () {
        if (this.props.onRippleEnded) {
          events.removeEventListenerOnTransitionEnded(this.refs.ripple);
        }
      }

      handleEnd = () => {
        document.removeEventListener(this.touch ? 'touchend' : 'mouseup', this.handleEnd);
        this.setState({active: false});
      };

      start = ({pageX, pageY}, touch = false) => {
        if (!this._isTouchRippleReceivingMouseEvent(touch)) {
          this.touch = touch;
          document.addEventListener(this.touch ? 'touchend' : 'mouseup', this.handleEnd);
          const {top, left, width} = this._getDescriptor(pageX, pageY);
          this.setState({active: false, restarting: true, top, left, width}, () => {
            this.refs.ripple.offsetWidth;  //eslint-disable-line no-unused-expressions
            this.setState({active: true, restarting: false});
          });
        }
      };

      _isTouchRippleReceivingMouseEvent (touch) {
        return this.touch && !touch;
      }

      _getDescriptor (pageX, pageY) {
        const {left, top, height, width} = ReactDOM.findDOMNode(this).getBoundingClientRect();
        const {rippleCentered: centered, rippleSpread: spread} = this.props;
        return {
          left: centered ? 0 : pageX - left - width / 2 - window.scrollX,
          top: centered ? 0 : pageY - top - height / 2 - window.scrollY,
          width: width * spread
        };
      }

      handleMouseDown = (event) => {
        if (!this.props.disabled) this.start(event);
        if (this.props.onMouseDown) this.props.onMouseDown(event);
      };

      render () {
        if (!this.props.ripple) {
          return <ComposedComponent {...this.props} />;
        } else {
          const {
            children,
            ripple, //eslint-disable-line no-unused-vars
            rippleClassName: className,
            rippleCentered: centered, //eslint-disable-line no-unused-vars
            rippleSpread: spread, //eslint-disable-line no-unused-vars
            ...other
          } = this.props;

          const rippleClassName = classnames(this.props.theme.ripple, {
            [this.props.theme.rippleActive]: this.state.active,
            [this.props.theme.rippleRestarting]: this.state.restarting
          }, className);

          const { left, top, width } = this.state;
          const scale = this.state.restarting ? 0 : 1;
          const rippleStyle = prefixer({
              transform: `translate3d(${-width / 2 + left}px, ${-width / 2 + top}px, 0) scale(${scale})`
            }, {width, height: width});

          return (
            <ComposedComponent {...other} onMouseDown={this.handleMouseDown}>
              {children ? children : null}
              <span data-react-toolbox='ripple' className={this.props.theme.rippleWrapper} {...props}>
                <span ref='ripple' role='ripple' className={rippleClassName} style={rippleStyle} />
              </span>
            </ComposedComponent>
          );
        }
      }
    }

    return themr(RIPPLE, defaultTheme)(RippledComponent);
  };
};

export default rippleFactory;
