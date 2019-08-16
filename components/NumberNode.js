import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Colors, Typography } from '../styles';

const NumberNode = ({ data }) => {
  const { num, size } = data;

  return (
    <TouchableOpacity
      style={{ ...styles.numberNode, height: size, width: size }}
      onPress={() => console.log('number node pressed')}
      activeOpacity={0.8}
    >
      <Text style={styles.number}>{num}</Text>
    </TouchableOpacity>
  );
};

export default NumberNode;

const styles = StyleSheet.create({
  numberNode: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    backgroundColor: Colors.blue,
  },
  number: {
    ...Typography.mainFont,
    color: Colors.white,
    fontSize: 45,
  },
});
