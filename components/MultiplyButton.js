import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { Button } from '../styles';
import { MULTIPLICATION_OPERATOR } from '../util/operations';

const MultiplyButton = ({ onPress }) => (
  <TouchableOpacity style={Button.operationButton} onPress={() => onPress(MULTIPLICATION_OPERATOR)}>
    <Text style={Button.operationButtonText}>×</Text>
  </TouchableOpacity>
);

export default MultiplyButton;
