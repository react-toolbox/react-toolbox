# Switch

On/off switches toggle the state of a single settings option. The option that the switch controls, as well as the state it’s in, should be made clear from the corresponding inline label. Switches take on the same visual properties of the radio button.

<!-- example -->
```jsx
import Switch from 'react-toolbox/lib/switch';

class SwitchTest extends React.Component {
  state = {
    switch: [true, false, false]
  };

  handleChange = (index) => {
    const state = this.state.switch;
    state[index] = !state[index];
    this.setState({switch: state});
  };

  render () {
    return (
      <section>
        <Switch
          checked={this.state.switch[0]}
          label="Push notifications"
          onChange={this.handleChange.bind(this, 0)}
        />
        <Switch
          checked={this.state.switch[1]}
          label="Mail notifications"
          onChange={this.handleChange.bind(this, 1)}
        />
        <Switch
          checked={this.state.switch[2]}
          disabled
          label="Nothing, thanks"
          onChange={this.handleChange.bind(this, 2)}
        />
      </section>
    );
  }
}
```

## Properties

| Name              | Type          | Default         | Description|
|:-----|:-----|:-----|:-----|
| `checked`      | `Boolean`   | `false` | If true, the switch will be enabled.|
| `className`    | `String`   | `''`  | Sets a class to give custom styles to the switch.|
| `disabled`     | `Boolean`  | `false`  | If true, component will be disabled.|
| `label`        | `String`   |       | The text string to use for the floating label element.|
| `name`         | `String`   |        | The text string used as name of the input.|
| `onBlur`       | `Function` |        | Callback function that is fired when when the switch is blurred.|
| `onChange`     | `Function` |        | Callback function that is fired when the components's value changes.|
| `onFocus`      | `Function`  |        | Callback function fire when the switch is focused.|
