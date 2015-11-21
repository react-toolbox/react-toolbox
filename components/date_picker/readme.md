# Date Picker

A [dialog](https://www.google.com/design/spec/components/pickers.html#pickers-date-pickers) date  picker is used to select a single date. The selected day is indicated by a filled circle. The current day is indicated by a different color and type weight.

<!-- example -->
```jsx
import DatePicker from 'react-toolbox/lib/date_picker';

const datetime = new Date(2015, 10, 16);
const min_datetime = new Date(new Date(datetime).setDate(8));
datetime.setHours(17);
datetime.setMinutes(28);

class DatePickerTest extends React.Component {
  state = {
    date2: datetime
  };

  handleChange = (item, value) => {
    const newState = {};
    newState[item] = value;
    this.setState(newState);
  };

  render () {
    return (
      <section>
        <DatePicker label='Birthdate' onChange={this.handleChange.bind(this, 'date1')} value={this.state.date1} />
        <DatePicker label='Expiration date' minDate={min_datetime} onChange={this.handleChange.bind(this, 'date2')} value={this.state.date2} />
      </section>
    );
  }
}
```

## Properties

| Name          | Type    | Default         | Description|
|:-----|:-----|:-----|:-----|
| `label`         | `String`        |             | The text string to use for the floating label element in the input component.|
| `maxDate`         | `Date`    |                 | Date object with the maximum selectable date. |
| `minDate`         | `Date`    |                 | Date object with the minimum selectable date. |
| `onChange`       | `Function`       |                | Callback called when the picker value is changed.|
| `placeholder`     | `String`        |             | The text string to use like a input placeholder.|
| `value`         | `Date`    |                 | Date object with the currently selected date. |
