import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { Button } from '../styles';

const AddButton = () => (
  <TouchableOpacity>
    <Image style={Button.OPERATION_BUTTON} source={require('../assets/icons/add-button-2x.png')} />
  </TouchableOpacity>
);

export default AddButton;
