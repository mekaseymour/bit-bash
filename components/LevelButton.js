import React from 'react';
import { ImageBackground, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Colors, Typography } from '../styles';

const LevelButton = ({ level, goToGame }) => (
  <TouchableOpacity onPress={goToGame}>
    <ImageBackground source={require('../assets/icons/level-button-2x.png')} style={styles.button}>
      <Text style={styles.text}>{level}</Text>
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
  text: {
    ...Typography.mainFont,
    fontSize: 36,
    color: Colors.gray,
  },
});

export default LevelButton;
