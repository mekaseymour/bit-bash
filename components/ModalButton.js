import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Colors, Typography } from '../styles';

const ModalButton = ({ text, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {
    ...Typography.mainFont,
    fontSize: 28,
    color: Colors.blue,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 55,
    width: 247,
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 10,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 1.0,
    shadowRadius: 0,
    paddingTop: 10,
    backgroundColor: Colors.green,
    shadowColor: Colors.darkGreen,
  },
});

export default ModalButton;
