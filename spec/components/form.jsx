import React from 'react';
import Form from '../../components/form';

class FormTest extends React.Component {
  state = {
    attributes: [
      { ref: 'name', label: 'Your Name', required: true, storage: true},
      { ref: 'description', multiline: true, label: 'Description', value: 'Doer'},
      { ref: 'birthdate', type: 'date', label: 'Birthdate'},
      { ref: 'years', type: 'number', label: 'Years'},
      { ref: 'twitter', label: 'Nickname', disabled: true},
      { ref: 'nomad', type: 'checkbox', label: 'Are you a nomad?', value: true},
      { ref: 'cow', type: 'checkbox', label: 'Are you a cow?', value: false},
      { ref: 'girl', type: 'checkbox', label: 'Are you a girl?', value: false, disabled: true},
      { ref: 'nomad_2', type: 'radio', label: 'Are you a nomad_2?', value: true},
      { ref: 'cow_2', type: 'radio', label: 'Are you a cow_2?', value: false},
      { ref: 'girl_2', type: 'radio', label: 'Are you a girl_2?', value: false, disabled: true},
      { ref: 'type_user', type: 'dropdown', label: 'Type of user', dataSource: [{value: 1, label: 'Normal'}, {value: 2, label: 'Root'}]},
      { type: 'submit', label: 'Send', style: 'primary anchor', disabled: true}
    ]
  };

  handleEvent = (type, event, form) => {
    console.log(`[FORM.${type}]`, form.getValue());
  };

  render () {
    return (
      <section>
        <h2>Form</h2>
        <p>lorem ipsum...</p>

        <Form
          attributes={this.state.attributes}
          storage="example-form"
          onChange={this.handleEvent.bind(this, 'change')}
          onError={this.handleEvent.bind(this, 'error')}
          onValid={this.handleEvent.bind(this, 'valid')}
          onSubmit={this.handleEvent.bind(this, 'submit')} />
      </section>
    );
  }
}

export default FormTest;
