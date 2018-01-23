# Checkbox

[Checkboxes](https://material.google.com/components/selection-controls.html#selection-controls-checkbox) allow the user to select multiple options from a set. If you have multiple options appearing in a list, you can preserve space by using checkboxes instead of on/off switches. If you have a single option, avoid using a checkbox and use an on/off switch instead.

<!-- example -->
```jsx
import Checkbox from 'react-toolbox/lib/checkbox';

class TestCheckbox extends React.Component {
  state = { check1: true, check2: false };

  handleChange = (field, value) => {
    this.setState({...this.state, [field]: value});
  };

  render () {
    return (
      <div>
        <Checkbox
          checked={this.state.check1}
          label="Checked option"
          onChange={this.handleChange.bind(this, 'check1')}
        />
        <Checkbox
          checked={this.state.check2}
          label="Unchecked option"
          onChange={this.handleChange.bind(this, 'check2')}
        />
        <Checkbox
          checked
          disabled
          label="Disabled checkbox"
        />
      </div>
    );
  }
}
```

If you want to provide a theme via context, the component key is `RTCheckbox`.

## Properties

| Name              | Type          | Default         | Description|
|:-----|:-----|:-----|:-----|
| `checked`       | `Boolean`       | `false`         | Value for the checkbox, can be `true` or `false`. |
| `children`      | `String`, `Element` or `Array` |  | Children to pass through the component. |
| `className`     | `String`        | `''`            | Sets a class to give customized styles to the checkbox field.|
| `disabled`      | `Boolean`       | `false`         | If true, the checkbox shown as disabled and cannot be modified.|
| `label`         | `String` or `node`        |                 | Text label to attach next to the checkbox element.|
| `name`          | `String`        | `false`         | The name of the field to set in the input checkbox.|
| `onBlur`        | `Function`      |                 | Callback called when the checkbox is blurred.|
| `onChange`      | `Function`      |                 | Callback called when the checkbox value is changed.|
| `onFocus`       | `Function`      |                 | Callback called when the checkbox is focused |

## Theme

| Name     | Description|
|:---------|:-----------|
| `check`  | Used as root in the check element.|
| `checked`  | Used for the check element when it's checked.|
| `disabled`   | Used when the component is disabled.|
| `field`   | Used as the root class of the component.|
| `input`   | Used for the input element.|
| `ripple`   | Used for the ripple component.|
| `text`   | Used for the text label.|
