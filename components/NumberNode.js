import React from 'react';
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors, Typography } from '../styles';
import { IPHONE_8_OR_SMALLER } from '../util/constants';

const NumberNode = ({ context, data, onPress, spacing }) => {
  const { num, size, selected } = data;
  const baseNodeStyles = context.enabledCustomization ? styles.customNumberNode(size) : styles.numberNode(size);
  const nodeStyle = selected ? { ...baseNodeStyles, ...styles.selected } : baseNodeStyles;

  return context.enabledCustomization ? (
    <TouchableOpacity style={{ ...spacing, ...nodeStyle }} onPress={onPress} activeOpacity={0.8}>
      <ImageBackground source={context.enabledCustomization.icon} style={baseNodeStyles}>
        <Text style={styles.number(num)}>{num}</Text>
        <View style={{ ...spacing, ...nodeStyle, position: 'absolute' }} />
      </ImageBackground>
    </TouchableOpacity>
  ) : (
    <TouchableOpacity style={{ ...spacing, ...nodeStyle }} onPress={onPress} activeOpacity={0.8}>
      <Text style={styles.number(num)}>{num}</Text>
    </TouchableOpacity>
  );
};

export default NumberNode;

const fontSize = num => {
  const digits = String(num).length;

  if (digits < 4) {
    return IPHONE_8_OR_SMALLER ? 25 : 30;
  } else if (digits === 4 || digits === 5) {
    return IPHONE_8_OR_SMALLER ? 15 : 20;
  } else {
    return IPHONE_8_OR_SMALLER ? 12 : 15;
  }
};

const styles = StyleSheet.create({
  customNumberNode: size => ({
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    height: size,
    width: size,
  }),
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
