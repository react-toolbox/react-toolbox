import React from 'react';
import Switch from '../../components/switch';

class SwitchTest extends React.Component {
  state = {
    switch: [true, false, false]
  };

  handleChange = (index) => {
    const state = this.state.switch;
    state[index] = !state[index];
    this.setState({switch: state});
  };

  render () {
    return (
      <section>
        <h5>Switches</h5>
        <p style={{marginBottom: '10px'}}>This is more beautiful than the old fashion checkboxes...</p>
        <Switch
          checked={this.state.switch[0]}
          label="Push notifications"
          onChange={this.handleChange.bind(this, 0)}
        />
        <Switch
          checked={this.state.switch[1]}
          label="Mail notifications"
          onChange={this.handleChange.bind(this, 1)}
        />
        <Switch
          checked={this.state.switch[2]}
          disabled
          label="Nothing, thanks"
          onChange={this.handleChange.bind(this, 2)}
        />
      </section>
    );
  }
}

export default SwitchTest;
