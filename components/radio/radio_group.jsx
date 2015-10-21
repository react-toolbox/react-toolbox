import React from 'react';
import RadioButton from './radio_button';

export default class RadioGroup extends React.Component {
  static propTypes = {
    className: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    name: React.PropTypes.string,
    onChange: React.PropTypes.func,
    value: React.PropTypes.any
  };

  static defaultProps = {
    className: '',
    disabled: false
  };

  state = {
    value: this.props.value
  };

  handleChange (value, event) {
    this.setState({value: value}, () => {
      if (this.props.onChange) this.props.onChange(event, this);
    });
  }

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
  }

  render () {
    return (
      <div className={this.props.className}>
        {this.renderRadioButtons()}
      </div>
    );
  }

  getValue () {
    return this.state.value;
  }

  setValue (value) {
    this.setState({value: value});
  }
};
