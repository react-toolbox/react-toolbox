# Switch

On/off switches toggle the state of a single settings option. The option that the switch controls, as well as the state it’s in, should be made clear from the corresponding inline label. Switches take on the same visual properties of the radio button.

<!-- example -->
```jsx
import Switch from 'react-toolbox/lib/switch';

class SwitchTest extends React.Component {
  state = {
    switch_1: true,
    switch_2: false,
    switch_3: true
  };

  handleChange = (field, value) => {
    this.setState({...this.state, [field]: value});
  };

  render () {
    return (
      <section>
        <Switch
          checked={this.state.switch_1}
          label="Push notifications"
          onChange={this.handleChange.bind(this, 'switch_1')}
        />
        <Switch
          checked={this.state.switch_2}
          label="Mail notifications"
          onChange={this.handleChange.bind(this, 'switch_2')}
        />
        <Switch
          checked={this.state.switch_3}
          disabled
          label="Nothing, thanks"
          onChange={this.handleChange.bind(this, 'switch_3')}
        />
      </section>
    );
  }
}
```

This component can be styled by context providing a theme with the key `RTSwitch` through the theme provider.

## Properties

| Name              | Type          | Default       | Description|
|:-----|:-----|:-----|:-----|
| `checked`      | `Boolean`        | `false`       | If true, the switch will be enabled.|
| `className`    | `String`         | `''`          | Sets a class to give custom styles to the switch.|
| `disabled`     | `Boolean`        | `false`       | If true, component will be disabled.|
| `label`        | `String`         |               | The text string to use for the floating label element.|
| `name`         | `String`         |               | The text string used as name of the input.|
| `onBlur`       | `Function`       |               | Callback function that is fired when when the switch is blurred.|
| `onChange`     | `Function`       |               | Callback function that is fired when the component's value changes.|
| `onFocus`      | `Function`       |               | Callback function that is fired when the switch is focused.|
| `ripple`       | `Boolean`        |               | If true, the ripple effect will be disabled.|

## Theme

| Name     | Description|
|:---------|:-----------|
| `disabled` | Used for the root element if the component is disabled.|
| `field` | Used for the root element if the component is not disabled.|
| `input` | Used for the input element.|
| `off` | Used for a wrapper around the thumb if checked is `false`.|
| `on` | Used for a wrapper around the thumb if checked is `true`.|
| `ripple` | Used for the ripple inside the switch.|
| `text` | Used for the text label element.|
| `thumb` | Used for the thumb element.|
