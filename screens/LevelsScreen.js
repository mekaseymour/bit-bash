import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LevelButton from '../components/LevelButton';
import NextLevelsGroupButton from '../components/NextLevelsGroupButton';
import { Colors, Typography } from '../styles';
import getNumOfLevelsToDisplay from '../helpers/getNumOfLevelsToDisplay';

const LevelsScreen = props => {
  const skipToLevel = props.navigation.getParam('skipToLevel');

  const [savedLevels, setSavedLevels] = useState(props.screenProps.context.completedLevels);
  const [isLoading, setIsLoading] = useState(true);
  const [furthestSeenLevel, setFurthestSeenLevel] = useState(null);

  useEffect(() => {
    if (skipToLevel) {
      navigateToGame(skipToLevel);
    } else {
      setIsLoading(false);
    }

    setFurthestSeenLevel(props.screenProps.context.furthestSeenLevel.id || 1);
  }, []);

  const isLevelUnlocked = (savedLevels, currentLevel) => currentLevel <= savedLevels.length + 1;
  const navigateToGame = currentLevel => props.navigation.navigate('Game', { level: currentLevel });
  const navigateHome = () => props.navigation.navigate('Home');

  const generateLevelsButtons = () => {
    return Array(getNumOfLevelsToDisplay(furthestSeenLevel))
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
      <View>
        <View style={styles.topSection}>
          <TouchableOpacity onPress={navigateHome}>
            <Image style={styles.homeIcon} source={require('../assets/icons/home-icon-button-2x.png')} />
          </TouchableOpacity>
          <View style={styles.brainPowerSection}>
            <Text style={styles.brainPowerText}>{`Brain Power: ${props.screenProps.context.brainPower}`}</Text>
            <Image style={styles.brainIcon} source={require('../assets/icons/brain-2x.png')} />
          </View>
        </View>
        <ScrollView alwaysBounceVertical={true} pagingEnabled={true}>
          <View style={styles.levels}>{generateLevelsButtons()}</View>
          <Text style={styles.continuesText}>The Journey Continues...</Text>
        </ScrollView>
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
    alignSelf: 'center',
  },
  brainPowerSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  topSection: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 50,
    marginBottom: 10,
    height: '13%',
    paddingHorizontal: 20,
  },
  continuesText: {
    ...Typography.mainFont,
    color: Colors.gray,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  homeIcon: {
    height: 45,
    width: 45,
  },
  levels: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});

export default LevelsScreen;
