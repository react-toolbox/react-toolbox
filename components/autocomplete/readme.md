# Autocomplete

An input field with a set of predeterminated labeled values. When it's focused it shows a list of hints that are filtered by label as the user types. They can be simple or multiple depending on the amount of values that can be selected. The opening direction is determined at opening time depending on the current position.

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
        label="Choose countries"
        onChange={this.handleChange}
        source={source}
        value={this.state.countries}
      />
    );
  }
}
```

## Properties

| Name              | Type          | Default         | Description|
|:-----|:-----|:-----|:-----|
| `className`     | `String`      | `''`            | Sets a class to style of the Component.|
| `direction`    | `String`       |  `auto`        | Determines the opening direction. It can be `auto`, `top` or `bottom`. |
| `disabled`      | `Bool`        |  `false`         | If true, component will be disabled.|
| `error`         | `String`      |         | Sets the error string for the internal input element.|
| `label`         | `String`      |         | The text string to use for the floating label element.|
| `multiple`      | `Bool`        | `true`          | If true, component can hold multiple values.|
| `onChange`      | `Function`    |                 | Callback function that is fired when the components's value changes.|
| `source`    | `Object` or `Array`   |           | Object of key/values or array representing all items suggested. |
| `value`         | `String` or `Array`    |        | Value or array of values currently selected component.|

Additional properties will be passed to the input element so you can use `name`, `type`... etc.
