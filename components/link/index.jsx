import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import style from './style';
import FontIcon from '../font_icon';

export default React.createClass({
  mixins: [PureRenderMixin],

  displayName: 'Link',

  propTypes: {
    label: React.PropTypes.string,
    className: React.PropTypes.string,
    count: React.PropTypes.number,
    icon: React.PropTypes.string,
    onClick: React.PropTypes.func,
    route: React.PropTypes.string
  },

  getDefaultProps () {
    return {
      attributes: '',
      className: ''
    };
  },

  render () {
    let className = style.root;
    if (this.props.className) className += ` ${this.props.className}`;
    return (
      <a
        {...this.props}
        data-react-toolbox='link'
        data-flex='horizontal center'
        href={this.props.route}
        className={className}
      >
        { this.props.icon ? <FontIcon className={style.icon} value={this.props.icon} /> : null }
        { this.props.label ? <abbr>{this.props.label}</abbr> : null }
        { this.props.count && parseInt(this.props.count) !== 0 ? <small>{this.props.count}</small> : null}
      </a>
    );
  }
});
