# Time Picker

A [dialog picker](https://www.google.com/design/spec/components/pickers.html#pickers-time-pickers) is used to select a single time (hours:minutes). The selected time is indicated by the filled circle at the end of the clock hand.

<!-- example -->
```jsx
import TimePicker from 'react-toolbox/lib/time_picker';

let selectedTime = new Date();
selectedTime.setHours(17);
selectedTime.setMinutes(28);

const TimePickerTest = () => (
  <TimePicker label='Finishing time' value={selectedTime} />
);
```

## Properties

| Name          | Type    | Default         | Description|
|:-----|:-----|:-----|:-----|
| `className`  | `String`    |     `''`            | Sets a class to give customized styles.|
| `format`    | `String`  | `24hr`          | Format to display the clock. It can be `24hr` or `ampm`.|
| `label`         | `String`        |             | The text string to use for the floating label element in the input component.|
| `onChange`       | `Function`       |                | Callback called when the picker value is changed.|
| `value`     | `Date`    |   | Datetime object with currrently selected time |
