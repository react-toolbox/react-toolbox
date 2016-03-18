import React from 'react';
import DatePicker from '../../components/date_picker';
import TimePicker from '../../components/time_picker';


const datetime = new Date(2015, 10, 16);
const min_datetime = new Date(new Date(datetime).setDate(8));
const max_datetime = new Date(new Date(datetime).setDate(24));
datetime.setHours(17);
datetime.setMinutes(28);

class PickersTest extends React.Component {
  state = {
    date2: datetime,
    time2: datetime
  };

  handleChange = (item, value) => {
    const newState = {};
    newState[item] = value;
    this.setState(newState);
  };

  render () {
    return (
      <section>
        <h5>Pickers</h5>
        <p>Date pickers and time pickers with Material flavour.</p>

        <DatePicker
          label='Birthdate'
          onChange={this.handleChange.bind(this, 'date1')}
          value={this.state.date1}
        />

        <DatePicker
          label='Expiration date'
          maxDate={max_datetime}
          minDate={min_datetime}
          onChange={this.handleChange.bind(this, 'date2')}
          value={this.state.date2}
        />

        <DatePicker
          label='Formatted Date'
          inputFormat={(value) => `${value.getDate()}/${value.getMonth()}/${value.getFullYear()}`}
          onChange={this.handleChange.bind(this, 'date3')}
          value={this.state.date3}
        />

        <DatePicker
          label='Auto Picker'
          autoOk
          onChange={this.handleChange.bind(this, 'date4')}
          value={this.state.date4}
        />

        <TimePicker
          label='Start time'
          onChange={this.handleChange.bind(this, 'time1')}
          value={this.state.time1}
        />

        <TimePicker
          format='ampm'
          label='Finishing time'
          onChange={this.handleChange.bind(this, 'time2')}
          value={this.state.time2}
        />
      </section>
    );
  }
}

export default PickersTest;
