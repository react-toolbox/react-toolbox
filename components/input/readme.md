# Input

Although we are calling them Inputs they actually correspond to Material Design [Text fields](https://www.google.com/design/spec/components/text-fields.html). It allows a user to input text and it's the base for other components like the autocomplete.

<!-- example -->
```jsx
import Input from 'react-toolbox/lib/input';

class InputTest extends React.Component {
  state = { name: '', phone: '', email: '', hint: '' };

  handleChange = (name, value) => {
    this.setState({...this.state, [name]: value});
  };

  render () {
    return (
      <section>
        <Input type='text' label='Name' name='name' value={this.state.name} onChange={this.handleChange.bind(this, 'name')} maxLength={16 } />
        <Input type='text' label='Disabled field' disabled />
        <Input type='email' label='Email address' icon='email' value={this.state.email} onChange={this.handleChange.bind(this, 'email')} />
        <Input type='tel' label='Phone' name='phone' icon='phone' value={this.state.phone} onChange={this.handleChange.bind(this, 'phone')} />
        <Input type='text' value={this.state.hint} label='Required Field' hint='With Hint' required onChange={this.handleChange.bind(this, 'hint')} icon={<span>J</span>} />
      </section>
    );
  }
}
```

If you want to provide a theme via context, the component key is `RTInput`.

## Properties

| Name            | Type                    | Default         | Description|
|:-----|:-----|:-----|:-----|
| `className`     | `String`                | `''`            | Sets a class name to give custom styles.|
| `disabled`      | `Boolean`               | `false`         | If true, component will be disabled.|
| `error`         | `String`                |                 | Give an error node to display under the field.|
| `floating`      | `Boolean`               | `true`          | Indicates if the label is floating in the input field or not.|
| `hint`          | `String`                | `''`            | The text string to use for hint text element.|
| `icon`          | `String` or `Element`   |                 | Name of an icon to use as a label for the input.|
| `label`         | `String`                |                 | The text string to use for the floating label element.|
| `maxLength`     | `Number`                |                 | Specifies the maximum number of characters allowed in the component.|
| `multiline`     | `Boolean`               | `false`         | If true, a textarea element will be rendered. The textarea also grows and shrinks according to the number of lines.|
| `rows`          | `Number`                |                 | The number of rows the multiline input field has.|
| `onBlur`        | `Function`              |                 | Callback function that is fired when component is blurred.|
| `onChange`      | `Function`              |                 | Callback function that is fired when the component's value changes.|
| `onFocus`       | `Function`              |                 | Callback function that is fired when component is focused.|
| `onKeyPress`    | `Function`              |                 | Callback function that is fired when a key is pressed.|
| `required`      | `Boolean`               | `false`         | If true, the html input has a required attribute.|
| `type`          | `String`                | `text`          | Type of the input element. It can be a valid HTML5 input type|
| `value`         | `Any`                   |                 | Current value of the input element.|

## Theming

| Name       | Description|
|:-----------|:-----------|
| `bar`     | Used for the bar under the input.|
| `counter` | Used for the counter element.|
| `disabled` | Added to the root class when input is disabled.|
| `error` | Used for the text error.|
| `errored` | Added to the root class when input is errored.|
| `hidden` | Used when the input is hidden.|
| `hint` | Used for the hint text.|
| `icon`   | Used for the icon in case the input has icon.|
| `input` | Used as root class for the component.|
| `inputElement` | Used for the HTML input element.|
| `label` | Used for the label when the input has a label.|
| `required` | Used in case the input is required.|
| `withIcon` | Added to the root class if the input has icon.|

## Methods

The `Input` component has some imperative methods that are used as a bypass to the native rendered DOM element. To call this methods you will need to retrieve the instance of the component. Check the [Install](http://react-toolbox.com/#/install) section for details on how to do this. The methods included for the `Input` are:

- `blur` used to blur the `input` element.
- `focus` used to focus the `input` element.
