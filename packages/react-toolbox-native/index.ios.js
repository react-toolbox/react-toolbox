/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import styled from 'styled-components/native';
import {
  AppRegistry,
  StyleSheet,
  StatusBar,
  Text,
  Modal,
  ScrollView,
  ListView,
  TouchableHighlight,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import isBefore from 'date-fns/is_before';
import isToday from 'date-fns/is_today';
import Button from './components/Button';
import DatePicker, { Heading, Month } from './components/DatePicker';

class TestDatePicker extends Component {
  state = {
    modalVisible: true,
    value: null,
  };

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  handleChange = (value) => {
    this.setState({ value });
  };

  isDayBlocked = date => (
    date.getMonth() === 1
      && date.getDate() === 17
  );

  isDayDisabled = (date) => {
    return isBefore(date, Date.now()) &&
      !isToday(date);
  }

  render() {
    return (
      <View style={{marginTop: 22}}>
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {alert("Modal has been closed.")}}
          >
         <View style={{backgroundColor: '#0b666e', flexDirection: 'column', flex: 1, paddingTop: 30}}>
            <StatusBar barStyle="light-content" />
            <Icon name="close" size={26} color="#FFF" />
            <View style={{ flex: 1 }}>
              <DatePicker
                numberOfMonths={1}
                onChange={this.handleChange}
                viewDate={new Date()}
                selected={this.state.value}
                isDayDisabled={this.isDayDisabled}
                isDayBlocked={this.isDayBlocked}
                selected={this.state.value}
              />
            </View>
         </View>
        </Modal>

        <TouchableHighlight onPress={() => {
          this.setModalVisible(true)
        }}>
          <Text>Show Modal</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const BaseView = () => (
  <View style={styles.container}>
    <Text style={styles.welcome}>
      React Toolbox Native
    </Text>
    <Text style={styles.instructions}>
      This example develops a POC of React Toolbox Core,{'\n'}
      Components implementing React Native
    </Text>
    <Button
      primary
      raised
      text="SHOW PICKER"
    />
    <Text style={styles.instructions}>
      To get started, edit index.ios.js
    </Text>
  </View>
);

const PickerLayout = styled.View`
  align-items: center;
  flex-direction: row;
  flex: 1;
  justifyContent: center;
`;

export default class ReactToolboxNative extends Component {
  render() {
    return (
      <TestDatePicker />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    flex: 1,
    justifyContent: 'center',
  },
  welcome: {
    fontSize: 20,
    margin: 10,
    textAlign: 'center',
  },
  instructions: {
    color: '#333333',
    marginBottom: 25,
    marginTop: 5,
    textAlign: 'center',
  },
});

AppRegistry.registerComponent('ReactToolboxNative', () => ReactToolboxNative);
