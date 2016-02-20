# Dynamic Autocomplete

An input field with a set of dynamic source values. 
When the user starts typing it displays a list of results from a service.
The source will have to be formatted correctly before it is passed to the field.

<!-- example -->
```jsx
import DynamicAutocomplete from 'react-toolbox/lib/dynamic_autocomplete';

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
	  <DynamicAutocomplete
		label="Search"
		name="search"
		onSelectOption={this.handleSelectOption}
		getSource={this.getSource}
	  />
    );
  }
}
```

## Properties

| Name              | Type          | Default         | Description |
|:-----|:-----|:-----|:-----|
| `className`     | `String`        |  `''`           | Set the class to give custom styles to the dropdown.
| `disabled`      | `Boolean`       | `false`         | Set the component as disabled.
| `error`         | `String`        |                 | Give an error string to display under the field.|
| `label`         | `String`        |                 | The text string to use for the floating label element.
| `getSource`     | `Function`      |                 | Callback function that should return a promise and resolve with a Map. Map must be in the form: `{ "0" => { name: "", key: "" }` name and keys are required and item is optional. Item allows all other attributes to be group.
| `onSelectOption`      | `Function`      |                 | Callback function that is fired when the an item is clicked in the dropdown. This will return the object from the map e.g. `{ name: "", key: "" };`
| `clearButton`   | `Boolean`      |                 | Display a clear button on the field.
