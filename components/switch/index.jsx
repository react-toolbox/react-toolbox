/* global React */

import { addons } from 'react/addons';
import style from './style';

export default React.createClass({
  mixins: [addons.PureRenderMixin],

  displayName: 'Switch',

  propTypes: {
    className: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    label: React.PropTypes.string,
    onChange: React.PropTypes.func,
    value: React.PropTypes.bool
  },

  getDefaultProps () {
    return {
      className: ''
    };
  },

  getInitialState () {
    return {
      value: this.props.value
    };
  },

  componentWillReceiveProps (next_props) {
    if (next_props.value) {
      this.setState({value: next_props.value});
    }
  },

  onClick (event) {
    if (!this.props.disabled) {
      this.setState({value: !this.state.value});
      setTimeout(() => {
        if (this.props.onChange) this.props.onChange(event, this);
      }, 10);
    }
  },

  render () {
    let className = `${style.root} ${this.props.className}`;
    if (this.state.value) className += ' checked';
    if (this.props.disabled) className += ' disabled';

    return (
      <div
        data-react-toolbox='switch'
        className={className}
        onClick={this.onClick}
      >
        <span></span>
        { this.props.label ? <label>{this.props.label}</label> : null }
      </div>
    );
  },

  getValue () {
    return this.state.value;
  },

  setValue (data) {
    this.setState({value: data});
  }
});
