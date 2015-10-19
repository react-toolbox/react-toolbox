import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Checkbox from '../checkbox';
import ListItemContent from './content';
import style from './style';

const ListCheckbox = React.createClass({
  mixins: [PureRenderMixin],

  propTypes: {
    caption: React.PropTypes.string.isRequired,
    checked: React.PropTypes.bool,
    className: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    legend: React.PropTypes.string,
    name: React.PropTypes.string,
    onBlur: React.PropTypes.func,
    onChange: React.PropTypes.func,
    onFocus: React.PropTypes.func
  },

  getDefaultProps () {
    return {
      disabled: false
    };
  },

  render () {
    let className = `${style.item} ${style['checkbox-item']}`;
    if (this.props.legend) className += ` ${style['with-legend']}`;
    if (this.props.disabled) className += ` ${style.disabled}`;
    if (this.props.className) className += ` ${this.props.className}`;

    return (
      <li className={className}>
        <Checkbox
          checked={this.props.checked}
          className={style.checkbox}
          disabled={this.props.disabled}
          label={<ListItemContent caption={this.props.caption} legend={this.props.legend} />}
          name={this.props.name}
          onBlur={this.props.onBlur}
          onChange={this.props.onChange}
          onFocus={this.props.onFocus}
        />
      </li>
    );
  }
});

export default ListCheckbox;
