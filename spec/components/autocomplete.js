import React from 'react';
import Autocomplete from '../../components/autocomplete';

class AutocompleteTest extends React.Component {
  state = {
    simple: 'Spain',
    simpleShowAll: 'England',
    multiple: ['ES-es', 'TH-th'],
    countriesArray: ['Spain', 'England', 'USA', 'Thailand', 'Tongo', 'Slovenia'],
    countriesObject: {'ES-es': 'Spain', 'TH-th': 'Thailand', 'EN-gb': 'England',
      'EN-en': 'United States of America', 'EN-nz': 'New Zealand'}
  };

  handleMultipleChange = (value) => {
    this.setState({
      multiple: value,
      countriesObject: {
        ...this.state.countriesObject,
        ...!this.state.countriesObject[value[0]] ? {[value[0]]: value[0]} : {}
      }
    });
  };

  handleSimpleChange = (value) => {
    this.setState({simple: value});
  };

  handleSimpleShowAllChange = (value) => {
    this.setState({simpleShowAll: value});
  };

  render () {
    return (
      <section>
        <h5>Autocomplete</h5>
        <p>You can have a multiple or simple autocomplete.</p>

        <Autocomplete
          onChange={this.handleMultipleChange}
          label="Pick multiple elements..."
          source={this.state.countriesObject}
          value={this.state.multiple}
          suggestionMatch="anywhere"
          create={true}
        />

        <Autocomplete
          label="Choose a country"
          hint="Elements up to you..."
          multiple={false}
          onChange={this.handleSimpleChange}
          source={this.state.countriesArray}
          value={this.state.simple}
        />

        <Autocomplete
          label="Choose a country (showing all suggestions)"
          hint="Elements up to you..."
          multiple={false}
          onChange={this.handleSimpleShowAllChange}
          source={this.state.countriesArray}
          value={this.state.simpleShowAll}
          showSuggestionsWhenValueIsSet
        />
      </section>
    );
  }
}

export default AutocompleteTest;
