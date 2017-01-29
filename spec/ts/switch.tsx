import * as React from 'react';
import Switch from '../../components/switch';

class SwitchTest extends React.Component<any, any> {
  state = {
    switch_1: true,
    switch_2: false,
    switch_3: true,
  };

  handleChange = (field: any, value: any) => {
    this.setState({ ...this.state, [field]: value });
  };

  render() {
    return (
      <section>
        <h5>Switches</h5>
        <p style={{ marginBottom: '10px' }}>This is more beautiful than the old fashion checkboxes...</p>
        <Switch
          checked={this.state.switch_1}
          label="Push notifications"
          onChange={this.handleChange.bind(this, 'switch_1')}
        />
        <Switch
          checked={this.state.switch_2}
          label="Mail notifications"
          onChange={this.handleChange.bind(this, 'switch_2')}
        />
        <Switch
          checked={this.state.switch_3}
          disabled
          label="Nothing, thanks"
          onChange={this.handleChange.bind(this, 'switch_3')}
        />
      </section>
    );
  }
}

export default SwitchTest;
