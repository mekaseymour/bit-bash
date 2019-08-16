import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { Button } from '../styles';

const UndoButton = () => (
  <TouchableOpacity>
    <Image style={Button.SMALL_BUTTON} source={require('../assets/icons/undo-button-2x.png')} />
  </TouchableOpacity>
);

export default UndoButton;
