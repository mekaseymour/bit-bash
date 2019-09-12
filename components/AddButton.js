import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { Button } from '../styles';
import { ADDITION_OPERATOR } from '../util/operations';

const AddButton = ({ onPress }) => (
  <TouchableOpacity style={Button.operationButton} onPress={() => onPress(ADDITION_OPERATOR)}>
    <Text style={Button.operationButtonText}>+</Text>
  </TouchableOpacity>
);

export default AddButton;
