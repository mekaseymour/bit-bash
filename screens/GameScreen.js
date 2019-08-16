import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, Colors, Typography } from '../styles';

import { AddButton, NumberNode, PauseButton, SubtractButton, UndoButton } from '../components';
import generateNumberNodesData from '../helpers/generateNumberNodesData';

const GameScreen = ({ target, numbers }) => {
  const [numberNodesData, setNumberNodesData] = useState(null);

  useEffect(() => {
    setNumberNodesData(generateNumberNodesData(numbers));
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.topSectionContainer}>
        <View style={styles.placeholder} />
        <Text style={styles.targetNumber}>{target}</Text>
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
              spacing={{
                marginTop: Math.floor(Math.random() * 10) + 3,
                marginBottom: Math.floor(Math.random() * 10) + 3,
                marginLeft: Math.floor(Math.random() * 30) + 3,
                marginRight: Math.floor(Math.random() * 30) + 3,
              }}
            />
          ))}
      </View>
      <View style={styles.buttonsContainer}>
        <AddButton />
        <SubtractButton />
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
  },
  pauseButton: {
    marginBottom: 10,
  },
  placeholder: {
    width: Button.SMALL_BUTTON.width,
  },
  targetNumber: {
    ...Typography.mainFont,
    fontSize: 72,
    color: Colors.blue,
  },
  topSectionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default GameScreen;
