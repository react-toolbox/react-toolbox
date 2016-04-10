import React from 'react';
import Autocomplete from '../autocomplete';
import Button from '../button';
import Checkbox from '../checkbox';
import DatePicker from '../date_picker';
import Dropdown from '../dropdown';
import Input from '../input';
import RadioGroup from '../radio/RadioGroup';
import Slider from '../slider';
import Switch from '../switch';
import TimePicker from '../time_picker';
import style from './style';

const Component = {
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

class Form extends React.Component {
  static propTypes = {
    attributes: React.PropTypes.array,
    children: React.PropTypes.node,
    className: React.PropTypes.string,
    model: React.PropTypes.object,
    onChange: React.PropTypes.func,
    onError: React.PropTypes.func,
    onSubmit: React.PropTypes.func,
    onValid: React.PropTypes.func,
    storage: React.PropTypes.string
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
      const Field = Component[properties.kind.toLowerCase()];
      return <Field key={index} {...properties} onChange={this.onChange.bind(this, field)} />;
    });
  }

  render () {
    const className = `${style.root} ${this.props.className}`;

    return (
      <form data-react-toolbox='form' className={className} onSubmit={this.onSubmit}>
        {this.renderFields()}
        {this.props.children}
      </form>
    );
  }
}

export default Form;
