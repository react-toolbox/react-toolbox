import React from 'react';
import RadioGroup from '../../components/radio_group';
import RadioButton from '../../components/radio_button';

export default class RadioGroupTest extends React.Component {
  handleChange (event, instance) {
    console.log('Changed!', { comic: instance.getValue()});
  }

  handleFocus () {
    console.log('Focused V for a Vendetta');
  }

  handleBlur () {
    console.log('Blurred Watchmen');
  }

  render () {
    return (
      <section>
        <h5>Radio Button</h5>
        <p style={{marginBottom: '10px'}}>Lorem ipsum...</p>

        <RadioGroup ref='group' name='comic' value='vvendetta' onChange={this.handleChange}>
          <RadioButton label='The Walking Dead' value='thewalkingdead'/>
          <RadioButton label='From Hell' value='fromhell' disabled/>
          <RadioButton label='V for a Vendetta' value='vvendetta' onFocus={this.handleFocus}/>
          <RadioButton label='Watchmen' value='watchmen' onBlur={this.handleBlur}/>
        </RadioGroup>
      </section>
    );
  }
};
