import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { Button } from '../styles';
import { ADDITION_OPERATOR } from '../util/operations';

const AddButton = ({ onPress }) => (
  <TouchableOpacity onPress={() => onPress(ADDITION_OPERATOR)}>
    <Image style={Button.OPERATION_BUTTON} source={require('../assets/icons/add-button-2x.png')} />
  </TouchableOpacity>
);

export default AddButton;
