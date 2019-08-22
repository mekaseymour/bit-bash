import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import AddButton from './AddButton';
import SubtractButton from './SubtractButton';
import MultiplyButton from './MultiplyButton';
import DivideButton from './DivideButton';
import {
  ADD,
  determineDifficultyToBuild,
  DIFFICULTY_CONFIGS,
  DIVIDE,
  MULTIPLY,
  SUBTRACT,
} from '../helpers/generateGame';

const GameOperators = ({ difficulty, onOperatorButtonPress }) => {
  const [operators, setOperators] = useState(difficulty);

  if (difficulty) {
    const operatorsForDifficulty = DIFFICULTY_CONFIGS[determineDifficultyToBuild(difficulty)].operators;
    setOperators(operatorsForDifficulty);
  }

  return (
    <View style={styles.buttonsContainer}>
      {operators && operators.includes(ADD) && <AddButton onPress={onOperatorButtonPress} />}
      <SubtractButton onPress={onOperatorButtonPress} />
      <MultiplyButton onPress={onOperatorButtonPress} />
      <DivideButton onPress={onOperatorButtonPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default GameOperators;
