import React from 'react';
import style from './style';
import Button from '../button';
import FontIcon from '../font_icon';

class Snackbar extends React.Component {
  static propTypes = {
    action: React.PropTypes.string,
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
        this.props.onTimeout(event, this);
      }, this.props.timeout * 1000);
    }
  }

  renderButton () {
    if (this.props.action) {
      return (
        <Button
          className={style.button}
          kind='flat'
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
      <div data-react-toolbox='snackbar' className={className}>
        { this.props.icon ? <FontIcon value={this.props.icon} className={style.icon} /> : null }
        <span className={style.label}>{this.props.label}</span>
        { this.renderButton() }
      </div>
    );
  }
}

export default Snackbar;
