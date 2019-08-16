import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors, Typography } from '../styles';

import NumberNode from '../components/NumberNode';
import generateNumberNodesData from '../helpers/generateNumberNodesData';

const GameScreen = ({ target, numbers }) => {
  const [numberNodesData, setNumberNodesData] = useState(null);

  useEffect(() => {
    setNumberNodesData(generateNumberNodesData(numbers));
  }, []);

  return (
    <View>
      <Text style={styles.targetNumber}>{target}</Text>
      {!!numberNodesData && numberNodesData.map((data, i) => <NumberNode key={`node=${i}`} data={data} />)}
    </View>
  );
};

const styles = StyleSheet.create({
  targetNumber: {
    ...Typography.mainFont,
    fontSize: 72,
    color: Colors.blue,
  },
});

export default GameScreen;
