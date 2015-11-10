# Time Picker

A [dialog picker](https://www.google.com/design/spec/components/pickers.html#pickers-time-pickers) is used to select a single time (hours:minutes). The selected time is indicated by the filled circle at the end of the clock hand.

<!-- example -->
```jsx
import TimePicker from 'react-toolbox/time_picker';

let selectedTime = new Date();
selectedTime.setHours(17);
selectedTime.setMinutes(28);

const TimePickerTest = () => (
  <TimePicker value={selectedTime} />
);
```

## Properties

| Name          | Type    | Default         | Description|
|:-----|:-----|:-----|:-----|
| `className`  | `String`    |     `''`            | Sets a class to give customized styles.|
| `format`    | `String`  | `24hr`          | Format to display the clock. It can be `24hr` or `ampm`.|
| `onChange`       | `Function`       |                | Callback called when the picker value is changed.|
| `value`     | `Date`    |   | Datetime object with currrently selected time |
