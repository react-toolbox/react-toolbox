import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import style from './style';

export default React.createClass({
  mixins: [PureRenderMixin],

  displayName: 'FontIcon',

  propTypes: {
    className: React.PropTypes.string,
    value: React.PropTypes.string
  },

  getDefaultProps () {
    return {
      className: ''
    };
  },

  render () {
    let className = style[this.props.value];
    if (this.props.className) className += ` ${this.props.className}`;
    return (
      <span data-react-toolbox='icon' {...this.props} className={className}>
        {this.props.children}
      </span>
    );
  }
});
