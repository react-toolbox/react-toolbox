# Date Picker

A [dialog](https://www.google.com/design/spec/components/pickers.html#pickers-date-pickers) date  picker is used to select a single date. The selected day is indicated by a filled circle. The current day is indicated by a different color and type weight.

<!-- example -->
```jsx
import DatePicker from 'react-toolbox/date_picker';

const selectedDate = new Date(1995, 11, 17);
const DatePickerTest = () => (
  <DatePicker value={selectedDate} />
);
```

## Properties

| Name          | Type    | Default         | Description|
| ------------- |:-------:|:--------------- |:---------- |
| className     | String        |     `''`            | Sets a class to give customized styles to the time picker.|
| value         | Date    |                 | Date object with the currently selected date. |

## Methods

The DatePicker is a very easy component from the top level API but quite complex inside. It has state to keep the currently viewed date and the currently selected value.

- `getValue` is used to retrieve the current value.
- `setValue` to force a new value.
