import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import style from './style.menu_item';
import FontIcon from '../font_icon';

export default React.createClass({

  mixins: [PureRenderMixin],

  displayName: 'MenuItem',

  propTypes: {
    caption: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    icon: React.PropTypes.string,
    shortcut: React.PropTypes.string
  },

  getDefaultProps () {
    return {
      disabled: false
    };
  },

  handleClick (event) {
    console.log('menuitem.handleClick');
  },

  render () {
    let className = style.root;
    if (this.props.className) className += ` ${this.props.className}`;
    if (this.props.disabled) className += ` ${style.disabled}`;

    return (
      <li
        data-react-toolbox='menu-item'
        className={className}
        onClick={this.handleClick}
      >
        { this.props.icon ? <FontIcon value={this.props.icon} className={style.icon}/> : null }
        <span className={style.caption}>{this.props.caption}</span>
        { this.props.shortcut ? <small>{this.props.shortcut}</small> : null }
      </li>
    );
  }
});
