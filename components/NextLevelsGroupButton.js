import React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { nextLevelsGroupButton } from '../assets';

const NextLevelsGroupButton = ({ onPress }) => (
  <TouchableOpacity style={styles.button} onPress>
    <Image source={nextLevelsGroupButton} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    width: 81,
  },
});

export default NextLevelsGroupButton;
