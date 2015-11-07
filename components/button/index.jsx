import React from 'react';
import FontIcon from '../font_icon';
import Ripple from '../ripple';
import Tooltip from '../tooltip';
import style from './style';
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
    tooltip: React.PropTypes.string,
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
    if (this.props.onMouseDown) this.props.onMouseDown(event);
  };

  render () {
    let className = style[this.props.kind];
    const {label, icon, loading, ripple, primary, accent, mini, kind, tooltip, ...others} = this.props;
    if (this.props.className) className += ` ${this.props.className}`;
    if (!primary && !accent) className += ` ${style.primary}`;
    if (primary) className += ` ${style.primary}`;
    if (accent) className += ` ${style.accent}`;
    if (mini) className += ` ${style.mini}`;

    return (
      <button
        data-react-toolbox='button'
        {...others}
        className={className}
        onMouseDown={this.handleMouseDown}
        disabled={this.props.disabled || this.props.loading}
      >
        { ripple ? <Ripple ref='ripple' loading={loading}/> : null }
        { icon ? <FontIcon className={style.icon} value={icon}/> : null }
        { label ? <abbr className={style.label}>{label}</abbr> : null }
        { tooltip ? <Tooltip label={tooltip}/> : null }
      </button>
    );
  }
}

export default Button;
