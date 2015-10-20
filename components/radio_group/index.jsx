import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import RadioButton from './radio_button';

export default React.createClass({
  mixins: [PureRenderMixin],

  displayName: 'RadioGroup',

  propTypes: {
    className: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    name: React.PropTypes.string,
    onChange: React.PropTypes.func,
    value: React.PropTypes.any
  },

  getDefaultProps () {
    return {
      className: '',
      disabled: false
    };
  },

  getInitialState () {
    return { value: this.props.value };
  },

  handleChange (value, event) {
    this.setState({value: value}, () => {
      if (this.props.onChange) this.props.onChange(event, this);
    });
  },

  renderRadioButtons () {
    return React.Children.map(this.props.children, (radio, idx) => {
      return (
        <RadioButton
          {...radio.props}
          checked={radio.props.value === this.state.value}
          disabled={this.props.disabled || radio.props.disabled}
          key={idx}
          label={radio.props.label}
          onChange={this.handleChange.bind(this, radio.props.value)}
          value={radio.props.value}
        />
      );
    });
  },

  render () {
    return (
      <div className={this.props.className}>
        {this.renderRadioButtons()}
      </div>
    );
  },

  getValue () {
    return this.state.value;
  },

  setValue (value) {
    this.setState({value: value});
  }
});
