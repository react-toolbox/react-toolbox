import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { themr } from 'react-css-themr';
import Portal from '../hoc/Portal';
import { getViewport } from '../utils/utils';
import { TOOLTIP } from '../identifiers';
import events from '../utils/events';

const POSITION = {
  BOTTOM: 'bottom',
  HORIZONTAL: 'horizontal',
  LEFT: 'left',
  RIGHT: 'right',
  TOP: 'top',
  VERTICAL: 'vertical',
};

const defaults = {
  className: '',
  delay: 0,
  hideOnClick: true,
  passthrough: true,
  showOnClick: false,
  position: POSITION.VERTICAL,
  theme: {},
};

const tooltipFactory = (options = {}) => {
  const {
    className: defaultClassName,
    delay: defaultDelay,
    hideOnClick: defaultHideOnClick,
    showOnClick: defaultShowOnClick,
    passthrough: defaultPassthrough,
    position: defaultPosition,
    theme: defaultTheme,
  } = { ...defaults, ...options };

  return (ComposedComponent) => {
    class TooltippedComponent extends Component {
      static propTypes = {
        children: PropTypes.node,
        className: PropTypes.string,
        onClick: PropTypes.func,
        onMouseEnter: PropTypes.func,
        onMouseLeave: PropTypes.func,
        theme: PropTypes.shape({
          tooltip: PropTypes.string,
          tooltipActive: PropTypes.string,
          tooltipWrapper: PropTypes.string,
        }),
        tooltip: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.node,
        ]),
        tooltipDelay: PropTypes.number,
        tooltipForChildren: PropTypes.bool,
        tooltipHideOnClick: PropTypes.bool,
        tooltipOnFocus: PropTypes.bool,
        tooltipPosition: PropTypes.oneOf(Object.keys(POSITION).map(key => POSITION[key])),
        tooltipShowOnClick: PropTypes.bool,
      };

      static defaultProps = {
        className: defaultClassName,
        tooltipDelay: defaultDelay,
        tooltipHideOnClick: defaultHideOnClick,
        tooltipPosition: defaultPosition,
        tooltipShowOnClick: defaultShowOnClick,
      };

      state = {
        active: false,
        position: this.props.tooltipPosition,
        visible: false,
        top: 0,
        left: 0,
        tooltip: '',
      };

      componentWillUnmount() {
        if (this.tooltipNode) {
          events.removeEventListenerOnTransitionEnded(this.tooltipNode, this.onTransformEnd);
        }
        if (this.timeout) clearTimeout(this.timeout);
      }

      onTransformEnd = (e) => {
        if (e.propertyName === 'transform') {
          events.removeEventListenerOnTransitionEnded(this.tooltipNode, this.onTransformEnd);
          this.setState({ visible: false });
        }
      };

      setTooltipNode = (node) => {
        this.tooltipNode = node;
        if (node) {
          const { width: vw, height: vh } = getViewport();
          const { top, left, position } = this.state;
          const width = this.tooltipNode.offsetWidth;
          const height = this.tooltipNode.offsetHeight;
          let x = -50;
          let y = -50;
          if (position === POSITION.TOP || position === POSITION.BOTTOM) {
            y = position === POSITION.TOP ? -100 : 0;
            if (left + width / 2 > vw) {
              x = -Math.ceil(100 * (left + width - vw + 1) / width);
            } else if (left - width / 2 < 0) {
              x = Math.ceil(100 * (width - left) / width);
            }
          } else if (position === POSITION.LEFT || position === POSITION.RIGHT) {
            x = position === POSITION.LEFT ? -100 : 0;
            if (top + height / 2 > vh) {
              y = -Math.ceil(100 * (top + height - vh + 1) / height);
            } else if (top - height / 2 < 0) {
              y = Math.ceil(100 * (height - top) / height);
            }
          }
          this.setState({ transform: `scale(1) translateX(${x}%) translateY(${y}%)` });
          this.timeout = setTimeout(() => {
            this.setState({ active: true });
          }, this.props.tooltipDelay);
        }
      }

      getPosition(origin) {
        const { tooltipPosition } = this.props;
        if (tooltipPosition === POSITION.HORIZONTAL) {
          const { width: ww } = getViewport();
          const toRight = origin.left < ((ww / 2) - (origin.width / 2));
          return toRight ? POSITION.RIGHT : POSITION.LEFT;
        } else if (tooltipPosition === POSITION.VERTICAL) {
          const { height: wh } = getViewport();
          const toBottom = origin.top < ((wh / 2) - (origin.height / 2));
          return toBottom ? POSITION.BOTTOM : POSITION.TOP;
        }
        return tooltipPosition;
      }

      activate({ top, left, position }) {
        if (this.timeout) clearTimeout(this.timeout);
        this.setState({ active: false, visible: true, position, top, left });
      }

      deactivate() {
        if (this.timeout) clearTimeout(this.timeout);
        if (this.state.active) {
          events.addEventListenerOnTransitionEnded(this.tooltipNode, this.onTransformEnd);
          this.setState({ active: false });
        } else if (this.state.visible) {
          this.setState({ visible: false });
        }
      }

      calculatePosition(element) {
        const origin = element.getBoundingClientRect();
        const position = this.getPosition(origin);
        const { top, left, height, width } = origin;
        if (position === POSITION.BOTTOM) {
          return {
            top: top + height,
            left: left + (width / 2),
            position,
          };
        } else if (position === POSITION.TOP) {
          return {
            top,
            left: left + (width / 2),
            position,
          };
        } else if (position === POSITION.LEFT) {
          return {
            top: top + (height / 2),
            left,
            position,
          };
        } else if (position === POSITION.RIGHT) {
          return {
            top: top + (height / 2),
            left: left + width,
            position,
          };
        }
        return undefined;
      }

      handleMouseEnter = (event) => {
        this.activate(this.calculatePosition(event.currentTarget));
        if (this.props.onMouseEnter) this.props.onMouseEnter(event);
      };

      handleMouseLeave = (event) => {
        this.deactivate();
        if (this.props.onMouseLeave) this.props.onMouseLeave(event);
      };

      handleMouseEnterForChildren = (event) => {
        let el = event.target;
        while (el && (!el.getAttribute || !el.getAttribute('tooltip'))) {
          el = el.parentNode;
        }
        if (el) {
          if (this.timeout) {
            clearTimeout(this.timeout);
            this.timeout = null;
          }
          this.setState({ tooltip: el.getAttribute('tooltip') });
          const pos = this.calculatePosition(el);
          if (!this.state.visible) {
            this.activate(pos);
          } else if (this.state.position !== pos.position ||
            this.state.top !== pos.top || this.state.left !== pos.left) {
            this.setState({ active: false, visible: false }, () => this.activate(pos));
          }
        }
      };

      handleMouseLeaveForChildren = () => {
        this.timeout = setTimeout(() => {
          this.deactivate();
        }, 300);
      };

      handleClick = (event) => {
        if (this.props.tooltipHideOnClick && this.state.active) {
          this.deactivate();
        }

        if (this.props.tooltipShowOnClick && !this.state.active) {
          this.activate(this.calculatePosition(event.currentTarget));
        }

        if (this.props.onClick) this.props.onClick(event);
      };

      render() {
        const { active, left, top, transform, position, visible } = this.state;
        const positionClass = `tooltip${position.charAt(0).toUpperCase() + position.slice(1)}`;
        const {
          children,
          className,
          theme,
          onClick,            // eslint-disable-line no-unused-vars
          onMouseEnter,       // eslint-disable-line no-unused-vars
          onMouseLeave,       // eslint-disable-line no-unused-vars
          tooltip,
          tooltipForChildren,
          tooltipOnFocus,     // eslint-disable-line no-unused-vars
          tooltipDelay,       // eslint-disable-line no-unused-vars
          tooltipHideOnClick, // eslint-disable-line no-unused-vars
          tooltipPosition,    // eslint-disable-line no-unused-vars
          tooltipShowOnClick, // eslint-disable-line no-unused-vars
          ...other
        } = this.props;

        const _className = classnames(theme.tooltip, {
          [theme.tooltipActive]: active,
          [theme[positionClass]]: theme[positionClass],
        });

        const childProps = {
          ...other,
          className,
          onClick: this.handleClick,
        };

        if (tooltipOnFocus) {
          childProps.onFocus = this.handleMouseEnter;
          childProps.onBlur = this.handleMouseLeave;
        } else if (tooltipForChildren) {
          childProps.onMouseOver = this.handleMouseEnterForChildren;
          childProps.onMouseOut = this.handleMouseLeaveForChildren;
        } else {
          childProps.onMouseEnter = this.handleMouseEnter;
          childProps.onMouseLeave = this.handleMouseLeave;
        }

        const shouldPass = typeof ComposedComponent !== 'string' && defaultPassthrough;
        const finalProps = shouldPass ? { ...childProps, theme } : childProps;

        return (<React.Fragment>
          {React.createElement(ComposedComponent, finalProps, children)}
          {visible && (
            <Portal>
              <span
                ref={this.setTooltipNode}
                className={_className}
                data-react-toolbox="tooltip"
                style={active ? { top, left, transform } : { top: '-1000px', left: 0 }}
              >
                <span className={theme.tooltipInner}>
                  {this.state.tooltip || this.props.tooltip}
                </span>
              </span>
            </Portal>
          )}
        </React.Fragment>);
      }
    }

    return themr(TOOLTIP, defaultTheme)(TooltippedComponent);
  };
};

export default tooltipFactory;
