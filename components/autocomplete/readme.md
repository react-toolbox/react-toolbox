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

| Name                | Type      | Default         | Description|
|:-----|:-----|:-----|:-----|
| `allowCreate`                   | `Bool`                        | `false` | Determines if user can create a new option with the current typed value |
| `className`                     | `String`                      | `''`    | Sets a class to style of the Component.|
| `direction`                     | `String`                      | `auto`  | Determines the opening direction. It can be `auto`, `up` or `down`. |
| `disabled`                      | `Bool`                        | `false` | If true, component will be disabled. |
| `error`                         | `String` or `Node`            |         | Sets the error string for the internal input element. |
| `keepFocusOnChange`             | `Bool`                        | `false` | Whether component should keep focus after value change. |
| `label`                         | `String` or `Node`            |         | The text string to use for the floating label element. |
| `multiple`                      | `Bool`                        | `true`  | If true, component can hold multiple values. |
| `onBlur`                        | `Function`                    |         | Callback function that is fired when component is blurred. |
| `onChange`                      | `Function`                    |         | Callback function that is fired when the components's value changes. |
| `onFocus`                       | `Function`                    |         | Callback function that is fired when component is focused. |
| `onKeyDown`                     | `Function`                    |         | Callback function that is fired when a key is pressed down. |
| `onKeyUp`                       | `Function`                    |         | Callback function that is fired when a key is lifted up. |
| `onQueryChange`                 | `Function`                    |         | Callback function that is fired when the components's query input value changes. |
| `query`                         | `String` |         | This property has to be used in case the `source` is not static and will be changing during search for `multiple={false}` autocomplete, content of the `query` has to be managed by the `onQueryChange` callback. |
| `source`                        | `Object` or `Array`           |         | Object of key/values or array representing all items suggested. |
| `selectedPosition`              | `String`                      | `above` | Determines if the selected list is shown above or below input. It can be `above`, `below` or `none`. |
| `showSelectedWhenNotInSource`   | `Bool`                        | `false` | Determines if the selected list is shown if the `value` keys don't exist in the source. Only works if passing the `value` prop as an Object. |
| `showSuggestionsWhenValueIsSet` | `Bool`                        | `false` | If true, the list of suggestions will not be filtered when a value is selected, until the query is modified. |
| `suggestionMatch`               | `String`                      | `start` | Determines how suggestions are supplied. It can be `start` (query matches the start of a suggestion), `anywhere` (query matches anywhere inside the suggestion), `word` (query matches the start of a word in the suggestion) or `disabled` (disable filtering of provided source, all items are shown). |
| `value`                         | `String`, `Array` or `Object` |         | Value or array of values currently selected component. |

Additional properties will be passed to the Input Component so you can use `hint`, `name` ... etc.

## Theme

This component uses an `Input` under the covers. The theme object is passed down namespaced under `input` keyword. This means you can use the same theme classNames from `Input` component but namespaced with `input`. For example, to style the label you have to use `inputLabel` className.

| Name     | Description|
|:---------|:-----------|
| `active` | Used for a suggestion when it's active.|
| `autocomplete`  | Used for the root element.|
| `focus`   | Used when the input is focused.|
| `input`   | Used to style the `Input` component.|
| `suggestion`   | Used to style each suggestion.|
| `suggestions`   | Used to style the suggestions container.|
| `up`   | Used for the suggestions when it's opening to the top.|
| `value`   | Classname used for a single value.|
| `values`   | Classname used for the values container.|
