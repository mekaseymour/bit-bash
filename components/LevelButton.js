import React from 'react';
import { ImageBackground, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Colors, Typography } from '../styles';

const LevelButton = ({ level, goToGame, active }) => {
  const additionalButtonStyles = active ? styles.activeButton : styles.inactiveButton;

  return (
    <TouchableOpacity style={{ ...styles.button, ...additionalButtonStyles }} onPress={goToGame} disabled={!active}>
      <Text style={active ? styles.activeText : styles.inactiveText}>{level}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  activeText: {
    ...Typography.mainFont,
    fontSize: 28,
    color: Colors.darkBlue,
  },
  activeButton: {
    backgroundColor: Colors.blue,
    shadowColor: Colors.darkBlue,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 62,
    width: 70,
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 10,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 1.0,
    shadowRadius: 0,
    paddingTop: 10,
  },
  inactiveButton: {
    backgroundColor: Colors.lightGray,
    shadowColor: Colors.gray,
  },
  inactiveText: {
    ...Typography.mainFont,
    fontSize: 28,
    color: Colors.gray,
  },
});

export default LevelButton;
