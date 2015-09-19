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
    return (
      <span
        data-react-toolbox='icon'
        className={`${style.root} ${this.props.className} ${this.props.value}`}
        onClick={this.props.onClick}
      />
    );
  }
});
