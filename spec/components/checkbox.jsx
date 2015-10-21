import React from 'react';
import autobind from 'autobind-decorator'
import Checkbox from '../../components/checkbox';

@autobind
export default class CheckboxTest extends React.Component {
  handleChange (event, instance) {
    console.log('Changed!', instance.getValue());
  }

  handleFocus () {
    console.log('Focused');
  }

  handleBlur () {
    console.log('Blur');
  }

  render () {
    return (
      <section>
        <h5>Checkbox</h5>
        <p style={{marginBottom: '10px'}}>Lorem ipsum...</p>

        <Checkbox
          label="Checked checkbox"
          checked
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
        />
        <Checkbox
          label="Not checked biatch"
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
        />
        <Checkbox
          label="Disabled checkbox"
          checked
          disabled
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
        />
      </section>
    );
  }
};
