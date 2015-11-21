import React from 'react';
import Button from '../button';
import FontIcon from '../font_icon';
import Overlay from '../overlay';
import style from './style';

class Snackbar extends React.Component {
  static propTypes = {
    action: React.PropTypes.string,
    active: React.PropTypes.bool,
    className: React.PropTypes.string,
    icon: React.PropTypes.string,
    label: React.PropTypes.string.isRequired,
    onClick: React.PropTypes.func,
    onTimeout: React.PropTypes.func,
    timeout: React.PropTypes.number,
    type: React.PropTypes.string
  };

  componentDidUpdate () {
    if (this.props.active && this.props.timeout) {
      setTimeout(() => {
        this.props.onTimeout();
      }, this.props.timeout);
    }
  }

  renderButton () {
    if (this.props.action) {
      return (
        <Button
          className={style.button}
          label={this.props.action}
          onClick={this.props.onClick}
        />
      );
    }
  }

  render () {
    let className = `${style.root} ${style[this.props.type]}`;
    if (this.props.active) className += ` ${style.active}`;
    if (this.props.className) className += ` ${this.props.className}`;

    return (
      <Overlay active={this.props.active} opacity={0}>
        <div data-react-toolbox='snackbar' className={className}>
          { this.props.icon ? <FontIcon value={this.props.icon} className={style.icon} /> : null }
          <span className={style.label}>{this.props.label}</span>
          { this.renderButton() }
        </div>
      </Overlay>
    );
  }
}

export default Snackbar;
