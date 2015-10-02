/* global React */

import { addons } from 'react/addons';
import style from './style';
import CSSModules from 'react-css-modules';

const FontIcon = React.createClass({
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
        data-toolbox='icon'
        className={this.props.className}
        styleName={this.props.value}
        onClick={this.props.onClick}
      />
    );
  }
});

export default CSSModules(FontIcon, style);
