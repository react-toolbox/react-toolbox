import React from 'react';

// React-Toolbox full dependency way:
// import {Button, Form} from 'react-toolbox'

// Standalone dependencies way:
import Button from 'react-toolbox/components/button';
import Form from 'react-toolbox/components/form';

const App = React.createClass({
  getInitialState () {
    return {
      fields: [
        { ref: 'username', label: 'Your username', required: true},
        { ref: 'password', type: 'password', label: 'Your password', required: true},
        { type: 'submit', label: 'Login', disabled: true}
      ]
    };
  },

  render () {
    return (
      <app data-toolbox={true}>
        <h1>Hello React-Toolbox</h1>
        <Form attributes={this.state.fields} />
        <Button label='Hello world!' type='square' style='primary'/>
        <Button icon='adb' type='circle' style='accent' />
      </app>
    );
  }
});

React.render(<App />, document.body);
