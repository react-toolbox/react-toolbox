import React from 'react';
import FontIcon from '../font_icon';
import Ripple from '../ripple';
import style from './style.scss';
import events from '../utils/events';

export default class Button extends React.Component {
  static propTypes = {
    className: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    icon: React.PropTypes.string,
    primary: React.PropTypes.bool,
    accent: React.PropTypes.bool,
    label: React.PropTypes.string,
    loading: React.PropTypes.bool,
    ripple: React.PropTypes.bool,
    type: React.PropTypes.string
  };

  static defaultProps = {
    className: '',
    ripple: true,
    type: 'flat'
  };

  state = {
    loading: this.props.loading
  };

  handleMouseDown (event) {
    events.pauseEvent(event);
    this.refs.ripple.start(event);
  }

  render () {
    let className = style[this.props.type];
    if (this.props.className) className += ` ${this.props.className}`;

    return (
      <button
        data-react-toolbox='button'
        {...this.props}
        type=''
        label=''
        data-toolbox='button'
        className={className}
        disabled={this.props.disabled || this.state.loading}
        onMouseDown={this.handleMouseDown}
      >
        { this.props.ripple ? <Ripple ref='ripple' loading={this.props.loading}/> : null }
        { this.props.icon ? <FontIcon className={style.icon} value={this.props.icon}/> : null }
        { this.props.label ? <abbr className={style.label}>{this.props.label}</abbr> : null }
      </button>
    );
  }

  loading (value) {
    this.setState({loading: value});
  }
};
