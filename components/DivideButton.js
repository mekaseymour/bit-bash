import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { Button } from '../styles';
import { DIVISION_OPERATOR } from '../util/operations';

const DivideButton = ({ onPress }) => (
  <TouchableOpacity style={Button.operationButton} onPress={() => onPress(DIVISION_OPERATOR)}>
    <Text style={Button.operationButtonText}>÷</Text>
  </TouchableOpacity>
);

export default DivideButton;
