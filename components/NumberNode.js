import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Colors, Typography } from '../styles';

const NumberNode = ({ data, onPress, spacing }) => {
  const { num, size, selected } = data;
  const baseNodeStyles = styles.numberNode(size);
  const nodeStyle = selected ? { ...baseNodeStyles, ...styles.selected } : baseNodeStyles;

  return (
    <TouchableOpacity style={{ ...spacing, ...nodeStyle }} onPress={onPress} activeOpacity={0.8}>
      <Text style={styles.number(num)}>{num}</Text>
    </TouchableOpacity>
  );
};

export default NumberNode;

const fontSize = num => {
  const digits = String(num).length;

  if (digits < 4) {
    return 30;
  } else if (digits === 4 || digits === 5) {
    return 20;
  } else {
    return 15;
  }
};

const styles = StyleSheet.create({
  numberNode: size => ({
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    backgroundColor: Colors.blue,
    height: size,
    width: size,
  }),
  number: num => ({
    ...Typography.mainFont,
    color: Colors.white,
    fontSize: fontSize(num),
  }),
  selected: {
    borderWidth: 5,
    borderColor: Colors.green,
  },
});
