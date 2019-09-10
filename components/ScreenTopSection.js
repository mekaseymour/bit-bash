import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import BackButton from './BackButton';
import { Colors, Typography } from '../styles';

const ScreenTopSection = ({ backNavigation, brainPower }) => {
  return (
    <View style={styles.topSection}>
      <BackButton onPress={backNavigation} />
      <View style={styles.brainPowerSection}>
        <Text style={styles.brainPowerText}>{`Brain Power: ${brainPower}`}</Text>
        <Image style={styles.brainIcon} source={require('../assets/icons/brain-2x.png')} />
      </View>
    </View>
  );
};

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
  topSection: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 50,
    marginBottom: 10,
    height: '13%',
    paddingHorizontal: 20,
  },
});

export default ScreenTopSection;
