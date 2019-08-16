import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { Button } from '../styles';

const SubtractButton = () => (
  <TouchableOpacity>
    <Image style={Button.OPERATION_BUTTON} source={require('../assets/icons/subtract-button-2x.png')} />
  </TouchableOpacity>
);

export default SubtractButton;
