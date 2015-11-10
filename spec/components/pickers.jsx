import React from 'react';
import DatePicker from '../../components/date_picker';
import TimePicker from '../../components/time_picker';

const datetime = new Date(1995, 11, 17);
datetime.setHours(17);
datetime.setMinutes(28);

class PickersTest extends React.Component {
  state = {
    time1: undefined,
    time2: datetime
  };

  handleDatePickerChange = (date) => {
    console.log('handleDatePickerChange', date);
  };

  handleTimeChange = (item, value) => {
    const newState = {};
    newState[item] = value;
    this.setState(newState);
  };

  render () {
    return (
      <section>
        <h5>Pickers</h5>
        <p>Date pickers and time pickers with Material flavour.</p>

        <DatePicker onChange={this.handleDatePickerChange}/>
        <DatePicker value={datetime} />

        <TimePicker value={this.state.time1} onChange={this.handleTimeChange.bind(this, 'time1')} />
        <TimePicker value={this.state.time2} format='ampm' onChange={this.handleTimeChange.bind(this, 'time2')} />
      </section>
    );
  }

}

export default PickersTest;
