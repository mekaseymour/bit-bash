import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { Button } from '../styles';
import { MULTIPLICATION_OPERATOR } from '../util/operations';

const MultiplyButton = ({ onPress }) => (
  <TouchableOpacity onPress={() => onPress(MULTIPLICATION_OPERATOR)}>
    <Image style={Button.OPERATION_BUTTON} source={require('../assets/icons/multiply-button-2x.png')} />
  </TouchableOpacity>
);

export default MultiplyButton;
