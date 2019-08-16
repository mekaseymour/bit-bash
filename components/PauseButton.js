import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { Button } from '../styles';

const PauseButton = ({ style }) => (
  <TouchableOpacity style={style}>
    <Image style={Button.SMALL_BUTTON} source={require('../assets/icons/pause-button-2x.png')} />
  </TouchableOpacity>
);

export default PauseButton;
