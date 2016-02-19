import React from 'react';
import DynamicAutocomplete from '../../components/dynamic_autocomplete';

class DynamicAutocompleteTest extends React.Component {

  handleSelectOption = (value) => {
    console.log(value);
  };
  
  getSource = (value) => {
	return new Promise((resolve, reject) => {
		let xmlhttp=new XMLHttpRequest();
		xmlhttp.open("GET", "http://www.omdbapi.com/?s="+value, true);
		xmlhttp.send();
		
		xmlhttp.onreadystatechange = function() {
		  if (xmlhttp.status == 200 && xmlhttp.responseText !== "") {
			let response = JSON.parse(xmlhttp.responseText);
			if(response.Search){
				let source = response.Search.map((item) => {
					return{
						name: item.Title,
						key: item.imdbID,
						item: item
					};
				});
				
				resolve(new Map(Object.keys(source).map((key) => [key, source[key]])));
			}
		  }
		}
		
	})
  };

  render () {
    return (
	 <section>
        <h5>Dynamic Autocomplete</h5>

		  <DynamicAutocomplete
			label="Search"
			name="search"
			onSelectOption={this.handleSelectOption}
			getSource={this.getSource}
		  />
	</section>
    );
  }
}


export default DynamicAutocompleteTest;
