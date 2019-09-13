import React from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors, Typography } from '../styles';

const LevelButton = ({ active, isUpNext, level, goToGame }) => {
  const additionalButtonStyles = active ? styles.activeButton : styles.inactiveButton;

  return (
    <View>
      {isUpNext ? <View style={styles.outline} /> : null}
      <TouchableOpacity style={{ ...styles.button, ...additionalButtonStyles }} onPress={goToGame} disabled={!active}>
        <Text style={active ? styles.activeText : styles.inactiveText}>{level}</Text>
      </TouchableOpacity>
    </View>
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
    ...Platform.select({
      android: {
        height: 70,
        paddingTop: 0,
      },
    }),
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
  outline: {
    position: 'absolute',
    height: 80,
    width: 80,
    borderRadius: 13,
    borderWidth: 5,
    borderColor: Colors.green,
    top: 5,
    left: 5,
  },
});

export default LevelButton;
