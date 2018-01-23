# Radio buttons

[Radio buttons](https://material.google.com/components/selection-controls.html#selection-controls-radio-button) allow the user to select one option from a set. Use radio buttons for exclusive selection if you think that the user needs to see all available options side-by-side. Otherwise, consider a dropdown, which uses less space than displaying all options. They should always be used along with `RadioGroup`.

You can provide the theme for this component using the key `ToolboxButton`

<!-- example -->
```jsx
import { RadioGroup, RadioButton } from 'react-toolbox/lib/radio';

class RadioTest extends React.Component {
  state = {
    value: 'vvendetta'
  };

  handleChange = (value) => {
    this.setState({value});
  };

  render () {
    return (
      <RadioGroup name='comic' value={this.state.value} onChange={this.handleChange}>
        <RadioButton label='The Walking Dead' value='thewalkingdead'/>
        <RadioButton label='From Hell' value='fromhell' disabled/>
        <RadioButton label='V for a Vendetta' value='vvendetta'/>
        <RadioButton label='Watchmen' value='watchmen'/>
      </RadioGroup>
    );
  }
}
```

## Radio Group

A radio selector is mean to get a value from a set of choices, that's why a radio group is needed. It can take some properties and actions that will be transferred to the children, but they also can behave independently.

### Properties

| Name          | Type          | Default         | Description|
|:-----|:-----|:-----|:-----|
| `className`   | `String`      | `''`        | Set a class to give custom styles to the group.|
| `disabled`    | `Boolean`     | `false`     | If true, the group will be displayed as disabled.|
| `name`        | `String`      |             | Name for the input element group. |
| `onChange`    | `Function`    |             | Callback function that will be invoked when the value changes. |
| `value`       | `Any`         |             | Default value selected in the radio group. |


## Radio Button

The inner component to compose radio selectors. They will be rendered as radio input elements of HTML transferring the given properties that concerns to them.

### Properties

| Name          | Type          | Default         | Description|
|:-----|:-----|:-----|:-----|
| `checked`     | `Boolean`     | `false`     | If true, the input element will be selected by default. Transferred from the parent. |
| `className`   | `String`      | `''`        | Set a class to give custom styles to the radio button.|
| `disabled`    | `Boolean`     | `false`     | If true, the item will be displayed as disabled.|
| `label`       | `String` or `node`  | `''`        | Label for the radio button.|
| `name`        | `String`      |             | Name for the input element. |
| `onBlur`      | `Function`    |             | Callback function that will be invoked when the input is blurred. |
| `onChange`    | `Function`    |             | Callback function that will be invoked when the value changes. |
| `onFocus`     | `Function`    |             | Callback function that will be invoked when the input is focused. |
| `value`       | `Any`         |             | Value for the radio button. |

### Theming

| Name     | Description|
|:---------|:-----------|
| `disabled` | Added to the root of the Radio in case it's disabled.|
| `field` | Used as the root class of the component.|
| `input` | Used for the input element.|
| `radio` | Used to for the radio element.|
| `radioChecked` | Used for the radio element when it's checked.|
| `ripple` | To provide styles for the ripple.|
| `text` | Used to style the text label element.|
