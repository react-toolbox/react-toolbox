import React, { Component, PropTypes } from 'react';
import Portal from '../hoc/Portal';
import classnames from 'classnames';
import { themr } from 'react-css-themr';
import { TOOLTIP } from '../identifiers.js';
import events from '../utils/events';
import utils from '../utils/utils';

const POSITION = {
  BOTTOM: 'bottom',
  HORIZONTAL: 'horizontal',
  LEFT: 'left',
  RIGHT: 'right',
  TOP: 'top',
  VERTICAL: 'vertical'
};

const defaults = {
  className: '',
  delay: 0,
  hideOnClick: true,
  position: POSITION.VERTICAL,
  theme: {}
};

const tooltipFactory = (options = {}) => {
  const {
    className: defaultClassName,
    delay: defaultDelay,
    hideOnClick: defaultHideOnClick,
    position: defaultPosition,
    theme: defaultTheme
  } = {...defaults, ...options};

  return ComposedComponent => {
    class TooltippedComponent extends Component {
      static propTypes = {
        children: PropTypes.any,
        className: PropTypes.string,
        onClick: PropTypes.func,
        onMouseEnter: PropTypes.func,
        onMouseLeave: PropTypes.func,
        theme: PropTypes.shape({
          tooltip: PropTypes.string,
          tooltipActive: PropTypes.string,
          tooltipWrapper: PropTypes.string
        }),
        tooltip: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.node
        ]),
        tooltipDelay: PropTypes.number,
        tooltipHideOnClick: PropTypes.bool,
        tooltipPosition: PropTypes.oneOf(Object.keys(POSITION).map(key => POSITION[key]))
      };

      static defaultProps = {
        className: defaultClassName,
        tooltipDelay: defaultDelay,
        tooltipHideOnClick: defaultHideOnClick,
        tooltipPosition: defaultPosition
      };

      state = {
        active: false,
        position: this.props.tooltipPosition,
        visible: false
      };

      componentWillUnmount () {
        if (this.refs.tooltip) {
          events.removeEventListenerOnTransitionEnded(this.refs.tooltip, this.onTransformEnd);
        }
      }

      activate ({ top, left, position }) {
        if (this.timeout) clearTimeout(this.timeout);
        this.setState({ visible: true, position });
        this.timeout = setTimeout(() => {
          this.setState({ active: true, top, left });
        }, this.props.tooltipDelay);
      }

      deactivate () {
        if (this.timeout) clearTimeout(this.timeout);
        if (this.state.active) {
          events.addEventListenerOnTransitionEnded(this.refs.tooltip, this.onTransformEnd);
          this.setState({ active: false });
        } else if (this.state.visible) {
          this.setState({ visible: false });
        }
      }

      getPosition (element) {
        const { tooltipPosition } = this.props;
        if (tooltipPosition === POSITION.HORIZONTAL) {
          const origin = element.getBoundingClientRect();
          const { width: ww } = utils.getViewport();
          const toRight = origin.left < ((ww / 2) - origin.width / 2);
          return toRight ? POSITION.RIGHT : POSITION.LEFT;
        } else if (tooltipPosition === POSITION.VERTICAL) {
          const origin = element.getBoundingClientRect();
          const { height: wh } = utils.getViewport();
          const toBottom = origin.top < ((wh / 2) - origin.height / 2);
          return toBottom ? POSITION.BOTTOM : POSITION.TOP;
        } else {
          return tooltipPosition;
        }
      }

      calculatePosition (element) {
        const position = this.getPosition(element);
        const { top, left, height, width } = element.getBoundingClientRect();
        const xOffset = window.scrollX || window.pageXOffset;
        const yOffset = window.scrollY || window.pageYOffset;
        if (position === POSITION.BOTTOM) {
          return {
            top: top + height + yOffset,
            left: left + (width / 2) + xOffset,
            position
          };
        } else if (position === POSITION.TOP) {
          return {
            top: top + yOffset,
            left: left + (width / 2) + xOffset,
            position
          };
        } else if (position === POSITION.LEFT) {
          return {
            top: top + (height / 2) + yOffset,
            left: left + xOffset,
            position
          };
        } else if (position === POSITION.RIGHT) {
          return {
            top: top + (height / 2) + yOffset,
            left: left + width + xOffset,
            position
          };
        }
      }

      onTransformEnd = (e) => {
        if (e.propertyName === 'transform') {
          events.removeEventListenerOnTransitionEnded(this.refs.tooltip, this.onTransformEnd);
          this.setState({ visible: false });
        }
      };

      handleMouseEnter = (event) => {
        this.activate(this.calculatePosition(event.target));
        if (this.props.onMouseEnter) this.props.onMouseEnter(event);
      };

      handleMouseLeave = (event) => {
        this.deactivate();
        if (this.props.onMouseLeave) this.props.onMouseLeave(event);
      };

      handleClick = (event) => {
        if (this.props.tooltipHideOnClick) this.deactivate();
        if (this.props.onClick) this.props.onClick(event);
      };

      render () {
        const { active, left, top, position, visible } = this.state;
        const positionClass = `tooltip${position.charAt(0).toUpperCase() + position.slice(1)}`;
        const {
          children,
          className,
          theme,
          tooltip,
          tooltipDelay,       //eslint-disable-line no-unused-vars
          tooltipHideOnClick, //eslint-disable-line no-unused-vars
          tooltipPosition,    //eslint-disable-line no-unused-vars
          ...other
        } = this.props;

        const _className = classnames(theme.tooltip, {
          [theme.tooltipActive]: active,
          [theme[positionClass]]: theme[positionClass]
        });

        return (
          <ComposedComponent
            {...other}
            className={className}
            onClick={this.handleClick}
            onMouseEnter={this.handleMouseEnter}
            onMouseLeave={this.handleMouseLeave}
            theme={theme}
          >
            {children ? children : null}
            {visible && (
              <Portal>
                <span ref="tooltip" className={_className} data-react-toolbox="tooltip" style={{top, left}}>
                  <span className={theme.tooltipInner}>{tooltip}</span>
                </span>
              </Portal>
            )}
          </ComposedComponent>
        );
      }
    }

    return themr(TOOLTIP, defaultTheme)(TooltippedComponent);
  };
};

export default tooltipFactory;
