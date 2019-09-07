import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Colors, Typography } from '../styles';

const ModalButton = ({ children, onPress, type }) => {
  return (
    <TouchableOpacity style={styles.button(type)} onPress={onPress}>
      <Text style={styles.text}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {
    ...Typography.mainFont,
    fontSize: 28,
    color: Colors.blue,
  },
  button: type => ({
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
    backgroundColor: type === 'primary' ? Colors.green : Colors.lightGray,
    shadowColor: type === 'primary' ? Colors.darkGreen : Colors.gray,
  }),
});

export default ModalButton;
