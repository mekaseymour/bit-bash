import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import BackButton from './BackButton';
import { Colors, Typography } from '../styles';
import { IPHONE_8_OR_SMALLER } from '../util/constants';
import BrainPowerSection from './BrainPowerSection';

const ScreenTopSection = ({ backNavigation, brainPower }) => {
  return (
    <View style={styles.topSection}>
      <BackButton onPress={backNavigation} />
      <BrainPowerSection brainPower={brainPower} />
    </View>
  );
};

const styles = StyleSheet.create({
  topSection: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: IPHONE_8_OR_SMALLER ? 30 : 50,
    marginBottom: 10,
    height: '13%',
    paddingHorizontal: 20,
  },
});

export default ScreenTopSection;
