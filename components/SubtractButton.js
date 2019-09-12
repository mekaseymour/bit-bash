import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { Button } from '../styles';
import { SUBTRACTION_OPERATOR } from '../util/operations';

const SubtractButton = ({ onPress }) => (
  <TouchableOpacity style={Button.operationButton} onPress={() => onPress(SUBTRACTION_OPERATOR)}>
    <Text style={Button.operationButtonText}>-</Text>
  </TouchableOpacity>
);

export default SubtractButton;
