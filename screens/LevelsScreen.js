import React, { useEffect, useState, useRef } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LevelButton } from '../components';
import { Colors, Typography } from '../styles';
import getNumOfLevelsToDisplay from '../helpers/getNumOfLevelsToDisplay';
import CompletedSectionModal from '../components/CompletedSectionModal';
import saveBrainPower from '../helpers/saveBrainPower';
import { BRAIN_POWER_AWARDED_FOR_SECTION_COMPLETION } from '../config/gameConfig';
import ScreenTopSection from '../components/ScreenTopSection';

const LEVEL_ICONS_PER_ROW = 4;

const LevelsScreen = props => {
  const skipToLevel = props.navigation.getParam('skipToLevel');
  const sectionCompleted = props.navigation.getParam('completedSection');

  const [savedLevels, setSavedLevels] = useState(props.screenProps.context.completedLevels);
  const [isLoading, setIsLoading] = useState(true);
  const [furthestSeenLevel, setFurthestSeenLevel] = useState(props.screenProps.context.furthestSeenLevel.id || 1);
  const [showCompletedSectionModal, setShowCompletedSectionModal] = useState(false);

  const flatlistRef = useRef();

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

  const levelIsUpNext = (savedLevels, currentLevel) => currentLevel === savedLevels.length + 1;
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
          index: i,
          level: levelNum,
          active: isLevelUnlocked(savedLevels, levelNum),
          isUpNext: levelIsUpNext(savedLevels, levelNum),
          goToGame: () => navigateToGame(levelNum, saved),
        };
      });
  };

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
          ref={flatlistRef}
          initialScrollIndex={
            furthestSeenLevel > LEVEL_ICONS_PER_ROW ? Math.floor(furthestSeenLevel / LEVEL_ICONS_PER_ROW) : 1
          }
          onScrollToIndexFailed={() => {}}
          contentContainerStyle={styles.flatListContainer}
          numColumns={LEVEL_ICONS_PER_ROW}
          data={listData}
          renderItem={({ item, index }) => {
            if (item.comp) {
              return item.comp;
            } else {
              return (
                <LevelButton
                  key={item.key}
                  index={index}
                  level={item.level}
                  active={item.active}
                  goToGame={item.goToGame}
                  isUpNext={item.isUpNext}
                />
              );
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
  levels: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});

export default LevelsScreen;
