import React from 'react';
import { Image, TouchableOpacity } from 'react-native';

const BackButton = ({ onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <Image style={{ height: 45, width: 45 }} source={require('../assets/icons/home-icon-button-2x.png')} />
  </TouchableOpacity>
);

export default BackButton;
