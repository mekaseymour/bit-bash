import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { Button } from '../styles';

const PauseButton = ({ style, onPress }) => (
  <TouchableOpacity style={style} onPress={onPress}>
    <Image style={Button.SMALL_BUTTON} source={require('../assets/icons/pause-button-2x.png')} />
  </TouchableOpacity>
);

export default PauseButton;
