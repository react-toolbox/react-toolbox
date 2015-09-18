/* global React */

import { addons } from 'react/addons';
import css from './style';
import FontIcon from '../font_icon';
import Ripple from '../ripple';

export default React.createClass({
  mixins: [addons.PureRenderMixin],

  displayName: 'Button',

  propTypes: {
    className: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    icon: React.PropTypes.string,
    label: React.PropTypes.string,
    loading: React.PropTypes.bool,
    ripple: React.PropTypes.bool,
    type: React.PropTypes.string
  },

  getDefaultProps () {
    return {
      className: '',
      ripple: true,
      type: 'flat'
    };
  },

  getInitialState () {
    return { loading: this.props.loading };
  },

  handleClick (event) {
    if (this.props.onClick) this.props.onClick(event, this);
  },

  render () {
    let className = this.props.className;
    if (this.props.type) className += ` ${this.props.type}`;
    if (this.state.focused) className += ' focused';

    return (
      <button
        className={css.root + ' ' + className}
        data-flex='horizontal center'
        data-react-toolbox='button'
        disabled={this.props.disabled || this.state.loading}
        onClick={this.handleClick}
      >
        { this.props.icon ? <FontIcon value={this.props.icon}/> : null }
        { this.props.label ? <abbr>{this.props.label}</abbr> : null }
        { this.props.ripple ? <Ripple loading={this.props.loading}/> : null }
      </button>
    );
  },

  loading (value) {
    this.setState({loading: value});
  }
});
