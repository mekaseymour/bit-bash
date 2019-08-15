import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors } from '../styles';

const GameScreen = ({ target }) => {
  return (
    <View>
      <Text style={styles.targetNumber}>{target}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  targetNumber: {
    fontFamily: 'lalezar',
    fontSize: 72,
    color: Colors.blue,
  },
});

export default GameScreen;
