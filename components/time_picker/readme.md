# Time Picker

A [dialog picker](https://www.google.com/design/spec/components/pickers.html#pickers-time-pickers) is used to select a single time (hours:minutes). The selected time is indicated by the filled circle at the end of the clock hand.

<!-- example -->
```jsx
import TimePicker from 'react-toolbox/lib/time_picker';
let time = new Date();
time.setHours(17);
time.setMinutes(28);

class TimePickerTest extends React.Component {
	state = {time};

  handleChange = (time) => {
  	this.setState({time});
  };

  render () {
  	return <TimePicker label='Finishing time' onChange={this.handleChange} value={this.state.time} />;
  }
}
```

## Properties

| Name            | Type        | Default     | Description|
|:-----|:-----|:-----|:-----|
| `className`     | `String`    |             | This class will be placed at the top of the `TimePickerDialog` component so you can provide custom styles.|
| `error`         | `String`    |             | Provide error text which will be displayed under the field.|
| `inputClassName`| `String`        |         | This class will be applied to `Input` component of `TimePicker`. |
| `format`        | `String`    | `24hr`      | Format to display the clock. It can be `24hr` or `ampm`.|
| `label`         | `String`    |             | The text string to use for the floating label element in the input component.|
| `onChange`      | `Function`  |             | Callback called when the picker value is changed.|
| `value`         | `Date`      |             | Datetime object with currrently selected time. |
