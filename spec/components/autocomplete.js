import React from 'react';
import Autocomplete from '../../components/autocomplete';

class AutocompleteTest extends React.Component {
  state = {
    simple: 'Spain',
    simpleShowAll: 'England',
    multipleArray: ['ES-es', 'TH-th'],
    multipleObject: { 'ES-es': 'Spain', 'TH-th': 'Thailand' },
    countriesArray: ['Spain', 'England', 'USA', 'Thailand', 'Tongo', 'Slovenia'],
    countriesObject: {
      'EN-gb': 'England',
      'EN-en': 'United States of America',
      'EN-nz': 'New Zealand',
    },
    simpleMonth: 0,
    monthsObject: {
      0: 'January',
      1: 'February',
      2: 'March',
      3: 'April',
      4: 'May',
      5: 'June',
      6: 'July',
      7: 'August',
      8: 'September',
      9: 'October',
      10: 'November',
      11: 'December',
    }
  };

  handleFocus = (event) => {
    console.log('This is focused');
    console.log(event);
  };

  handleMultipleArrayChange = (value) => {
    this.setState({
      multipleArray: value,
      countriesObject: {
        ...this.state.countriesObject,
        ...(value[0] && !this.state.countriesObject[value[0]]) ? { [value[0]]: value[0] } : {},
      },
    });
  };

  handleMultipleObjectChange = (value) => {
    this.setState({
      multipleObject: value,
    });
  };

  handleSimpleChange = (value) => {
    this.setState({ simple: value });
  };

  handleSimpleShowAllChange = (value) => {
    this.setState({ simpleShowAll: value });
  };

  handleSimpleMonthChange = (value) => {
    this.setState({ simpleMonth: parseInt(value, 10) });
  };

  render() {
    return (
      <section>
        <h5>Autocomplete</h5>
        <p>You can have a multiple or simple autocomplete.</p>

        <Autocomplete
          allowCreate
          keepFocusOnChange
          label="Pick multiple elements..."
          onFocus={this.handleFocus}
          onChange={this.handleMultipleArrayChange}
          source={this.state.countriesObject}
          suggestionMatch="anywhere"
          value={this.state.multipleArray}
        />

        <Autocomplete
          allowCreate
          label="Pick multiple elements with object value..."
          onChange={this.handleMultipleObjectChange}
          showSelectedWhenNotInSource
          source={this.state.countriesObject}
          suggestionMatch="anywhere"
          value={this.state.multipleObject}
        />

        <Autocomplete
          hint="Elements up to you..."
          label="Choose a country"
          multiple={false}
          onChange={this.handleSimpleChange}
          source={this.state.countriesArray}
          value={this.state.simple}
        />

        <Autocomplete
          hint="Elements up to you..."
          label="Choose a country (showing all suggestions)"
          multiple={false}
          onChange={this.handleSimpleShowAllChange}
          showSuggestionsWhenValueIsSet
          source={this.state.countriesArray}
          value={this.state.simpleShowAll}
        />

        <Autocomplete
          hint="Months (Falsy object key example)"
          label="Months (Falsy object key example)"
          multiple={false}
          onChange={this.handleSimpleMonthChange}
          showSuggestionsWhenValueIsSet
          source={this.state.monthsObject}
          value={this.state.simpleMonth}
        />
      </section>
    );
  }
}

export default AutocompleteTest;
