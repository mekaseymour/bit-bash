import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import LevelButton from '../components/LevelButton';
import { Colors, Typography } from '../styles';

const MAX_LEVELS_TO_SHOW = 30;

const LevelsScreen = props => {
  const skipToLevel = props.navigation.getParam('skipToLevel');

  const [savedLevels, setSavedLevels] = useState(props.screenProps.context.completedLevels);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (skipToLevel) {
      navigateToGame(skipToLevel);
    } else {
      setIsLoading(false);
    }
  }, []);

  const isLevelUnlocked = (savedLevels, currentLevel) => currentLevel <= savedLevels.length + 1;
  const navigateToGame = currentLevel => props.navigation.navigate('Game', { level: currentLevel });

  const generateLevelsButtons = () => {
    return Array(MAX_LEVELS_TO_SHOW)
      .fill()
      .map((level, i) => {
        const levelNum = i + 1;
        const saved = savedLevels.find(l => l.id === levelNum);

        return (
          <LevelButton
            key={`level-${levelNum}`}
            level={levelNum}
            active={isLevelUnlocked(savedLevels, levelNum)}
            goToGame={() => navigateToGame(levelNum, saved)}
          />
        );
      });
  };

  if (isLoading) {
    return null;
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.brainPowerSection}>
          <Text style={styles.brainPowerText}>{`Brain Power: ${props.screenProps.context.brainPower}`}</Text>
          <Image style={styles.brainIcon} source={require('../assets/icons/brain-2x.png')} />
        </View>
        <View style={styles.levels}>{generateLevelsButtons()}</View>
      </View>
    );
  }
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
