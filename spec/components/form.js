import React from 'react';
import Form from '../../components/form';

const countriesArray = ['Spain', 'England', 'USA', 'Thailand', 'France'];

const countries = [
  { value: 'EN-gb', label: 'England', img: 'http://' },
  { value: 'ES-es', label: 'Spain', img: 'http://' },
  { value: 'TH-th', label: 'Thailand', img: 'http://' },
  { value: 'EN-en', label: 'USA', img: 'http://' },
  { value: 'FR-fr', label: 'France', img: 'http://' }
];

const FormFields = {
  autocomplete: {kind: 'Autocomplete', label: 'Autocomplete', source: countriesArray, value: ''},
  input: {kind: 'Input', type: 'text', label: 'Input', value: '@soyjavi', required: true},
  multiline: {kind: 'Input', type: 'text', label: 'Input (multiline)', multiline: true},
  number: {kind: 'Input', type: 'number', label: 'Input (number)'},
  checkbox: {kind: 'Checkbox', label: 'Checkbox'},
  date: {kind: 'DatePicker', label: 'DatePicker', value: undefined},
  dropdown: {kind: 'Dropdown', label: 'Dropdown', source: countries, value: countries[2].value},
  time: {kind: 'TimePicker', label: 'TimePicker', value: undefined},
  switch: {kind: 'Switch', label: 'Switch'},
  slider: {kind: 'Slider', label: 'Slider', min: 0, max: 10, value: 4, pinned: true},
  submit: {kind: 'Button', type: 'submit', label: 'Button () you a nomad?'}
};

class FormTest extends React.Component {
  state = {
    model: {
      autocomplete: countriesArray[3],
      input: 'soyjavi',
      multiline: 'Overwritten',
      number: 0,
      checkbox: true
    }
  };

  handleEvent = (type, event, form) => {
    console.log(`[FORM.${type}]`, event, form);
  };

  handleChange = (field, value) => {
    console.log('FORM.change', field, value);
    const model = {
      ...this.state.model,
     [field]: value
    };
    this.setState({ model });
  };

  render () {
    Object.keys(this.state.model).map((field) => {
      const formField = FormFields[field];
      formField[formField.hasOwnProperty('value') ? 'value' : 'checked'] = this.state.model[field];
    });

    console.log(FormFields);

    return (
      <section>
        <h5>Form</h5>
        <p>lorem ipsum...</p>

        <Form
          model={FormFields}
          onChange={this.handleChange}
          onError={this.handleEvent.bind(this, 'error')}
          onValid={this.handleEvent.bind(this, 'valid')}
          onSubmit={this.handleEvent.bind(this, 'submit')} />
      </section>
    );
  }
}

export default FormTest;
