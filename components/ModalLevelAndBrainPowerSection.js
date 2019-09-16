import React from 'react';
import { Text, View } from 'react-native';
import { Modal as ModalStyles } from '../styles';

const ModalLevelAndBrainPowerSection = ({ brainPower, level, mode }) => (
  <View>
    {mode !== 'practice' ? <Text style={ModalStyles.topSectionText}>{`Level: ${level}`}</Text> : null}
    <Text style={ModalStyles.topSectionText}>{`Brain Power: ${brainPower}`}</Text>
  </View>
);

export default ModalLevelAndBrainPowerSection;
