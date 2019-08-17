import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import { Button, Colors, Typography } from '../styles';

import {
  AddButton,
  DivideButton,
  EquationDisplay,
  MultiplyButton,
  NumberNode,
  PauseButton,
  SubtractButton,
  UndoButton,
} from '../components';
import handleNodesOperation from '../helpers/handleNodesOperation';

const VERTICAL_SPACING = Math.floor(Math.random() * 10) + 3;
const HORIZONTAL_SPACING = Math.floor(Math.random() * 30) + 3;

const GameScreen = ({ target, nodes }) => {
  const [equation, setEquation] = useState([]);
  const [nodesData, setNodesData] = useState(nodes);
  const [total, setTotal] = useState(null);

  const onNumberNodePress = data => {
    const equationIsEmpty = equation.length === 0;
    const equationHasOneNumberAndOperator = equation.length === 2;
    const completeEquationOnDisplay = equation.length === 3;

    if (equationIsEmpty) {
      setEquation([data]);
    } else if (equationHasOneNumberAndOperator) {
      setEquation([...equation, data]);

      // evalutate equation, update nodes, set total to result
      const operationResolution = handleNodesOperation(nodesData, [...equation, data]);

      setNodesData(operationResolution[0]);
      setTotal(operationResolution[1]);
    } else if (completeEquationOnDisplay) {
      setEquation([data]);
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
        {!!nodesData &&
          nodesData.map((data, i) => (
            <NumberNode
              key={`node=${i}`}
              data={data}
              onPress={() => onNumberNodePress(data)}
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
        <MultiplyButton onPress={onOperatorButtonPress} />
        <DivideButton onPress={onOperatorButtonPress} />
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

GameScreen.propTypes = {
  nodes: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.number, size: PropTypes.num, num: PropTypes.number }))
    .isRequired,
  target: PropTypes.number,
};

export default GameScreen;
