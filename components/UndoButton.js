import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { Button } from '../styles';

const UndoButton = ({ onPress }) => (
  <TouchableOpacity style={Button.gameControlsButton} onPress={onPress}>
    <Image style={{ height: 30, width: 30 }} source={require('../assets/icons/undo-2x.png')} />
  </TouchableOpacity>
);

export default UndoButton;
