import React, { Component } from 'react';
import { css } from 'styled-components';
import DatePicker from '../../src/styled-components/DatePicker';

const DatePickerExamples = () => (
  <section>
    <h5>Date Picker</h5>
    <p>Agnostic + Styled Components</p>

    <TestDatePicker />
  </section>
);

class TestDatePicker extends Component {
  state = {
    value: null,
  };

  handleChange = (value) => {
    this.setState({ value });
  };

  isDayBlocked = date => (
    date.getMonth() === 1
      && date.getDate() === 17
  );

  isDayDisabled = (date) => {
    const now = new Date();
    return date.getTime() < now.getTime();
  }

  render() {
    return (
      <DatePicker
        isDayDisabled={this.isDayDisabled}
        isDayBlocked={this.isDayBlocked}
        sundayFirstDayOfWeek
        onChange={this.handleChange}
        selected={this.state.value}
        viewDate={new Date()}
      />
    );
  }
}

export default DatePickerExamples;
