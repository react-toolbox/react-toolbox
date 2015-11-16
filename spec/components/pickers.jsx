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

        <DatePicker value={this.state.date1} onChange={this.handleChange.bind(this, 'date1')} />
        <DatePicker
          maxDate={max_datetime}
          minDate={min_datetime}
          value={this.state.date2}
          onChange={this.handleChange.bind(this, 'date2')}
        />

        <TimePicker value={this.state.time1} onChange={this.handleChange.bind(this, 'time1')} />
        <TimePicker value={this.state.time2} format='ampm' onChange={this.handleChange.bind(this, 'time2')} />
      </section>
    );
  }
}

export default PickersTest;
