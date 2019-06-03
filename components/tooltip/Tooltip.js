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
  showCaret: false,
};

const ARROW_PLACEMENT = {
  [POSITION.BOTTOM]: 'arrowUp',
  [POSITION.TOP]: 'arrowDown',
  [POSITION.RIGHT]: 'arrowLeft',
  [POSITION.LEFT]: 'arrowRight',
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
    showCaret: defaultShowCaret,
  } = { ...defaults, ...options };

  return (ComposedComponent) => {
    class TooltippedComponent extends Component {
      static propTypes = {
        children: PropTypes.node,
        className: PropTypes.string,
        onClick: PropTypes.func,
        onMouseEnter: PropTypes.func,
        onMouseLeave: PropTypes.func,
        showCaret: PropTypes.bool,
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
        tooltipHideOnClick: PropTypes.bool,
        tooltipPosition: PropTypes.oneOf(Object.keys(POSITION).map(key => POSITION[key])),
        tooltipShowOnClick: PropTypes.bool,
      };

      static defaultProps = {
        className: defaultClassName,
        tooltipDelay: defaultDelay,
        tooltipHideOnClick: defaultHideOnClick,
        tooltipPosition: defaultPosition,
        tooltipShowOnClick: defaultShowOnClick,
        showCaret: defaultShowCaret,
      };

      state = {
        active: false,
        position: this.props.tooltipPosition,
        visible: false,
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

      getPosition(element) {
        const { tooltipPosition } = this.props;
        if (tooltipPosition === POSITION.HORIZONTAL) {
          const origin = element.getBoundingClientRect();
          const { width: ww } = getViewport();
          const toRight = origin.left < ((ww / 2) - (origin.width / 2));
          return toRight ? POSITION.RIGHT : POSITION.LEFT;
        } if (tooltipPosition === POSITION.VERTICAL) {
          const origin = element.getBoundingClientRect();
          const { height: wh } = getViewport();
          const toBottom = origin.top < ((wh / 2) - (origin.height / 2));
          return toBottom ? POSITION.BOTTOM : POSITION.TOP;
        }
        return tooltipPosition;
      }

      handleMouseEnter = (event) => {
        this.activate(this.calculatePosition(event.currentTarget));
        if (this.props.onMouseEnter) this.props.onMouseEnter(event);
      };

      handleMouseLeave = (event) => {
        this.deactivate();
        if (this.props.onMouseLeave) this.props.onMouseLeave(event);
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

      activate({ top, left, position }) {
        if (this.timeout) clearTimeout(this.timeout);
        this.setState({ visible: true, position });
        this.timeout = setTimeout(() => {
          this.setState({ active: true, top, left });
        }, this.props.tooltipDelay);
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
        const position = this.getPosition(element);
        const {
          top, left, height, width,
        } = element.getBoundingClientRect();
        const xOffset = window.scrollX || window.pageXOffset;
        const yOffset = window.scrollY || window.pageYOffset;
        if (position === POSITION.BOTTOM) {
          if (this.props.showCaret) {
            return {
              top: top + height + yOffset + 10,
              left: left + (width / 2) + xOffset,
              position,
            };
          }
          return {
            top: top + height + yOffset,
            left: left + (width / 2) + xOffset,
            position,
          };
        } if (position === POSITION.TOP) {
          if (this.props.showCaret) {
            return {
              top: (top + yOffset) - 10,
              left: left + (width / 2) + xOffset,
              position,
            };
          }
          return {
            top: top + yOffset,
            left: left + (width / 2) + xOffset,
            position,
          };
        } if (position === POSITION.LEFT) {
          if (this.props.showCaret) {
            return {
              top: top + (height / 2) + yOffset,
              left: (left + xOffset) - 10,
              position,
            };
          }
          return {
            top: top + (height / 2) + yOffset,
            left: left + xOffset,
            position,
          };
        } if (position === POSITION.RIGHT) {
          if (this.props.showCaret) {
            return {
              top: top + (height / 2) + yOffset,
              left: left + width + xOffset + 10,
              position,
            };
          }
          return {
            top: top + (height / 2) + yOffset,
            left: left + width + xOffset,
            position,
          };
        }
        return undefined;
      }

      render() {
        const {
          active, left, top, position, visible,
        } = this.state;
        const positionClass = `tooltip${position.charAt(0).toUpperCase() + position.slice(1)}`;
        const {
          children,
          className,
          theme,
          onClick, // eslint-disable-line no-unused-vars
          onMouseEnter, // eslint-disable-line no-unused-vars
          onMouseLeave, // eslint-disable-line no-unused-vars
          tooltip,
          tooltipDelay, // eslint-disable-line no-unused-vars
          tooltipHideOnClick, // eslint-disable-line no-unused-vars
          tooltipPosition, // eslint-disable-line no-unused-vars
          tooltipShowOnClick, // eslint-disable-line no-unused-vars
          showCaret,
          ...other
        } = this.props;

        const _className = classnames(theme.tooltip, {
          [theme.tooltipActive]: active,
          [theme[positionClass]]: theme[positionClass],
          [theme.resetPadding]: showCaret,
        });

        const childProps = {
          ...other,
          className,
          onClick: this.handleClick,
          onMouseEnter: this.handleMouseEnter,
          onMouseLeave: this.handleMouseLeave,
          showCaret,
        };

        const shouldPass = typeof ComposedComponent !== 'string' && defaultPassthrough;
        const finalProps = shouldPass ? { ...childProps, theme } : childProps;
        return React.createElement(ComposedComponent, finalProps, children,
          visible && (
            <Portal>
              <span
                ref={(node) => { this.tooltipNode = node; }}
                className={_className}
                data-react-toolbox="tooltip"
                style={{ top, left }}
              >
                {
                  showCaret && <span className={theme[ARROW_PLACEMENT[position]]} />
                }
                <span className={theme.tooltipInner}>{tooltip}</span>
              </span>
            </Portal>
          ));
      }
    }

    return themr(TOOLTIP, defaultTheme)(TooltippedComponent);
  };
};

export default tooltipFactory;
