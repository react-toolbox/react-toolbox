import React, { Component, PropTypes } from 'react';
import Portal from '../hoc/Portal';
import classnames from 'classnames';
import { themr } from 'react-css-themr';
import { TOOLTIP } from '../identifiers.js';
import events from '../utils/events';

const defaults = {
  className: '',
  delay: 0,
  hideOnClick: true,
  theme: {}
};

const tooltipFactory = (options = {}) => {
  const {
    className: defaultClassName,
    delay: defaultDelay,
    hideOnClick: defaultHideOnClick,
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
        tooltip: PropTypes.string,
        tooltipDelay: PropTypes.number,
        tooltipHideOnClick: PropTypes.bool
      };

      static defaultProps = {
        className: defaultClassName,
        tooltipDelay: defaultDelay,
        tooltipHideOnClick: defaultHideOnClick
      };

      state = {
        active: false,
        visible: false
      };

      componentWillUnmount () {
        if (this.refs.tooltip) {
          events.removeEventListenerOnTransitionEnded(this.refs.tooltip, this.onTransformEnd);
        }
      }

      activate (top, left) {
        if (this.timeout) clearTimeout(this.timeout);
        this.setState({ visible: true });
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

      onTransformEnd = (e) => {
        if (e.propertyName === 'transform') {
          events.removeEventListenerOnTransitionEnded(this.refs.tooltip, this.onTransformEnd);
          this.setState({ visible: false });
        }
      };

      handleMouseEnter = (event) => {
        const yOffset = window.scrollY || window.pageYOffset;
        const xOffset = window.scrollX || window.pageXOffset;
        const { top, left, height, width } = event.target.getBoundingClientRect();
        this.activate(top + height + yOffset, left + (width / 2) + xOffset);
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
        const { active, left, top, visible } = this.state;
        const {
          children,
          className,
          theme,
          tooltip,
          tooltipDelay,       //eslint-disable-line no-unused-vars
          tooltipHideOnClick, //eslint-disable-line no-unused-vars
          ...other
        } = this.props;

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
                <span
                  ref="tooltip"
                  children={tooltip}
                  className={classnames(theme.tooltip, {[theme.tooltipActive]: active})}
                  data-react-toolbox="tooltip"
                  style={{ top, left }}
                />
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
