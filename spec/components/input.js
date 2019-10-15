import React from 'react';
import Input from '../../components/input';

class InputTest extends React.Component {
  state = {
    normal: 'Tony Stark',
    fixedLabel: '',
    withIcon: '',
    withCustomIcon: '',
    withHintCustomIcon: '',
    multilineHint: 'Long Description here',
    multilineRows: 'A\n\B\nC\nD\nE\nF',
  };

  handleChange = (value, ev) => {
    this.setState({[ev.target.name]: value });
  };

  render() {
    return (
      <section>
        <h5>Inputs</h5>
        <p>lorem ipsum...</p>
        <Input
          type="text"
          name="normal"
          value={this.state.normal}
          label="First Name" onChange={this.handleChange}
          maxLength={12}
        />
        <Input type="email" name="fixedLabel" value={this.state.fixedLabel} label="Label fixed" floating={false} onChange={this.handleChange} />
        <Input type="text" value="Read only" readOnly label="Phone Number" />
        <Input type="email" name="multilineHint" value={this.state.multilineHint} label="Description" hint="Enter Description" multiline onChange={this.handleChange} />
        <Input type="text" name="multilineRows" value={this.state.multilineRows} label="Row Limited Description" hint="Enter Description" multiline rows={4} onChange={this.handleChange} />
        <Input type="text" label="Disabled field" disabled />
        <Input type="tel" name="withIcon" value={this.state.withIcon} required label="With icon" onChange={this.handleChange} icon="phone" />
        <Input type="tel" name="withCustomIcon" value={this.state.withCustomIcon} label="With custom icon" onChange={this.handleChange} icon="favorite" />
        <Input type="text" name="withHintCustomIcon" value={this.state.withHintCustomIcon} label="With Hint Text Icon" hint="Hint Text" onChange={this.handleChange} icon="share" />
      </section>
    );
  }
}

export default InputTest;
