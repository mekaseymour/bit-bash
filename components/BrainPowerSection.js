import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Colors, Typography } from '../styles';

const BrainPowerSection = ({ brainPower, noIcon = false }) => {
  return (
    <View style={styles.brainPowerSection}>
      <Text style={styles.brainPowerText}>{`Brain Power: ${brainPower}`}</Text>
      <Image style={styles.brainIcon} source={require('../assets/icons/brain-2x.png')} />
    </View>
  );
};

export default BrainPowerSection;

const styles = StyleSheet.create({
  brainIcon: {
    height: 31,
    width: 36,
  },
  brainPowerText: {
    ...Typography.mainFont,
    color: Colors.blue,
    fontSize: 16,
    paddingRight: 10,
    alignSelf: 'center',
  },
  brainPowerSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});
