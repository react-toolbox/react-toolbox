# Time Picker

A [dialog picker](https://material.google.com/components/pickers.html#pickers-time-pickers) is used to select a single time (hours:minutes). The selected time is indicated by the filled circle at the end of the clock hand.

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
    return (
      <TimePicker
        label='Finishing time'
        onChange={this.handleChange}
        value={this.state.time}
      />
    );
  }
}
```

If you want to provide a theme via context, the component key is `RTTimePicker`.

## Properties

| Name            | Type        | Default     | Description|
|:-----|:-----|:-----|:-----|
| `active`        | `Boolean`       | `false`       | Allows to control if the picker should be shown from outside. Beware you should update the prop when the Dialog is closed. |
| `className`     | `String`    |             | This class will be placed at the top of the `TimePickerDialog` component so you can provide custom styles.|
| `error`         | `String`    |             | Provide error text which will be displayed under the field.|
| `inputClassName`| `String`        |         | This class will be applied to `Input` component of `TimePicker`. |
| `format`        | `String`    | `24hr`      | Format to display the clock. It can be `24hr` or `ampm`.|
| `label`         | `String`    |             | The text string to use for the floating label element in the input component.|
| `onChange`      | `Function`  |             | Callback called when the picker value is changed.|
| `readonly`      | `Boolean`   |             | The input element will be readonly and look like disabled.|
| `value`         | `Date`      |             | Datetime object with currrently selected time. |

## Theme

| Name     | Description|
|:---------|:-----------|
| `active` | Added to the number which is active in clock face.|
| `am` | AM label in dialog header when mode is AM/PM.|
| `amFormat` | Added to the dialog when the selected format is AM.|
| `ampm` | Wrapper for AM and PM labels in header when mode is AM/PM.|
| `button` | Used for buttons inside the dialog of the picker.|
| `clock` | Clock root class element.|
| `clockWrapper` | Wrapper for the proper positioning of the clock.|
| `container` | Wrapper element of the picker.|
| `dialog` | Used for the dialog component.|
| `face` | Used to style the clock face.|
| `hand` | Used for the clock's hand.|
| `header` | Dialog header wrapper class.|
| `hours` | Used for hours in dialog header.|
| `hoursDisplay` | Added to the dialog hours are displayed.|
| `input` | Used for Input element that opens the picker.|
| `knob` | Used for the knob of the hand.|
| `minutes` | Used for minutes in dialog header.|
| `minutesDisplay` | Added to the dialog minutes are displayed.|
| `number` | Each of the numbers in the clock's face.|
| `placeholder` | Placeholder for the clock inside the dialog (inner wrapper).|
| `pm` | PM label in dialog header when mode is AM/PM.|
| `pmFormat` | Added to the dialog when the selected format is PM.|
| `separator` | Is the `:` separator between hours and minutes in dialog header.|
| `small` | Added to the knob when no round number is selected.|
