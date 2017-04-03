import React from 'react';
import styled from 'styled-components/native';

const Weekday = ({ children, ...rest }) => (
  <WeekdayNode {...rest}>
    {children.charAt(0)}
  </WeekdayNode>
);

const WeekdayNode = styled.Text`
  color: #fff;
  height: 24;
  flex: 7;
  flex-direction: row;
  text-align: center;
`;

export default Weekday;
