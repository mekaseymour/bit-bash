import React from 'react';
import { ImageBackground, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Colors, Typography } from '../styles';

const activatedLevelIcon = require('../assets/icons/active-level-2x.png');
const inactiveLevelIcon = require('../assets/icons/level-button-2x.png');

const LevelButton = ({ level, goToGame, active }) => (
  <TouchableOpacity onPress={goToGame}>
    <ImageBackground source={active ? activatedLevelIcon : inactiveLevelIcon} style={styles.button}>
      <Text style={active ? styles.activeText : styles.inactiveText}>{level}</Text>
    </ImageBackground>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 70,
    width: 70,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  inactiveText: {
    ...Typography.mainFont,
    fontSize: 36,
    color: Colors.gray,
  },
  activeText: {
    ...Typography.mainFont,
    fontSize: 36,
    color: Colors.darkBlue,
  },
});

export default LevelButton;
