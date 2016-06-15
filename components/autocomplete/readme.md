# Autocomplete

An input field with a set of predeterminated labeled values. When it's focused it shows a list of options that are filtered by label as the user types. They can be simple or multiple depending on the amount of values that can be selected. The opening direction is determined by its current position at opening time.

<!-- example -->
```jsx
import Autocomplete from 'react-toolbox/lib/autocomplete';

const source = {
  'ES-es': 'Spain',
  'TH-th': 'Thailand',
  'EN-gb': 'England',
  'EN-en': 'USA'
};

class AutocompleteTest extends React.Component {
  state = {
    countries: ['ES-es', 'TH-th']
  }

  handleChange = (value) => {
    this.setState({countries: value});
  };

  render () {
    return (
      <Autocomplete
        direction="down"
        selectedPosition="above"
        label="Choose countries"
        onChange={this.handleChange}
        source={source}
        value={this.state.countries}
      />
    );
  }
}
```

If you want to provide a theme via context, the component key is `RTAutocomplete`.

## Properties

| Name                | Type                   | Default         | Description|
|:-----|:-----|:-----|:-----|
| `className`         | `String`               | `''`            | Sets a class to style of the Component.|
| `direction`         | `String`               |  `auto`         | Determines the opening direction. It can be `auto`, `top` or `bottom`.|
| `disabled`          | `Bool`                 |  `false`        | If true, component will be disabled.|
| `error`             | `String`               |                 | Sets the error string for the internal input element.|
| `label`             | `String`               |                 | The text string to use for the floating label element.|
| `multiple`          | `Bool`                 | `true`          | If true, component can hold multiple values.|
| `onChange`          | `Function`             |                 | Callback function that is fired when the components's value changes.|
| `source`            | `Object` or `Array`    |                 | Object of key/values or array representing all items suggested. |
| `selectedPosition`  | `String`               |  `above`        | Determines if the selected list is shown above or below input. It can be `above` or `below`. |
| `showSuggestionsWhenValueIsSet` | `Bool`     | `false`         | If true, the list of suggestions will not be filtered when a value is selected, until the query is modified. |
| `suggestionMatch`   | `String`               | `start`         | Determines how suggestions are supplied. It can be `start` (query matches the start of a suggestion), `anywhere` (query matches anywhere inside the suggestion), or `word` (query matches the start of a word in the suggestion). |
| `value`             | `String` or `Array`    |                 | Value or array of values currently selected component.|

Additional properties will be passed to the Input Component so you can use `hint`, `name` ... etc.

## Theme

| Name     | Description|
|:---------|:-----------|
| `active` | Used for a suggestion when it's active.|
| `autocomplete`  | Used for the root element.|
| `focus`   | Used when the input is focused.|
| `input`   | Used to style the `Input` component.|
| `label`   | Used for the label.|
| `suggestion`   | Used to style each suggestion.|
| `suggestions`   | Used to style the suggestions container.|
| `up`   | Used for the suggestions when it's opening to the top.|
| `value`   | Classname used for a single value.|
| `values`   | Classname used for the values container.|
