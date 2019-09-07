import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { Button } from '../styles';

const PauseButton = ({ onPress }) => (
  <TouchableOpacity style={Button.gameControlsButton} onPress={onPress}>
    <Image style={{ height: 25, width: 25 }} source={require('../assets/icons/pause-2x.png')} />
  </TouchableOpacity>
);

export default PauseButton;
