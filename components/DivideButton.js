import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { Button } from '../styles';
import { DIVISION_OPERATOR } from '../util/operations';

const DivideButton = ({ onPress }) => (
  <TouchableOpacity onPress={() => onPress(DIVISION_OPERATOR)}>
    <Image style={Button.OPERATION_BUTTON} source={require('../assets/icons/divide-button-2x.png')} />
  </TouchableOpacity>
);

export default DivideButton;
