# Switch

On/off switches toggle the state of a single settings option. The option that the switch controls, as well as the state it’s in, should be made clear from the corresponding inline label. Switches take on the same visual properties of the radio button.

<!-- example -->
```jsx
import Switch from 'react-toolbox/lib/switch';

const SwitchTest = () => (
  <fieldset>
    <Switch label="Push notifications" />
    <Switch checked label="Mail notifications" />
    <Switch disabled label="Nothing, thanks"/>
  </fieldset>
);
```

## Properties

| Name              | Type          | Default         | Description|
|:-----|:-----|:-----|:-----|
| `checked`      | `Boolean`   | `false` | If true, the switch will be enabled.|
| `className`    | `String`   | `''`  | Sets a class to give custom styles to the switch.|
| `disabled`     | `Boolean`  | `false`  | If true, component will be disabled.|
| `label`        | `String`   |       | The text string to use for the floating label element.|
| `name`         | `String`   |        | The text string used as name of the input.|
| `onChange`     | `Function` |        | Callback function that is fired when the components's value changes.|
