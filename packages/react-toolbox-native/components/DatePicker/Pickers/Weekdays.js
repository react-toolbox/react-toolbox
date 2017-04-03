import React from 'react';
import styled from 'styled-components/native';
import getFullDayOfWeek from 'react-toolbox-core/lib/components/DatePicker/dateLocale/getFullDayOfWeek';
import Weekday from './Weekday';

const Weekdays = ({ locale, sundayFirstDayOfWeek }) => (
  <WeekdaysWrapper>
    {getSortedDaysIdx(sundayFirstDayOfWeek).map(weekDay => (
      <Weekday
        key={getFullDayOfWeek(weekDay, locale)}
        weekDay={weekDay}
      >
        {getFullDayOfWeek(weekDay, locale)}
      </Weekday>
    ))}
  </WeekdaysWrapper>
);

const WeekdaysWrapper = styled.View`
  align-items: center;
  border-bottom-color: #348c91;
  border-bottom-width: 1;
  flex-direction: row;
  justify-content: center;
`;

function getSortedDaysIdx(sundayFirstDayOfWeek) {
  const indexes = [0, 1, 2, 3, 4, 5, 6];
  return sundayFirstDayOfWeek
    ? [...indexes.slice(1), indexes[0]]
    : indexes;
}

export default Weekdays;
