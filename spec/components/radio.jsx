import React from 'react';
import { RadioGroup, RadioButton } from '../../components/radio';

class RadioGroupTest extends React.Component {
  state = {
    value: 'vvendetta'
  };

  handleChange = (value) => {
    console.log('Changed!', { comic: value});
    this.setState({value});
  };

  handleFocus = () => {
    console.log('Focused V for a Vendetta');
  };

  handleBlur = () => {
    console.log('Blurred Watchmen');
  };

  render () {
    return (
      <section>
        <h5>Radio Button</h5>
        <p style={{marginBottom: '10px'}}>Lorem ipsum...</p>

        <RadioGroup name='comic' value={this.state.value} onChange={this.handleChange}>
          <RadioButton label='The Walking Dead' value='thewalkingdead'/>
          <RadioButton label='From Hell' value='fromhell' disabled/>
          <RadioButton label='V for a Vendetta' value='vvendetta' onFocus={this.handleFocus}/>
          <RadioButton label='Watchmen' value='watchmen' onBlur={this.handleBlur}/>
        </RadioGroup>
      </section>
    );
  }
}

export default RadioGroupTest;
