# Input

Although we are calling then Inputs they actually correspond to Material Design [Text fields](https://www.google.com/design/spec/components/text-fields.html). It allows a user to input text and it's the base for other components like the autocomplete.

<!-- example -->
```jsx
import Input from 'react-toolbox/lib/input';

const InputTest = () => (
  <div>
    <Input type='text' label='Firstname' />
    <Input type='email' label='Label fixed' floating={false} />
    <Input type='text' label='Disabled field' disabled />
    <Input type='tel' label='With icon' icon='phone' />
    <Input type='email' label='With icon' icon='email' />
  </div>
);
```

## Properties

| Name              | Type          | Default         | Description|
|:-----|:-----|:-----|:-----|
| `className`     | `String`        |`''`              | Sets a class name to give custom styles.|
| `disabled`      | `Boolean`       | `false`         | If true, component will be disabled.|
| `error`         | `String`        |                 | Give an error string to display under the field.|
| `icon`         | `String`        |                 | Name of an icon to use as a label for the input.|
| `floating`     | `Boolean`       | `true`         | Indicates if the label is floating in the input field or not.|
| `label`         | `String`        |             | The text string to use for the floating label element.|
| `multiline`     | `Boolean`       | `false`        | If true, a textarea element will be rendered. The textarea also grows and shrinks according to the number of lines.|
| `onBlur`        | `Function`      |                 | Callback function that is fired when components is blured.|
| `onChange`      | `Function`      |                 | Callback function that is fired when the components's value changes.|
| `onFocus`       | `Function`      |                 | Callback function that is fired when components is focused.|
| `onKeyPress`    | `Function`      |                 | Callback function that is fired when a key is pressed.|
| `required`      | `Boolean`       | `false`         | If true, the html input has a required value.|
| `type`          | `String`        | `text`        | Type of the input element. It can be a valid HTML5 input type|
| `value`         | `String`        |                 | Initial value of the input element.|

## Methods

The input component has a state to control its value. It exposes instance methods to retrieve and set the current value and to control the input state:

- `getValue` is used to retrieve the current value.
- `setValue` to force a new value.
- `blur` to blur the input field.
- `focus` to focus the input field.
