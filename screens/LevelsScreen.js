import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LevelButton } from '../components';
import { Colors, Typography } from '../styles';
import getNumOfLevelsToDisplay from '../helpers/getNumOfLevelsToDisplay';
import CompletedSectionModal from '../components/CompletedSectionModal';
import saveBrainPower from '../helpers/saveBrainPower';
import { BRAIN_POWER_AWARDED_FOR_SECTION_COMPLETION } from '../config/gameConfig';
import ScreenTopSection from '../components/ScreenTopSection';

const LevelsScreen = props => {
  const skipToLevel = props.navigation.getParam('skipToLevel');
  const sectionCompleted = props.navigation.getParam('completedSection');

  const [savedLevels, setSavedLevels] = useState(props.screenProps.context.completedLevels);
  const [isLoading, setIsLoading] = useState(true);
  const [furthestSeenLevel, setFurthestSeenLevel] = useState(props.screenProps.context.furthestSeenLevel.id || 1);
  const [showCompletedSectionModal, setShowCompletedSectionModal] = useState(false);

  useEffect(() => {
    if (skipToLevel) {
      navigateToGame(skipToLevel);
    } else {
      setIsLoading(false);
    }

    if (sectionCompleted) {
      setShowCompletedSectionModal(true);
    }
  }, []);

  const isLevelUnlocked = (savedLevels, currentLevel) => currentLevel <= savedLevels.length + 1;
  const navigateToGame = currentLevel => props.navigation.navigate('Game', { level: currentLevel });
  const navigateHome = () => props.navigation.navigate('Home');
  const hideCompletedSectionModal = () => setShowCompletedSectionModal(false);

  const awardSectionCompletedBrainPower = () => {
    const newTotalBrainPower = props.screenProps.context.brainPower + BRAIN_POWER_AWARDED_FOR_SECTION_COMPLETION;

    props.screenProps.context.setBrainPower(newTotalBrainPower);
    saveBrainPower(newTotalBrainPower);
  };

  const onSectionCompletedModalClose = () => {
    awardSectionCompletedBrainPower();
    hideCompletedSectionModal();
  };

  const generateListData = () => {
    return Array(getNumOfLevelsToDisplay(furthestSeenLevel))
      .fill()
      .map((level, i) => {
        const levelNum = i + 1;
        const saved = savedLevels.find(l => l.id === levelNum);

        return {
          key: `level-${levelNum}`,
          level: levelNum,
          active: isLevelUnlocked(savedLevels, levelNum),
          goToGame: () => navigateToGame(levelNum, saved),
        };
      });
  };

  const initialRowIndex = () => (furthestSeenLevel > 4 ? Math.floor(furthestSeenLevel / 4) : 1);

  if (isLoading) {
    return null;
  } else {
    const listData = generateListData();
    listData.push({
      key: 'continuous-indicator',
      comp: (
        <View style={styles.continuousIndicator}>
          <Text style={styles.continuousIndicatorText}>. . .</Text>
        </View>
      ),
    });

    return (
      <View style={styles.container}>
        <CompletedSectionModal visible={showCompletedSectionModal} onAcknowledgePress={onSectionCompletedModalClose} />
        <ScreenTopSection backNavigation={navigateHome} brainPower={props.screenProps.context.brainPower} />
        <FlatList
          contentContainerStyle={styles.flatListContainer}
          numColumns={4}
          data={listData}
          renderItem={({ item }) => {
            if (item.comp) {
              return item.comp;
            } else {
              return <LevelButton key={item.key} level={item.level} active={item.active} goToGame={item.goToGame} />;
            }
          }}
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatListContainer: {
    width: '100%',
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  continuousIndicator: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 62,
    width: 70,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  continuousIndicatorText: {
    ...Typography.mainFont,
    color: Colors.gray,
    textAlign: 'center',
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
