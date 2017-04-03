import React, { Component, PropTypes } from 'react';
import styled from 'styled-components/native';
import rangePickerFactory from 'react-toolbox-core/src/components/DatePicker/RangePicker';
import Weekdays from './Weekdays';
import Heading from '../Heading/Heading';
import Month from '../Month';

const MonthsWrapperDay = styled.View`
  flex: 1;
  flex-direction: column;
`;

const MonthsWrapper = ({ children, selected, ...rest }) => (
  <MonthsWrapperDay {...rest}>
    <Heading from={selected && selected.from} to={selected && selected.to} />
    <Weekdays />
    {children}
  </MonthsWrapperDay>
);

const RangePicker = rangePickerFactory({
  passthrough: props => ({
    selected: props.selected,
  }),
  MonthsWrapper,
  Month,
});

export default RangePicker;
