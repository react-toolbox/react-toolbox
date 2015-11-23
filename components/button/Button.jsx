/* eslint-disable no-redeclare */
import React from 'react';
import ClassNames from 'classnames';
import FontIcon from '../font_icon';
import Ripple from '../ripple';
import Tooltip from '../tooltip';
import style from './style';
import events from '../utils/events';

class Button extends React.Component {
  static propTypes = {
    accent: React.PropTypes.bool,
    children: React.PropTypes.node,
    className: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    flat: React.PropTypes.bool,
    floating: React.PropTypes.bool,
    href: React.PropTypes.string,
    icon: React.PropTypes.string,
    inverse: React.PropTypes.bool,
    label: React.PropTypes.string,
    loading: React.PropTypes.bool,
    mini: React.PropTypes.bool,
    primary: React.PropTypes.bool,
    raised: React.PropTypes.bool,
    ripple: React.PropTypes.bool,
    toggle: React.PropTypes.bool,
    tooltip: React.PropTypes.string,
    tooltipDelay: React.PropTypes.number,
    type: React.PropTypes.string
  };

  static defaultProps = {
    accent: false,
    className: '',
    flat: false,
    floating: false,
    loading: false,
    mini: false,
    primary: false,
    raised: false,
    ripple: true,
    toggle: false
  };

  handleMouseDown = (event) => {
    events.pauseEvent(event);
    if (this.refs.ripple) this.refs.ripple.start(event);
    if (this.props.onMouseDown) this.props.onMouseDown(event);
  };

  handleTouchStart = (event) => {
    events.pauseEvent(event);
    if (this.refs.ripple) this.refs.ripple.start(event.touches[0], true);
    if (this.props.onTouchStart) this.props.onTouchStart(event);
  };

  render () {
    const {accent, className, flat, floating, href, icon, inverse, label,
           loading, mini, primary, raised, ripple, toggle,
           tooltip, tooltipDelay, ...others} = this.props;
    const element = href ? 'a' : 'button';
    const level = primary ? 'primary' : accent ? 'accent' : 'neutral';
    const shape = flat ? 'flat' : raised ? 'raised' : floating ? 'floating' : toggle ? 'toggle' : 'flat';

    const classes = ClassNames([ style[shape], style[level] ], {
      [style.mini]: mini,
      [style.inverse]: inverse
    }, className);

    const props = {
      ...others,
      href,
      className: classes,
      disabled: this.props.disabled || this.props.loading,
      onMouseDown: this.handleMouseDown,
      onTouchStart: this.handleTouchStart
    };

    return React.createElement(element, props,
      ripple ? <Ripple ref='ripple' loading={loading}/> : null,
      tooltip ? <Tooltip className={style.tooltip} delay={tooltipDelay} label={tooltip}/> : null,
      icon ? <FontIcon className={style.icon} value={icon}/> : null,
      label ? label : this.props.children
    );
  }
}

export default Button;
