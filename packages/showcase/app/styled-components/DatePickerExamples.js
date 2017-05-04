import React, { Component } from 'react';
import styled from 'styled-components';
import DatePicker from 'react-toolbox-sc/src/DatePicker';
import { constants as C } from 'react-toolbox-sc/src/DatePicker';

const DatePickerExamples = () => (
  <section>
    <h5>Date Picker</h5>
    <p>Agnostic + Styled Components</p>

    <TestDatePicker />
  </section>
);

class TestDatePicker extends Component {
  state = {
    focusedInput: null,
    highlighted: { from: null, to: null },
    value: { from: null, to: null },
  };

  handleChange = value => {
    this.setState({ value });
  };

  handleFocusedInputChange = focusedInput => {
    this.setState({ focusedInput });
  };

  handleHighlightedChange = highlighted => {
    this.setState({ highlighted });
  };

  isDayBlocked = date => date.getMonth() === 1 && date.getDate() === 17;

  isDayDisabled = date => {
    const now = new Date();
    return date.getTime() < now.getTime();
  };

  format(date) {
    if (!date) return '';
    return date.toISOString();
  }

  render() {
    return (
      <div>
        <DateInput
          value={this.format(this.state.value.from)}
          onFocus={() => this.setState({ focusedInput: C.START_DATE })}
          active={this.state.focusedInput === C.START_DATE}
          readOnly
        />
        <DateInput
          value={this.format(this.state.value.to)}
          onFocus={() => this.setState({ focusedInput: C.END_DATE })}
          active={this.state.focusedInput === C.END_DATE}
          readOnly
        />
        <DatePicker
          focusedInput={this.state.focusedInput}
          highlighted={this.state.highlighted}
          onChange={this.handleChange}
          onFocusedInputChange={this.handleFocusedInputChange}
          onHighlightedChange={this.handleHighlightedChange}
          selected={this.state.value}
          sundayFirstDayOfWeek
          viewDate={new Date()}
        />
      </div>
    );
  }
}

const DateInput = styled.input`
  border: 1px solid;
  border-color: ${props => (props.active ? 'rebeccapurple' : '#ccc')};
  &:focus {
    outline: none;
  }
`;

export default DatePickerExamples;
