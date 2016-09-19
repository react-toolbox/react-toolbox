# Date Picker

A [dialog](https://www.google.com/design/spec/components/pickers.html#pickers-date-pickers) date  picker is used to select a single date. The selected day is indicated by a filled circle. The current day is indicated by a different color and type weight. If the input is tabbed into a date can be entered mannual in the format MM/DD/YYYY.

<!-- example -->
```jsx
import DatePicker from 'react-toolbox/lib/date_picker';

const datetime = new Date(2015, 10, 16);
const min_datetime = new Date(new Date(datetime).setDate(8));
datetime.setHours(17);
datetime.setMinutes(28);

const localeExample = {
  months: 'urtarrila_otsaila_martxoa_apirila_maiatza_ekaina_uztaila_abuztua_iraila_urria_azaroa_abendua'.split('_'),
  monthsShort: 'urt._ots._mar._api._mai._eka._uzt._abu._ira._urr._aza._abe.'.split('_'),
  weekdays: 'igandea_astelehena_asteartea_asteazkena_osteguna_ostirala_larunbata'.split('_'),
  weekdaysShort: 'ig._al._ar._az._og._ol._lr.'.split('_'),
  weekdaysLetter: 'ig_al_ar_az_og_ol_lr'.split('_')
}

class DatePickerTest extends React.Component {
  state = {date1: datetime};

  handleChange = (item, value) => {
    this.setState({...this.state, [item]: value});
  };

  render () {
    return (
      <section>
        <DatePicker label='Birthdate' onChange={this.handleChange.bind(this, 'date1')} value={this.state.date1} />
        <DatePicker label='Locale (String) - Spanish' locale='es' onChange={this.handleChange.bind(this, 'date2')} value={this.state.date2} />
        <DatePicker label='Locale (Object) - Basque' locale={localeExample} onChange={this.handleChange.bind(this, 'date3')} value={this.state.date3} />
        <DatePicker label='Expiration date' sundayFirstDayOfWeek minDate={min_datetime} onChange={this.handleChange.bind(this, 'date4')} value={this.state.date4} />
        <DatePicker label='Formatted date' sundayFirstDayOfWeek inputFormat={(value) => `${value.getDate()}/${value.getMonth() + 1}/${value.getFullYear()}`} onChange={this.handleChange.bind(this, 'date5')} value={this.state.date5} />
        <DatePicker label='MM/DD/YYYY Input format' monthFirst onChange={this.handleChange.bind(this, 'date6')} value={this.state.date6} />
      </section>
    );
  }
}
```

If you want to provide a theme via context, the component key is `RTDatePicker`.

## Properties

| Name            | Type            | Default       | Description |
|:-----|:-----|:-----|:-----|
| `active`        | `Boolean`       | `false`       | Allows to control if the picker should be shown from outside. Beware you should update the prop when the Dialog is closed. |
| `autoOk`        | `Boolean`       | `false`       | Automatically selects a date upon clicking on a day. |
| `className`     | `String`        |               | This class will be placed at the top of the `DatePickerDialog` component so you can provide custom styles.|
| `inputClassName`| `String`        |               | This class will be applied to `Input` component of `DatePicker`. |
| `inputFormat`   | `Function`      |               | Function to format the date displayed on the input. |
| `label`         | `String`        |               | The text string to use for the floating label element in the input component.|
| `locale`        | `String` or `Object` | `'en'`     | Set the locale for the date picker dialog ('en','es','af','ar','be','bg','bn','bo','br','bs','ca','gl','eu','pt','it',fr'). Object is supported too (see example above). |
| `maxDate`       | `Date`          |               | Date object with the maximum selectable date. |
| `minDate`       | `Date`          |               | Date object with the minimum selectable date. |
| `monthFirst`    | `bool`          |               | Changes input to accept MM/DD/YYYY instead of DD/MM/YYYY |
| `onChange`      | `Function`      |               | Callback called when the picker value is changed.|
| `onEscKeyDown`  | `Function`      |               | Callback called when the ESC key is pressed with the overlay active. |
| `onOverlayClick`| `Function`      |               | Callback to be invoked when the dialog overlay is clicked.|
| `readonly`      | `Boolean`       | `false`       | The input element will be readonly and look like disabled.|
| `sundayFirstDayOfWeek` | `Boolean`| `false`       | Set week's first day to Sunday. Default week's first day is Monday ([ISO 8601](https://en.wikipedia.org/wiki/ISO_8601#Week_dates)). |
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
