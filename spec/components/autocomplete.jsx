/* global React */

import Autocomplete from '../../components/autocomplete';

export default React.createClass({
  displayName: 'AutocompleteTest',

  getInitialState () {
    return {
      countries: ['Spain', 'England', 'USA', 'Thailand', 'Tongo', 'Slovenia'],
      countries_obj: {
        'ES-es': 'Spain',
        'TH-th': 'Thailand',
        'EN-gb': 'England',
        'EN-en': 'USA'
      }
    };
  },

  onAutocompleteValues () {
    console.log(this.refs.autocomplete_multiple.getValue());
    console.log(this.refs.autocomplete_simple.getValue());
  },

  render () {
    const countries_selected = ['USA', 'Tongo'];
    const countries_obj_selected = 'TH-th';

    return (
      <section>
        <h2>Autocomplete</h2>
        <p style={{marginBottom: '5px'}}>You can have a multiple or simple autocomplete.</p>

        <Autocomplete
          ref="autocomplete_multiple"
          label="Choose a country"
          onChange={this.onAutocompleteValues}
          placeholder="Elements is up to you..."
          dataSource={this.state.countries}
          value={countries_selected}/>

        <Autocomplete
          ref="autocomplete_simple"
          multiple={false}
          onChange={this.onAutocompleteValues}
          dataSource={this.state.countries_obj}
          value={countries_obj_selected}/>
      </section>
    );
  }
});
