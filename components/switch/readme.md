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
