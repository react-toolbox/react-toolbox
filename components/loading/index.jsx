/* global React */

import { addons } from 'react/addons';
require('./style');

export default React.createClass({
  mixins: [addons.PureRenderMixin],

  displayName: 'Loading',

  propTypes: {
    type: React.PropTypes.string
  },

  getDefaultProps () {
    return {
      type: 'normal'
    };
  },

  render () {
    return (
      <div data-component-loading={this.props.type} data-flex="vertical center">
        <div></div><div></div><div></div>
      </div>
    );
  }
});
