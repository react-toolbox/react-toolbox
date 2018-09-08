import React, { Component } from 'react';
import { Switch } from '../../Switch';

export class SwitchTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      switchOne: true,
      switchTwo: false,
      switchThree: true,
    };
  }

  handleChangeOne = () => {
    this.setState({ switchOne: !this.state.switchOne });
  };

  handleChangeTwo = () => {
    this.setState({ switchTwo: !this.state.switchTwo });
  };

  handleChangeThree = () => {
    this.setState({ switchThree: !this.state.switchThree });
  };

  render() {
    return (
      <section>
        <Switch
          checked={this.state.switchOne}
          label="Push notifications"
          name="switchOne"
          onChange={this.handleChangeOne}
        />
        <Switch
          checked={this.state.switchTwo}
          label="Mail notifications"
          name="switchTwo"
          onChange={this.handleChangeTwo}
        />
        <Switch
          checked={this.state.switchThree}
          disabled
          label="Nothing, thanks"
          name="switchThree"
          onChange={this.handleChangeThree}
        />
      </section>
    );
  }
}
