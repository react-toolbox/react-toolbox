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
    href: React.PropTypes.string,
    icon: React.PropTypes.string,
    inverse: React.PropTypes.bool,
    primary: React.PropTypes.bool,
    ripple: React.PropTypes.bool,
    tooltip: React.PropTypes.string,
    tooltipDelay: React.PropTypes.number,
    type: React.PropTypes.string
  };

  static defaultProps = {
    accent: false,
    className: '',
    primary: false,
    ripple: true
  };

  handleMouseDown = (event) => {
    events.pauseEvent(event);
    if (this.refs.ripple) this.refs.ripple.start(event);
    if (this.props.onMouseDown) this.props.onMouseDown(event);
  };

  render () {
    const {accent, children, className, href, icon, inverse,
           primary, ripple, tooltip, tooltipDelay, ...others} = this.props;
    const element = href ? 'a' : 'button';
    const level = primary ? 'primary' : accent ? 'accent' : 'neutral';
    const classes = ClassNames([style.toggle, style[level]], {[style.inverse]: inverse}, className);

    const props = {
      ...others,
      href,
      className: classes,
      disabled: this.props.disabled,
      onMouseDown: this.handleMouseDown,
      'data-react-toolbox': 'button'
    };

    return React.createElement(element, props,
      ripple ? <Ripple ref='ripple' centered /> : null,
      tooltip ? <Tooltip className={style.tooltip} delay={tooltipDelay} label={tooltip}/> : null,
      icon ? <FontIcon className={style.icon} value={icon}/> : children
    );
  }
}

export default Button;
