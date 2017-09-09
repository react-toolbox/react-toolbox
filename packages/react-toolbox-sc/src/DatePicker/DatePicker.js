import styled from 'styled-components';
import datePickerFactory from 'react-toolbox-core/lib/components/DatePicker/DatePicker';
import dayFactory from 'react-toolbox-core/lib/components/DatePicker/Day';
import monthFactory from 'react-toolbox-core/lib/components/DatePicker/Month';
import rangePickerFactory from 'react-toolbox-core/lib/components/DatePicker/RangePicker';
import singlePickerFactory from 'react-toolbox-core/lib/components/DatePicker/SinglePicker';
import withOverride from '../utils/withOverride';

const Day = dayFactory({
  passthrough: ['overrides'],
  DayNode: styled.span`
    background: ${getDayBackground};
    cursor: pointer;
    opacity: ${props => (props.disabled ? 0.3 : 1)};
    pointer-events: ${props =>
      props.disabled || props.blocked ? 'none' : 'all'};
    text-align: center;
    position: relative;
    ${withOverride('DayNode')};
  `,
});

function getDayBackground(props) {
  if (props.outOfMonth) return 'gray';
  if (props.today) return 'orange';
  if (props.disabled) return 'transparent';
  if (props.blocked) {
    return `
      repeating-linear-gradient(
        45deg,
        #606dbc,
        #606dbc 10px,
        #465298 10px,
        #465298 20px
      );
    `;
  }
  if (props.selected) return 'red';
  if (props.highlighted) return 'aliceblue';
  if (props.inRange) return 'tomato';
  return 'transparent';
}

const Month = monthFactory({
  passthrough: ['overrides'],
  Day: styled(Day)`
    line-height: 30px;
    width: calc(100% / 7);
    ${withOverride('Day')};
  `,
  DaysWeek: styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    ${withOverride('DaysWeek')};
  `,
  DaysWrapper: styled.div`
    display: block;
    width: 100%;
    ${withOverride('DayWrapper')};
  `,
  MonthTitle: styled.div`
    line-height: 40px;
    text-align: center;
    width: 100%;
    ${withOverride('MonthTitle')};
  `,
  MonthWrapper: styled.div`
    border: 1px solid red;
    display: block;
    width: 100%;
    ${withOverride('MonthWrapper')};
  `,
  Weekday: styled.span`
    line-height: 30px;
    text-align: center;
    width: calc(100% / 7);
    ${withOverride('Weekday')};
  `,
  WeekdaysWrapper: styled.div`
    background-color: gray;
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    ${withOverride('WeekdaysWrapper')};
  `,
});

const MonthsWrapper = styled.div`
  align-items: top;
  display: flex;
  flex-direction: row;
`;

const RangePicker = rangePickerFactory({
  passthrough: ['overrides'],
  MonthsWrapper,
  Month,
});

const SinglePicker = singlePickerFactory({
  passthrough: ['overrides'],
  MonthsWrapper,
  Month,
});

const DatePicker = datePickerFactory({
  passthrough: ['overrides'],
  NextNode: styled.button``,
  PickerWrapper: styled.div``,
  PrevNode: styled.button``,
  RangePicker,
  SinglePicker,
  Month,
});

export default DatePicker;
