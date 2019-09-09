import React, { useEffect, useState } from 'react';

import generateGame from '../helpers/generateGame';
import saveCompletedLevel from '../helpers/saveCompletedLevel';
import levelWasAlreadyWon from '../helpers/levelWasAlreadyWon';
import saveFurthestSeenLevel from '../helpers/saveFurthestSeenLevel';
import { BrainPowerHelpers } from '../helpers';

import { LEVELS_PER_SECTION } from '../config/gameConfig';

import Game from '../components/Game';

const GameScreen = props => {
  const { navigation, screenProps } = props;
  const { context } = screenProps;

  const [game, setGame] = useState(null);
  const [level, setLevel] = useState(navigation.getParam('level'));
  const [levelHasNeverBeforeBeenWon] = useState(!levelWasAlreadyWon(context.completedLevels, level));

  useEffect(() => {
    const savedGame = context.completedLevels.find(l => l.id === level);
    const furthestSeenLevel = context.furthestSeenLevel.id === level ? context.furthestSeenLevel : null;
    const savedOrGeneratedGame = savedGame || furthestSeenLevel || generateGame(level);
    const currentGame = { ...savedOrGeneratedGame, id: level };
    setGame(currentGame);

    if (isFirstTimeLevelHasBeenSeen) {
      context.setFurthestSeenLevel(currentGame);
      saveFurthestSeenLevel(currentGame);
    }
  }, []);

  const isFirstTimeLevelHasBeenSeen = context.furthestSeenLevel.id ? level > context.furthestSeenLevel.id : true;
  const nextLevelHasNeverBeenSeen = level + 1 > context.furthestSeenLevel.id;
  const isFinalLevelInSection = () => level % LEVELS_PER_SECTION === 0;

  const addGameToCompletedLevels = () => {
    const updatedCompletedLevels = [...screenProps.context.completedLevels];
    updatedCompletedLevels.push({ ...game, id: level });
    screenProps.context.setCompletedLevels(updatedCompletedLevels);
    saveCompletedLevel(game);
  };

  const setNextLevelAsSeen = () => {
    const nextGame = generateGame(level + 1);
    context.setFurthestSeenLevel({ ...nextGame, id: level + 1 });
    navigateToLevelsWithCompletedSection();
  };

  const navigateToLevelsScreen = () => navigation.navigate('Levels');
  const navigateToNextLevel = () => navigation.navigate('Levels', { skipToLevel: level + 1 });
  const navigateToLevelsWithCompletedSection = () => navigation.navigate('Levels', { completedSection: true });

  const onGameWon = () => {
    if (levelHasNeverBeforeBeenWon) {
      addGameToCompletedLevels();

      if (isFinalLevelInSection()) {
        if (nextLevelHasNeverBeenSeen) {
          setNextLevelAsSeen();
        }
      }
    }
  };

  const gameProps = {
    context: props.screenProps.context,
    game: game,
    levelHasNeverBeforeBeenWon: levelHasNeverBeforeBeenWon,
    mode: 'game',
    onGameWon: onGameWon,
    onExitScreen: 'Levels',
    onNextGamePress: navigateToNextLevel,
  };

  return game ? <Game {...gameProps} {...props} /> : null;
};

export default GameScreen;
