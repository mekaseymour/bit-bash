import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
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
    marginTop: 10,
    width: '100%',
  },
  equationText: {
    ...Typography.mainFont,
    color: Colors.gray,
    fontSize: 40,
  },
});

EquationDisplay.propTypes = {
  equation: PropTypes.array.isRequired,
};

export default EquationDisplay;
