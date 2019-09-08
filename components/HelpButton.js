import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Button, Colors, Typography } from '../styles';

const HelpButton = ({ style, onPress }) => (
  <TouchableOpacity style={{ ...Button.gameControlsButton, paddingTop: 5, paddingLeft: 4 }} onPress={onPress}>
    <Text style={styles.buttonText}>?</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  buttonText: {
    ...Typography.mainFont,
    fontSize: 35,
    color: Colors.gray,
  },
});

export default HelpButton;
