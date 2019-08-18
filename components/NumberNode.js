import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Colors, Typography } from '../styles';

const NumberNode = ({ data, onPress, spacing }) => {
  const { num, size, selected } = data;
  const nodeStyle = selected ? { ...styles.numberNode, ...styles.selected } : styles.numberNode;

  return (
    <TouchableOpacity
      style={{ ...spacing, ...nodeStyle, height: size, width: size }}
      onPress={onPress}
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
    fontSize: 30,
  },
  selected: {
    borderWidth: 5,
    borderColor: Colors.green,
  },
});
