import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import FontIcon from '../font_icon';
import ListItemContent from './content';
import Ripple from '../ripple';
import style from './style';

const ListItem = React.createClass({
  mixins: [PureRenderMixin],

  propTypes: {
    avatar: React.PropTypes.string,
    caption: React.PropTypes.string.isRequired,
    disabled: React.PropTypes.bool,
    leftIcon: React.PropTypes.string,
    legend: React.PropTypes.string,
    rightIcon: React.PropTypes.string,
    ripple: React.PropTypes.bool,
    selectable: React.PropTypes.bool
  },

  getDefaultProps () {
    return {
      disabled: false,
      ripple: false,
      selectable: false
    };
  },

  handleClick (event) {
    if (this.props.onClick && !this.props.disabled) {
      this.props.onClick(event);
    }
  },

  handleMouseDown (event) {
    if (this.refs.ripple && !this.props.disabled) {
      this.refs.ripple.start(event);
    }
  },

  render () {
    let className = style.item;
    if (this.props.legend) className += ` ${style['with-legend']}`;
    if (this.props.disabled) className += ` ${style.disabled}`;
    if (this.props.selectable) className += ` ${style.selectable}`;
    if (this.props.className) className += ` ${this.props.className}`;

    return (
      <li
        className={className}
        onClick={this.handleClick}
        onMouseDown={this.handleMouseDown}
      >
        { this.props.leftIcon ? <FontIcon className={`${style.icon} ${style.left}`} value={this.props.leftIcon} /> : null }
        { this.props.avatar ? <img className={style.avatar} src={this.props.avatar} /> : null }
        <ListItemContent caption={this.props.caption} legend={this.props.legend} />
        { this.props.ripple ? <Ripple ref='ripple' className={style.ripple} spread={2} /> : null }
        { this.props.rightIcon ? <FontIcon className={`${style.icon} ${style.right}`} value={this.props.rightIcon} /> : null }
      </li>
    );
  }
});

export default ListItem;
