import React from 'react';
import style from './style';

class TabHeader extends React.Component {
  static propTypes = {
    active: React.PropTypes.bool,
    className: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    hidden: React.PropTypes.bool,
    label: React.PropTypes.any.isRequired,
    onActive: React.PropTypes.func,
    onClick: React.PropTypes.func
  };

  static defaultProps = {
    active: false,
    className: '',
    disabled: false,
    hidden: false
  };

  handleClick = () => {
    if (!this.props.disabled && this.props.onClick) {
      this.props.onClick();
    }
  };

  render () {
    let className = style.label;
    if (this.props.active) className += ` ${style.active}`;
    if (this.props.hidden) className += ` ${style.hidden}`;
    if (this.props.disabled) className += ` ${style.disabled}`;
    if (this.props.className) className += ` ${this.props.className}`;

    return (
      <label className={className} onClick={this.handleClick}>
        {this.props.label}
      </label>
    );
  }
}

export default TabHeader;
