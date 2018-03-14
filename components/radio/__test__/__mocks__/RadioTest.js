import React, { Component } from 'react';
import { RadioButton } from '../../RadioButton';
import { RadioGroup } from '../../RadioGroup';

export class RadioTest extends Component {
  constructor() {
    super();
    this.state = { value: 'vue' };
  }

  handleChange = (value) => {
    this.setState({ value });
  };

  render() {
    return (
      <RadioGroup name="library" value={this.state.value} onChange={this.handleChange}>
        <RadioButton label="React" value="react" />
        <RadioButton label="Vue" value="vue" />
        <RadioButton label="Angular" value="angular" disabled />
        <RadioButton label="Redux" value="redux" />
      </RadioGroup>
    );
  }
}
