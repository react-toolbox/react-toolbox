# Dropdown

The Dropdown selects an option between multiple selections. The element displays the current state and a down arrow. When it is clicked, it displays the list of available options.

<!-- example -->
```jsx
import Dropdown from 'react-toolbox/lib/dropdown';

const countries = [
  { value: 'EN-gb', label: 'England' },
  { value: 'ES-es', label: 'Spain'},
  { value: 'TH-th', label: 'Thailand' },
  { value: 'EN-en', label: 'USA'}
];

class DropdownTest extends React.Component {
  state = { value: 'ES-es' };

  handleChange = (value) => {
    this.setState({value: value});
  };

  render () {
    return (
      <Dropdown
        auto
        onChange={this.handleChange}
        source={countries}
        value={this.state.value}
      />
    );
  }
}
```

If you want to provide a theme via context, the component key is `RTDropdown`.

## Properties

| Name         | Type       | Default | Description |
|:-------------|:-----------|:--------|:------------|
| `allowBlank` | `Boolean`  | `true`  | If false the dropdown will preselect the first item if the supplied value matches none of the options' values.|
| `auto`       | `Boolean`  | `true`  | If true, the dropdown will open up or down depending on the position in the screen.|
| `className`  | `String`   | `''`    | Set the class to give custom styles to the dropdown.|
| `disabled`   | `Boolean`  | `false` | Set the component as disabled.|
| `error`      | `String`   |         | Give an error string to display under the field.|
| `label`      | `String`   |         | The text string to use for the floating label element.|
| `onBlur`     | `Function` |         | Callback function that is fired when the component is blurred.|
| `onChange`   | `Function` |         | Callback function that is fired when the component's value changes.|
| `onFocus`    | `Function` |         | Callback function that is fired when the component is focused.|
| `source`     | `Array`    |         | Array of data objects with the data to represent in the dropdown.|
| `template`   | `Function` |         | Callback function that returns a JSX template to represent the element.|
| `value`      | `String`   |         | Default value using JSON data.|
| `required`   | `Boolean`  | `false` | If true, the dropdown has a required attribute.|

## Theming

This component uses an `Input` under the covers. The theme object is passed down namespaced under `input` keyword. This means you can use the same theme classNames from `Input` component but namespaced with `input`. For example, to style the label you have to use `inputLabel` className.

| Name            | Description|
|:----------------|:-----------|
| `active`        | Added to the root element when the dropdown is active.|
| `disabled`      | Added to the root element when it's disabled.|
| `dropdown`      | Root element class.|
| `error`         | Used for the error element.|
| `errored`       | Added to the inner wrapper if it's errored.|
| `field`         | Used for the inner wrapper of the component.|
| `label`         | Used for the the label element.|
| `selected`      | Used to highlight the selected value.|
| `templateValue` | Used as a wrapper for the given template value.|
| `up`            | Added to the root element when it's opening up.|
| `value`         | Used for each value in the dropdown component.|
| `values`        | Used for the list of values.|
