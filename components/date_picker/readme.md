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
  state = {date2: datetime};

  handleChange = (item, value) => {
    this.setState({...this.state, [item]: value});
  };

  render () {
    return (
      <section>
        <DatePicker label='Birthdate' onChange={this.handleChange.bind(this, 'date1')} value={this.state.date1} />
        <DatePicker label='Expiration date' minDate={min_datetime} onChange={this.handleChange.bind(this, 'date2')} value={this.state.date2} />
        <DatePicker label='Formatted date' inputFormat={(value) => `${value.getDate()}/${value.getMonth() + 1}/${value.getFullYear()}`} onChange={this.handleChange.bind(this, 'date3')} value={this.state.date3} />
      </section>
    );
  }
}
```

If you want to provide a theme via context, the component key is `RTDatePicker`.

## Properties

| Name            | Type            | Default       | Description|
|:-----|:-----|:-----|:-----|
| `autoOk`        | `Boolean`       | `false`       | Automatically selects a date upon clicking on a day|
| `className`     | `String`        |               | This class will be placed at the top of the `DatePickerDialog` component so you can provide custom styles.|
| `inputClassName`| `String`        |               | This class will be applied to `Input` component of `DatePicker`. |
| `inputFormat`   | `Function`      |               | Function to format the date displayed on the input. |
| `label`         | `String`        |               | The text string to use for the floating label element in the input component.|
| `maxDate`       | `Date`          |               | Date object with the maximum selectable date. |
| `minDate`       | `Date`          |               | Date object with the minimum selectable date. |
| `onChange`      | `Function`      |               | Callback called when the picker value is changed.|
| `value`         | `Date`          |               | Date object with the currently selected date. |

## Theme

| Name     | Description|
|:---------|:-----------|
| `active` | Used for the active day and year.|
| `button` | Used for the buttons in the dialog.|
| `calendar` | Used for the calendar root element.|
| `calendarWrapper` | Used as wrapper for the calendar component inside dialog.|
| `date` | Used for the date element inside header.|
| `day` | Used for the day element inside the calendar.|
| `days` | Used for the list of days inside a month.|
| `dialog` | Used for the dialog component.|
| `disabled` | Added to day element when day is disabled.|
| `header` | Used for the dialog header,.|
| `input` | Used for Input element that opens the picker.|
| `month` | Used for the month root element.|
| `monthsDisplay` | Added to the root dialog when months are displayed.|
| `next` | Used for the next month icon.|
| `prev` | Used for the prev month icon.|
| `title` | Used for the month title element.|
| `week` | Used for the weekdays wrapper.|
| `year` | Used for the year element inside header.|
| `years` | Used for the years list in years view.|
| `yearsDisplay` | Added to the root dialog when years are displayed.|
