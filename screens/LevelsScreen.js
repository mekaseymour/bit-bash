import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import LevelButton from '../components/LevelButton';
import { Colors, Typography } from '../styles';

var games = require('../games.json');

const LevelsScreen = props => {
  const levels = games['games'];

  const generateLevelsButtons = () => {
    return levels.map((level, i) => (
      <LevelButton
        key={`level-${i + 1}`}
        level={i + 1}
        goToGame={() => props.navigation.navigate('Game', { game: level })}
      />
    ));
  };

  return (
    <View style={styles.container}>
      <View style={styles.brainPowerSection}>
        <Text style={styles.brainPowerText}>{`Brain Power: ${0}`}</Text>
        <Image style={styles.brainIcon} source={require('../assets/icons/brain-2x.png')} />
      </View>
      <View style={styles.levels}>{generateLevelsButtons()}</View>
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
  },
  brainPowerSection: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginRight: '15%',
    marginBottom: 10,
  },
  container: {
    flex: 1,
    marginTop: '15%',
    alignItems: 'center',
  },
  levels: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});

export default LevelsScreen;
