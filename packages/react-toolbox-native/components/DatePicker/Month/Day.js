import { Dimensions, View } from 'react-native';
import React, { PureComponent, PropTypes } from 'react';
import styled, { css } from 'styled-components/native';
import dayFactory from 'react-toolbox-core/src/components/DatePicker/Day';
import isSameDay from 'date-fns/is_same_day';

class DayNode extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    day: PropTypes.instanceOf(Date),
    disabled: PropTypes.bool,
    onPress: PropTypes.func,
    outOfMonth: PropTypes.bool,
  };

  state = { pressed: false };

  handlePress = (event) => {
    this.props.onPress(this.props.day, event);
  };

  handleHideUnderlay = () => {
    this.setState({ pressed: false });
  };

  handleShowUnderlay = () => {
    this.setState({ pressed: true });
  };

  render() {
    const { pressed } = this.state;
    const { children, onPress: _onPress, ...rest } = this.props; // eslint-disable-line
    const canInteract = !rest.disabled && !rest.outOfMonth;
    const onPress = canInteract ? this.handlePress : null;

    return (
      <DayNodeWrapper {...rest} pressed={pressed}>
        <TouchableDayNode
          onHideUnderlay={this.handleHideUnderlay}
          onPress={onPress}
          onShowUnderlay={this.handleShowUnderlay}
          underlayColor="#348c91"
        >
          <View aspectRatio={1} style={{ alignItems: 'center', justifyContent: 'center' }}>
            {!rest.outOfMonth && (
              <DayNodeText {...rest} pressed={pressed}>
                {children}
              </DayNodeText>
            )}
          </View>
        </TouchableDayNode>
      </DayNodeWrapper>
    );
  }
}

const dayWidth = Math.floor(Dimensions.get('window').width / 7);
const dayBorderRadius = dayWidth / 2;

const TouchableDayNode = styled.TouchableHighlight`
  border-bottom-left-radius: ${dayBorderRadius};
  border-bottom-right-radius: ${dayBorderRadius};
  border-top-left-radius: ${dayBorderRadius};
  border-top-right-radius: ${dayBorderRadius};
`;

const DayNodeWrapper = styled.View`
  border-bottom-left-radius: ${dayBorderRadius};
  border-bottom-right-radius: ${dayBorderRadius};
  border-top-left-radius: ${dayBorderRadius};
  border-top-right-radius: ${dayBorderRadius};
  height: ${dayWidth};
  width: ${dayWidth};
  ${todayStyles}
  ${inRangeStyles}
  ${selectedStyles}
`;

const DayNodeText = styled.Text`
  color: ${dayNodeColor};
  font-weight: ${props => (props.disabled ? 400 : 600)};
  opacity: ${props => (props.disabled ? 0.7 : 1)};
  text-align: center;
`;

export default dayFactory({
  passthrough: props => ({
    day: props.day,
    selection: props.selected || {},
  }),
  DayNode,
});

function dayNodeColor(props) {
  const { pressed, selected, inRange } = props;
  if (pressed) return 'white';
  if (selected || inRange) return '#19a598';
  return 'white';
}

function todayStyles(props) {
  if (props.today && !props.selected && !props.pressed) {
    return css`
      border-width: 1;
      border-color: #76adb2;
      border-top-left-radius: ${dayBorderRadius};
      border-bottom-left-radius: ${dayBorderRadius};
      border-top-right-radius: ${dayBorderRadius};
      border-bottom-right-radius: ${dayBorderRadius};
    `;
  }

  return null;
}

function inRangeStyles(props) {
  if (props.inRange) {
    return css`
      background-color: white;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
      border-top-left-radius: 0;
      border-top-right-radius: 0;
    `;
  }

  return null;
}

function selectedStyles(props) {
  const { selection: { from, to }, selected, outOfMonth, selectedSource } = props;
  const sameDay = from && to && isSameDay(from, to);
  const rounded = from && to && !sameDay;

  if (selected && !outOfMonth) {
    return css`
      background-color: white;
      border-top-right-radius: ${(rounded && selectedSource === 'from') ? 0 : dayBorderRadius};
      border-bottom-right-radius: ${(rounded && selectedSource === 'from') ? 0 : dayBorderRadius};
      border-top-left-radius: ${(rounded && selectedSource === 'to') ? 0 : dayBorderRadius};
      border-bottom-left-radius: ${(rounded && selectedSource === 'to') ? 0 : dayBorderRadius};
    `;
  }

  return null;
}
