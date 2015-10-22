import React from 'react';
import FontIcon from '../font_icon';
import Ripple from '../ripple';
import style from './style.scss';
import events from '../utils/events';

class Button extends React.Component {
  static propTypes = {
    accent: React.PropTypes.bool,
    className: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    icon: React.PropTypes.string,
    kind: React.PropTypes.string,
    label: React.PropTypes.string,
    loading: React.PropTypes.bool,
    mini: React.PropTypes.bool,
    primary: React.PropTypes.bool,
    ripple: React.PropTypes.bool,
    type: React.PropTypes.string
  };

  static defaultProps = {
    accent: false,
    className: '',
    kind: 'flat',
    loading: false,
    mini: false,
    primary: false,
    ripple: true
  };

  handleMouseDown = (event) => {
    events.pauseEvent(event);
    this.refs.ripple.start(event);
  };

  render () {
    let className = style[this.props.kind];
    if (!this.props.primary && !this.props.accent) className += ` ${style.primary}`;
    if (this.props.className) className += ` ${this.props.className}`;
    if (this.props.primary) className += ` ${style.primary}`;
    if (this.props.accent) className += ` ${style.accent}`;
    if (this.props.mini) className += ` ${style.mini}`;

    return (
      <button
        {...this.props}
        label=''
        className={className}
        data-react-toolbox='button'
        onMouseDown={this.handleMouseDown}
        disabled={this.props.disabled || this.props.loading}
      >
        { this.props.ripple ? <Ripple ref='ripple' loading={this.props.loading}/> : null }
        { this.props.icon ? <FontIcon className={style.icon} value={this.props.icon}/> : null }
        { this.props.label ? <abbr className={style.label}>{this.props.label}</abbr> : null }
      </button>
    );
  }
}

export default Button;
