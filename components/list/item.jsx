import React from 'react';
import FontIcon from '../font_icon';
import ListItemContent from './Content';
import Ripple from '../ripple';
import style from './style';

class ListItem extends React.Component {
  static propTypes = {
    avatar: React.PropTypes.string,
    caption: React.PropTypes.string.isRequired,
    className: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    leftIcon: React.PropTypes.string,
    legend: React.PropTypes.string,
    onClick: React.PropTypes.func,
    rightIcon: React.PropTypes.string,
    ripple: React.PropTypes.bool,
    selectable: React.PropTypes.bool,
    to: React.PropTypes.string
  };

  static defaultProps = {
    disabled: false,
    ripple: false,
    selectable: false
  };

  handleClick = (event) => {
    if (this.props.onClick && !this.props.disabled) {
      this.props.onClick(event);
    }
  };

  handleMouseDown = (event) => {
    if (this.refs.ripple && !this.props.disabled) {
      this.refs.ripple.start(event);
    }
  };

  renderContent () {
    let className = style.item;
    if (this.props.legend) className += ` ${style['with-legend']}`;
    if (this.props.disabled) className += ` ${style.disabled}`;
    if (this.props.className) className += ` ${this.props.className}`;
    if (this.props.selectable) className += ` ${style.selectable}`;

    return (
      <span className={className}>
        {this.props.leftIcon ? <FontIcon className={`${style.icon} ${style.left}`} value={this.props.leftIcon} /> : null}
        {this.props.avatar ? <img className={style.avatar} src={this.props.avatar} /> : null}
        <ListItemContent caption={this.props.caption} legend={this.props.legend} />
        {this.props.ripple ? <Ripple ref='ripple' className={style.ripple} spread={2} /> : null}
        {this.props.rightIcon ? <FontIcon className={`${style.icon} ${style.right}`} value={this.props.rightIcon} /> : null}
      </span>
    );
  }

  render () {
    return (
      <li className={style['list-item']} onClick={this.handleClick} onMouseDown={this.handleMouseDown}>
        {this.props.to ? <a href={this.props.to}>{this.renderContent()}</a> : this.renderContent()}
      </li>
    );
  }
}

export default ListItem;
