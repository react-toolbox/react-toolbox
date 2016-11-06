import React, { Component, PropTypes } from 'react';
import InjectAutocomplete from '../autocomplete/Autocomplete';
import InjectButton from '../button/Button';
import InjectCheckbox from '../checkbox/Checkbox';
import InjectDatePicker from '../date_picker/DatePicker';
import InjectDropdown from '../dropdown/Dropdown';
import InjectInput from '../input/Input';
import InjectRadioGroup from '../radio/RadioGroup';
import InjectSlider from '../slider/Slider';
import InjectSwitch from '../switch/Switch';
import InjectTimePicker from '../time_picker/TimePicker';

const factory = (
    Autocomplete, Button, Checkbox, DatePicker, Dropdown,
    Input, RadioGroup, Slider, Switch, TimePicker
  ) => {
  const COMPONENTS = {
    autocomplete: Autocomplete,
    button: Button,
    checkbox: Checkbox,
    datepicker: DatePicker,
    dropdown: Dropdown,
    input: Input,
    radioGroup: RadioGroup,
    slider: Slider,
    switch: Switch,
    timepicker: TimePicker,
  };

  class Form extends Component {
    static propTypes = {
      attributes: PropTypes.array, // eslint-disable-line react/no-unused-prop-types
      children: PropTypes.node,
      className: PropTypes.string,
      model: PropTypes.object,
      onChange: PropTypes.func,
      onError: PropTypes.func, // eslint-disable-line react/no-unused-prop-types
      onSubmit: PropTypes.func,
      onValid: PropTypes.func, // eslint-disable-line react/no-unused-prop-types
      storage: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
    };

    static defaultProps = {
      attributes: [],
      className: '',
    };

    onSubmit = (event) => {
      event.preventDefault();
      if (this.props.onSubmit) this.props.onSubmit(event);
    };

    onChange = (field, value, event) => {
      if (this.props.onChange) this.props.onChange(field, value, event);
    };

    renderFields() {
      return Object.keys(this.props.model).map((field, index) => {
        const properties = this.props.model[field];
        const Field = COMPONENTS[properties.kind.toLowerCase()];
        return <Field key={index} {...properties} onChange={this.onChange.bind(this, field)} />;
      });
    }

    render() {
      return (
        <form data-react-toolbox="form" className={this.props.className} onSubmit={this.onSubmit}>
          {this.renderFields()}
          {this.props.children}
        </form>
      );
    }
  }

  return Form;
};

const Form = factory(
  InjectAutocomplete, InjectButton, InjectCheckbox, InjectDatePicker, InjectDropdown,
  InjectInput, InjectRadioGroup, InjectSlider, InjectSwitch, InjectTimePicker
);

export default Form;
export { factory as formFactory };
export { Form };
