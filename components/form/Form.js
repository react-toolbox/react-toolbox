import React, { Component, PropTypes } from 'react';
import InjectAutocomplete from '../autocomplete/Autocomplete.js';
import InjectButton from '../button/Button.js';
import InjectCheckbox from '../checkbox/Checkbox.js';
import InjectDatePicker from '../date_picker/DatePicker.js';
import InjectDropdown from '../dropdown/Dropdown.js';
import InjectInput from '../input/Input.js';
import InjectRadioGroup from '../radio/RadioGroup.js';
import InjectSlider from '../slider/Slider.js';
import InjectSwitch from '../switch/Switch.js';
import InjectTimePicker from '../time_picker/TimePicker.js';

const factory = (
    Autocomplete, Button, Checkbox, DatePicker, Dropdown,
    Input, RadioGroup, Slider, Switch, TimePicker
  ) => {

  const COMPONENTS = {
    'autocomplete': Autocomplete,
    'button': Button,
    'checkbox': Checkbox,
    'datepicker': DatePicker,
    'dropdown': Dropdown,
    'input': Input,
    'radioGroup': RadioGroup,
    'slider': Slider,
    'switch': Switch,
    'timepicker': TimePicker
  };

  class Form extends Component {
    static propTypes = {
      attributes: PropTypes.array,
      children: PropTypes.node,
      className: PropTypes.string,
      model: PropTypes.object,
      onChange: PropTypes.func,
      onError: PropTypes.func,
      onSubmit: PropTypes.func,
      onValid: PropTypes.func,
      storage: PropTypes.string
    };

    static defaultProps = {
      attributes: [],
      className: ''
    };

    onSubmit = (event) => {
      event.preventDefault();
      if (this.props.onSubmit) this.props.onSubmit(event);
    };

    onChange = (field, value, event) => {
      if (this.props.onChange) this.props.onChange(field, value, event);
    };

    renderFields () {
      return Object.keys(this.props.model).map((field, index) => {
        const properties = this.props.model[field];
        const Field = COMPONENTS[properties.kind.toLowerCase()];
        return <Field key={index} {...properties} onChange={this.onChange.bind(this, field)} />;
      });
    }

    render () {
      return (
        <form data-react-toolbox='form' className={this.props.className} onSubmit={this.onSubmit}>
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
