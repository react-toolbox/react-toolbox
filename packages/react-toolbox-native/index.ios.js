/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  ScrollView,
  View,
} from 'react-native';
import Button from './components/Button';

export default class ReactToolboxNative extends Component {
  render() {
    return (
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
          text="REACT TOOLBOX"
        />
        <Button
          raised
          text="REACT TOOLBOX"
        />
        <Text style={styles.instructions}>
          To get started, edit index.ios.js
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 25,
    marginTop: 5,
  },
});

AppRegistry.registerComponent('ReactToolboxNative', () => ReactToolboxNative);
