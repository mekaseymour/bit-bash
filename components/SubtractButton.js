import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { Button } from '../styles';
import { SUBTRACTION_OPERATOR } from '../util/operations';

const SubtractButton = ({ onPress }) => (
  <TouchableOpacity onPress={() => onPress(SUBTRACTION_OPERATOR)}>
    <Image style={Button.OPERATION_BUTTON} source={require('../assets/icons/subtract-button-2x.png')} />
  </TouchableOpacity>
);

export default SubtractButton;
