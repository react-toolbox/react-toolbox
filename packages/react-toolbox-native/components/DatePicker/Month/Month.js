import { range } from 'ramda';
import React, { Component, PropTypes } from 'react';
import styled from 'styled-components/native';
import { FlatList, Dimensions } from 'react-native';
import monthFactory from 'react-toolbox-core/src/components/DatePicker/Month';
import dateShape from 'react-toolbox-core/src/components/DatePicker/dateShape';
import Day from './Day';

const Month = monthFactory({
  passthrough: (props, comp) => {
    switch (comp) {
      case 'Day':
        return {
          onPress: (...args) => requestAnimationFrame(() => {
            props.onDayClick(...args);
          }),
        };
      default:
        return {};
    }
  },
  Weekday: Empty,
  WeekdaysWrapper: Empty,
  MonthWrapper: styled.View`
    flex-direction: column;
    align-self: center;
    width: ${Math.floor(Dimensions.get('window').width / 7) * 7};
  `,
  MonthTitle: styled.Text`
    align-items: center;
    justify-content: center;
    font-size: 18;
    color: white;
    margin: 10;
  `,
  DaysWrapper: styled.View`
    flex-direction: column;
  `,
  DaysWeek: styled.View`
    flex-grow: 1;
    margin: 3 0;
    flex-direction: row;
    align-items: center;
  `,
  Day,
});

function Empty() {
  return null;
}

class RenderMonth extends Component {
  static propTypes = {
    highlighted: dateShape,
    onDayClick: PropTypes.func,
    onDayMouseEnter: PropTypes.func,
    selected: dateShape,
    viewDate: PropTypes.instanceOf(Date),
  };

  getData = (props) => {
    const { viewDate } = props;
    const viewFullYear = viewDate.getFullYear();
    const viewMonth = viewDate.getMonth();

    return range(0, 12).map(month => ({
      key: month,
      month: new Date(viewFullYear, viewMonth + month, 1),
    }));
  }

  renderItem = ({ item }) => {
    const { highlighted, onDayClick, selected, ...rest } = this.props;
    return (
      <Month
        {...rest}
        highlighted={highlighted}
        onDayClick={onDayClick}
        selected={selected}
        viewDate={item.month}
      />
    );
  }

  render() {
    return (
      <FlatList
        data={this.getData(this.props)}
        renderItem={this.renderItem}
        style={{ flex: 1 }}
      />
    );
  }
}

export default RenderMonth;
