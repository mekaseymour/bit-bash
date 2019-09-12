import React from 'react';
import { Dimensions, Platform, StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import { Colors, Typography } from '../styles';
import equationForDisplay from '../helpers/equationForDisplay';

const EquationDisplay = ({ equation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.equationText}>{equationForDisplay(equation)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 40,
    alignItems: 'center',
    marginVertical: 10,
    width: Dimensions.get('window').width,
  },
  equationText: {
    ...Typography.mainFont,
    color: Colors.gray,
    fontSize: 40,
    ...Platform.select({
      android: {
        lineHeight: 40,
      },
    }),
  },
});

EquationDisplay.propTypes = {
  equation: PropTypes.array.isRequired,
};

export default EquationDisplay;
