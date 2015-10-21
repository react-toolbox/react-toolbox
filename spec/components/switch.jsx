import React from 'react';
import Switch from '../../components/switch';

class SwitchTest extends React.Component {
  handleChange = (event, instance) => {
    console.log('[Switch] Changed', instance.getValue());
  };

  render () {
    return (
      <section>
        <h5>Switches</h5>
        <p style={{marginBottom: '10px'}}>This is more beautiful than the old fashion checkboxes...</p>
        <Switch label="Push notifications" />
        <Switch checked label="Mail notifications" onChange={this.handleChange} />
        <Switch disabled label="Nothing, thanks"/>
      </section>
    );
  }
}

export default SwitchTest;
