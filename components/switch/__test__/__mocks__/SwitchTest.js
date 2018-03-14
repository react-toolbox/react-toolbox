import React, { Component } from 'react';
import { Switch } from '../../Switch';

export class SwitchTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      switch_1: true,
      switch_2: false,
      switch_3: true,
    };
  }

  handleChange = (field, value) => {
    this.setState({ [field]: value });
  };

  render() {
    return (
      <section>
        <Switch
          checked={this.state.switch_1}
          label="Push notifications"
          onChange={this.handleChange('switch_1')}
        />
        <Switch
          checked={this.state.switch_2}
          label="Mail notifications"
          onChange={this.handleChange('switch_2')}
        />
        <Switch
          checked={this.state.switch_3}
          disabled
          label="Nothing, thanks"
          onChange={this.handleChange('switch_3')}
        />
      </section>
    );
  }
}
