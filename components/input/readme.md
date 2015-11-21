# Input

Although we are calling then Inputs they actually correspond to Material Design [Text fields](https://www.google.com/design/spec/components/text-fields.html). It allows a user to input text and it's the base for other components like the autocomplete.

<!-- example -->
```jsx
import Input from 'react-toolbox/lib/input';

class InputTest extends React.Component {
  state = { name: '', phone: '', email: '' };

  handleChange = (name, event) => {
    const newState = {};
    newState[`${name}`] = event.target.value;
    this.setState(newState);
  };

  render () {
    return (
      <section>
        <Input type='text' label='Name' name='name' value={this.state.name} onChange={this.handleChange.bind(this, 'name')} />
        <Input type='text' label='Disabled field' disabled />
        <Input type='email' label='Email address' icon='email' />
        <Input type='tel' label='Phone' name='phone' icon='phone' value={this.state.withIcon} onChange={this.handleChange.bind(this, 'phone')} />
      </section>
    );
  }
}
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
| `maxLength`     | `number`       |             |Specifies the maximum number of characters allowed in the component.|
| `multiline`     | `Boolean`       | `false`        | If true, a textarea element will be rendered. The textarea also grows and shrinks according to the number of lines.|
| `onBlur`        | `Function`      |                 | Callback function that is fired when components is blured.|
| `onChange`      | `Function`      |                 | Callback function that is fired when the components's value changes.|
| `onFocus`       | `Function`      |                 | Callback function that is fired when components is focused.|
| `onKeyPress`    | `Function`      |                 | Callback function that is fired when a key is pressed.|
| `required`      | `Boolean`       | `false`         | If true, the html input has a required value.|
| `tooptip`   | `String`  |  | The value will be shown as a tooltip when the button is hovered. |
| `tooltipDelay`     | `Number`  |  | Amount of time in milliseconds before the tooltip is visible.|
| `type`          | `String`        | `text`        | Type of the input element. It can be a valid HTML5 input type|
| `value`         | `String`        |              | Current value of the input element.|

## Methods

The input is stateless but it includes two methods to be able to communicate with the DOM input node:

- `blur` to blur the input field.
- `focus` to focus the input field.
