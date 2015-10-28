import React from 'react';
import FontIcon from '../font_icon';
import Ripple from '../ripple';
import style from './style.menu_item';

class MenuItem extends React.Component {
  static propTypes = {
    caption: React.PropTypes.string,
    className: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    icon: React.PropTypes.string,
    ripple: React.PropTypes.bool,
    shortcut: React.PropTypes.string,
    selected: React.PropTypes.bool
  };

  static defaultProps = {
    className: '',
    disabled: false,
    ripple: false,
    selected: false
  };

  handleClick = (event) => {
    if (this.props.onClick && !this.props.disabled) {
      this.props.onClick(event, this);
    }
  };

  handleMouseDown = (event) => {
    if (this.props.ripple && !this.props.disabled) {
      this.refs.ripple.start(event);
    }
  };

  render () {
    let className = style.root;
    if (this.props.selected) className += ` ${style.selected}`;
    if (this.props.disabled) className += ` ${style.disabled}`;
    if (this.props.className) className += ` ${this.props.className}`;

    return (
      <li
        data-react-toolbox='menu-item'
        className={className}
        onClick={this.handleClick}
        onMouseDown={this.handleMouseDown}
      >
        { this.props.icon ? <FontIcon value={this.props.icon} className={style.icon}/> : null }
        <span className={style.caption}>{this.props.caption}</span>
        { this.props.shortcut ? <small className={style.shortcut}>{this.props.shortcut}</small> : null }
        { this.props.ripple ? <Ripple ref='ripple' className={style.ripple} spread={2.5} /> : null }
      </li>
    );
  }
}

export default MenuItem;
