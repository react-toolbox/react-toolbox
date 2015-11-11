# Dropdown

The Dropdown selects an option between multiple selections. The element displays the current state and a down arrow. When it is clicked, it displays the list of available options.

<!-- example -->
```jsx
import Dropdown from 'react-toolbox/lib/dropdown';

const countries: [
  { value: 'EN-gb', label: 'England' },
  { value: 'ES-es', label: 'Spain'},
  { value: 'TH-th', label: 'Thailand' },
  { value: 'EN-en', label: 'USA'}
];

const DropdownTest = () => (
  <Dropdown 
    auto
    dataSource={countries}
    value='TH-th'
  />
);
```

## Properties

| Name              | Type          | Default         | Description |
|:-----|:-----|:-----|:-----|
| `auto`        | `Boolean`       |  `true`        | If true, the dropdown will open up or down depending on the position in the screen .|
| `className`     | `String`        |  `''`               | Set the class to give custom styles to the dropdown.
| `dataSource`    | `Array`         |                 | Array of data objects with the data to represent in the dropdown.
| `disabled`      | `Boolean`       | `false`         | Set the component as disabled.
| `label`         | `String`        |                 | The text string to use for the floating label element.
| `onChange`      | `Function`      |                 | Callback function that is fired when the component's value changes.
| `template`      | `Function`      |                 | Callback function that returns a JSX template to represent the element.
| `value`         | `String`        |                 | Default value using JSON data.

## Methods

This component has state to control its value and how is it rendered. It exposes the following instance methods:

- `getValue` is used to retrieve the current value.
- `setValue` to force a new value.
