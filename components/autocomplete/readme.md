# Autocomplete

An input field with a set of predeterminated labeled values. When it's focused it shows a list of hints that are filtered by label as the user types. They can be simple or multiple depending on the amount of values that can be selected. The opening direction is determinated at opening time depending on the current position.

<!-- example -->
```jsx
import Autocomplete from 'react-toolbox/autocomplete';

const countries = {
  'EN-gb': 'England',
  'ES-es': 'Spain',
  'TH-th': 'Thailand',
  'EN-en': 'USA'
};

const selected = ['ES-es', 'EN-gb'];

const AutocompleteTest = () => (
  <Autocomplete
    label="Choose a country"
    placeholder="Elements is up to you..."
    dataSource={countries}
    value={selected}
  />
)
```

## Properties

| Name              | Type          | Default         | Description|
|:-                 |:-:            | :-              |:-|
| className     | `String`      | `''`            | Sets a class to style of the Component.|
| dataSource    | `Object` or `Array`   |           | Object of key/values or array representing all items suggested.|
| disabled      | `Bool`        |  `false`         | If true, component will be disabled.|
| error         | `String`      |         | Sets the error string for the internal input element.|
| label         | `String`      |         | The text string to use for the floating label element.|
| multiple      | `Bool`        | `true`          | If true, component can hold multiple values.|
| onChange      | `Function`    |                 | Callback function that is fired when the components's value changes.|
| required      | `Boolean`     |                 | If true, component input is set as required.|
| value         | `String` or `Array`    |        | Default value to initialize the component.|

## Methods

This component has state to control how is it rendered and the values currently selected. It exposes the following instance methods:

- `getValue` is used to retrieve the current value.
- `setValue` to force a new value.

## Structure

The component has a complex structure that can be customized by giving a custom `className` and targeting `data-role` attributes. The structure is similar to:

```html
<div data-react-toolbox="autocomplete">
  <label data-role="label"></label>
  <ul data-role="selections">
    <li data=role="selection"></li>
  </ul>
  <input data-role="input" />
  <ul data-role="suggestions">
    <li data=role="suggestion"></li>
  </ul>
</div>
```
