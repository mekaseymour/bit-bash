import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Colors, Typography } from '../styles';
import { IPHONE_8_OR_SMALLER } from '../util/constants';

const CustomizationOption = ({ data, onPress, selected, unlocked }) => {
  return (
    <View style={styles.customizationOption}>
      <TouchableOpacity onPress={() => onPress(data)}>
        <Image
          source={data.icon}
          style={IPHONE_8_OR_SMALLER ? { height: 60, width: 60 } : { height: 100, width: 100 }}
        />
      </TouchableOpacity>
      <View style={styles.textWrapper(selected)}>
        <Text style={styles.customizationText(unlocked)}>{data.name}</Text>
        {unlocked ? null : <Text style={styles.customizationText(unlocked)}>{`(${data.pointsToUnlock} pts)`}</Text>}
      </View>
    </View>
  );
};

export default CustomizationOption;

const styles = StyleSheet.create({
  customizationText: unlocked => ({
    ...Typography.mainFont,
    color: unlocked ? Colors.blue : Colors.gray,
    fontSize: 14,
    textAlign: 'center',
  }),
  customizationOption: {
    margin: 5,
    alignItems: 'center',
    flex: 1,
  },
  textWrapper: selected => ({
    marginTop: 8,
    borderWidth: 4,
    padding: 3,
    borderColor: selected ? Colors.green : 'transparent',
  }),
});
