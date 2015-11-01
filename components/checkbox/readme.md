# Checkbox

[Checkboxes](https://www.google.com/design/spec/components/selection-controls.html#selection-controls-checkbox) allow the user to select multiple options from a set. If you have multiple options appearing in a list, you can preserve space by using checkboxes instead of on/off switches. If you have a single option, avoid using a checkbox and use an on/off switch instead.

<!-- example -->
```jsx
import Checkbox from 'react-toolbox/checkbox';

const TestCheckbox = () => (
  <div>
    <Checkbox label="Checked option" checked />
    <Checkbox label="Unchecked option" />
    <Checkbox label="Disabled checkbox" checked disabled />
  </div>
);
```

## Properties

| Name              | Type          | Default         | Description|
|:-----|:-----|:-----|:-----|
| `checked`       | `Bool`        |   `false`        | If true, the checkbox will be checked.|
| `className`     | `String`        |     `''`            | Sets a class to give customized styles to the checkbox field.|
| `disabled`         | `Bool`        |     `false`          | If true, the checkbox shown as disabled and is not possible to modify it.|
| `label`         | `String`        |                 | Text label to attach next to the checkbox element.|
| `name`       | `String`       | `false`                | The name of the field to set in the input checkbox.|
| `onBlur`       | `Function`       |                | Callback called when the checkbox is blurred.|
| `onChange`       | `Function`       |                | Callback called when the checkbox value is changed.|
| `onFocus`       | `Function`       |                | Callback called when the checkbox is focused |

## Methods

This component has state to control its value and how is it rendered. It exposes the following instance methods:

- `getValue` is used to retrieve the current value.
- `setValue` to force a new value.
- `blur` to blur the input.
- `focus` to focus the input.
