# Date Picker

A [dialog](https://www.google.com/design/spec/components/pickers.html#pickers-date-pickers) date  picker is used to select a single date. The selected day is indicated by a filled circle. The current day is indicated by a different color and type weight.

<!-- example -->
```jsx
import DatePicker from 'react-toolbox/lib/date_picker';

const selectedDate = new Date(1995, 11, 17);
const DatePickerTest = () => (
  <DatePicker value={selectedDate} />
);
```

## Properties

| Name          | Type    | Default         | Description|
|:-----|:-----|:-----|:-----|
| `className`     | `String`        |     `''`            | Sets a class to give customized styles to the time picker.|
| `onChange`       | `Function`       |                | Callback called when the picker value is changed.|
| `value`         | `Date`    |                 | Date object with the currently selected date. |
