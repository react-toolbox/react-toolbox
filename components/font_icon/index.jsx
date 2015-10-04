/* global React */

import { addons } from 'react/addons';
import style from './style';

export default React.createClass({
  mixins: [addons.PureRenderMixin],

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

  onClick (event) {
    if (this.props.onClick) {
      this.props.onClick(event);
    }
  },

  render () {
    let className = style[this.props.value];
    if (this.props.className) className += ` ${this.props.className}`;
    return <span data-toolbox='icon' className={className} onClick={this.props.onClick} />;
  }
});
