import React, { Component } from 'react';
import styled from 'styled-components';
import DatePicker from 'react-toolbox-sc/lib/DatePicker';

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
    highlighted: null,
    value: {},
  };

  handleChange = (value) => {
    this.setState({ value });
  };

  handleFocusedInputChange = (focusedInput) => {
    this.setState({ focusedInput });
  };

  handleHighlightedChange = (highlighted) => {
    this.setState({ highlighted });
  };

  isDayBlocked = date => date.getMonth() === 1 && date.getDate() === 17;

  isDayDisabled = (date) => {
    const now = new Date();
    return date.getTime() < now.getTime();
  };

  render() {
    return (
      <div>
        <DateInput
          value={formatDate(this.state.value.from)}
          onFocus={() => this.setState({ focusedInput: 'START_DATE' })}
          active={this.state.focusedInput === 'START_DATE'}
          readOnly
        />
        <DateInput
          value={formatDate(this.state.value.to)}
          onFocus={() => this.setState({ focusedInput: 'END_DATE' })}
          active={this.state.focusedInput === 'END_DATE'}
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

function formatDate(date) {
  if (!date) return '';
  return date.toISOString();
}

const DateInput = styled.input`
  border: 1px solid;
  border-color: ${props => (props.active ? 'rebeccapurple' : '#ccc')};
  &:focus {
    outline: none;
  }
`;

export default DatePickerExamples;
