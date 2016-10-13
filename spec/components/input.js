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
    multilineRows: 'A\n\B\nC\nD\nE\nF'
  };

  handleChange = (name, value) => {
    this.setState({...this.state, [name]: value});
  };

  render () {
    return (
      <section>
        <h5>Inputs</h5>
        <p>lorem ipsum...</p>
        <Input
          type='text'
          value={this.state.normal}
          label='First Name' onChange={this.handleChange.bind(this, 'normal')}
          maxLength={12}
        />
        <Input type='email' value={this.state.fixedLabel} label='Label fixed' floating={false} onChange={this.handleChange.bind(this, 'fixedLabel')} />
        <Input type='text' value='Read only' readOnly label='Phone Number' />
        <Input type='email' value={this.state.multilineHint} label='Description' hint='Enter Description' multiline onChange={this.handleChange.bind(this, 'multilineHint')} />
        <Input type='text' value={this.state.multilineRows} label='Row Limited Description' hint='Enter Description' multiline rows={4} onChange={this.handleChange.bind(this, 'multilineRows')} />
        <Input type='text' label='Disabled field' disabled />
        <Input type='tel' value={this.state.withIcon} required label='With icon' onChange={this.handleChange.bind(this, 'withIcon')} icon='phone' />
        <Input type='tel' value={this.state.withCustomIcon} label='With custom icon' onChange={this.handleChange.bind(this, 'withCustomIcon')} icon='favorite' />
        <Input type='text' value={this.state.withHintCustomIcon} label='With Hint Text Icon' hint='Hint Text' onChange={this.handleChange.bind(this, 'withHintCustomIcon')} icon='share' />
      </section>
    );
  }
}

export default InputTest;
