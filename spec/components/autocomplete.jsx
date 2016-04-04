import React from 'react';
import Autocomplete from '../../components/autocomplete';

const countriesArray = ['Spain', 'England', 'USA', 'Thailand', 'Tongo', 'Slovenia'];
const countriesObject = {'ES-es': 'Spain', 'TH-th': 'Thailand', 'EN-gb': 'England', 'EN-en': 'USA'};

class AutocompleteTest extends React.Component {
  state = {
    simple: 'Spain',
    multiple: ['ES-es', 'TH-th']
  };

  handleMultipleChange = (value) => {
    this.setState({multiple: value});
  };

  handleSimpleChange = (value) => {
    this.setState({simple: value});
  };

  render () {
    return (
      <section>
        <h5>Autocomplete</h5>
        <p>You can have a multiple or simple autocomplete.</p>

        <Autocomplete
          onChange={this.handleMultipleChange}
          label="Pick multiple elements..."
          source={countriesObject}
          value={this.state.multiple}
        />

        <Autocomplete
          label="Choose a country"
          hint="Elements up to you..."
          multiple={false}
          onChange={this.handleSimpleChange}
          source={countriesArray}
          value={this.state.simple}
        />
      </section>
    );
  }
}

export default AutocompleteTest;
