import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, Colors, Typography } from '../styles';

import { AddButton, EquationDisplay, NumberNode, PauseButton, SubtractButton, UndoButton } from '../components';
import generateNumberNodesData from '../helpers/generateNumberNodesData';
import operations, { ADD, SUBTRACT, ADDITION_OPERATOR, SUBTRACTION_OPERATOR } from '../util/operations';

const VERTICAL_SPACING = Math.floor(Math.random() * 10) + 3;
const HORIZONTAL_SPACING = Math.floor(Math.random() * 30) + 3;

const GameScreen = ({ target, numbers }) => {
  const [equation, setEquation] = useState([]);
  const [numberNodesData, setNumberNodesData] = useState(null);
  const [total, setTotal] = useState(null);

  useEffect(() => {
    setNumberNodesData(generateNumberNodesData(numbers));
  }, []);

  const onNumberNodePress = num => {
    const equationIsEmpty = equation.length === 0;
    const equationHasOneNumberAndOperator = equation.length === 2;
    const equationIsCompleted = equation.length === 3;

    if (equationIsEmpty) {
      setEquation([num]);
    } else if (equationHasOneNumberAndOperator) {
      setEquation([...equation, num]);

      // evalutate equation & set total to result
      const operator = equation[1];

      switch (operator) {
        case ADDITION_OPERATOR:
          setTotal(operations[ADD](equation[0], num));
          break;
        case SUBTRACTION_OPERATOR:
          setTotal(operations[SUBTRACT](equation[0], num));
          break;
      }
    } else if (equationIsCompleted) {
      setEquation([num]);
    }
  };

  const onOperatorButtonPress = operator => {
    if (equation.length === 1) {
      setEquation([...equation, operator]);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topSectionContainer}>
        <View style={styles.placeholder} />
        <View>
          <Text style={styles.targetNumber}>{target}</Text>
          <View style={styles.totalContainer}>{total !== null && <Text style={styles.total}>{total}</Text>}</View>
          <EquationDisplay equation={equation} />
        </View>
        <View>
          <PauseButton style={styles.pauseButton} />
          <UndoButton />
        </View>
      </View>
      <View style={styles.nodesContainer}>
        {!!numberNodesData &&
          numberNodesData.map((data, i) => (
            <NumberNode
              key={`node=${i}`}
              data={data}
              onPress={() => onNumberNodePress(data.num)}
              spacing={{
                marginVertical: VERTICAL_SPACING,
                marginHorizontal: HORIZONTAL_SPACING,
              }}
            />
          ))}
      </View>
      <View style={styles.buttonsContainer}>
        <AddButton onPress={onOperatorButtonPress} />
        <SubtractButton onPress={onOperatorButtonPress} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 45,
    justifyContent: 'space-between',
  },
  nodesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    height: '60%',
  },
  pauseButton: {
    marginBottom: 10,
  },
  placeholder: {
    width: Button.SMALL_BUTTON.width,
  },
  targetNumber: {
    ...Typography.mainFont,
    ...Typography.large,
    color: Colors.blue,
    textAlign: 'center',
  },
  topSectionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  totalContainer: {
    height: 60,
  },
  total: {
    ...Typography.mainFont,
    ...Typography.large,
    color: Colors.gray,
    textAlign: 'center',
  },
});

export default GameScreen;
