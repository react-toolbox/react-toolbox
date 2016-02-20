import React from 'react';
import DynamicAutocomplete from '../../components/dynamic_autocomplete';

class DynamicAutocompleteTest extends React.Component {

  handleSelectOption = (value) => {
    console.log(value);
  };

  getSource = (value) => {
    return new Promise((resolve) => {
      const xmlhttp = new XMLHttpRequest();
      xmlhttp.open('GET', 'http://www.omdbapi.com/?s=' + value, true);
      xmlhttp.send();

      xmlhttp.onreadystatechange = function () {
        if (xmlhttp.status === 200 && xmlhttp.responseText !== '') {
          const response = JSON.parse(xmlhttp.responseText);
          if (response.Search) {
            const source = response.Search.map((item) => {
              return {
                name: item.Title,
                key: item.imdbID,
                item
              };
            });
            resolve(new Map(Object.keys(source).map((key) => [key, source[key]])));
          }
        }
      };
    });
  };

  render() {
    return (
      <section>
        <h5>Dynamic Autocomplete</h5>
        <p>Search OMDb using their API</p>

        <DynamicAutocomplete
          label="Search"
          name="search"
          onSelectOption={this.handleSelectOption}
          getSource={this.getSource}
          clearButton/>
      </section>
    );
  }
}


export default DynamicAutocompleteTest;
