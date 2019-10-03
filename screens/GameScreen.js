import React, { useEffect, useState } from 'react';

import generateGame from '../helpers/generateGame';
import saveNewlyCompletedLevel from '../helpers/saveNewlyCompletedLevel';
import levelWasAlreadyWon from '../helpers/levelWasAlreadyWon';
import saveFurthestSeenLevel from '../helpers/saveFurthestSeenLevel';
import { BrainPowerHelpers, LevelsHelpers } from '../helpers';
import isFinalLevelInSection from '../helpers/isFinalLevelInSection';
import isFirstLevelInSection from '../helpers/isFirstLevelInSection';
import isFirstTimeLevelHasBeenSeen from '../helpers/isFirstTimeLevelHasBeenSeen';

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

    if (isFirstTimeLevelHasBeenSeen(context, level)) {
      context.setFurthestSeenLevel(currentGame);
      saveFurthestSeenLevel(currentGame);
    }
  }, []);

  const nextLevelHasNeverBeenSeen = level + 1 > context.furthestSeenLevel.id;

  const addGameToCompletedLevels = () => {
    const updatedCompletedLevels = [...screenProps.context.completedLevels];
    updatedCompletedLevels.push({ ...game, id: level });
    screenProps.context.setCompletedLevels(updatedCompletedLevels);
    saveNewlyCompletedLevel(game);
  };

  const navigateToLevelsScreen = () => navigation.navigate('Levels');
  const navigateToNextLevel = () => navigation.navigate('Levels', { skipToLevel: level + 1 });
  const navigateToLevelsWithCompletedSection = () => navigation.navigate('Levels', { completedSection: true });

  const updateGameState = game => setGame(game);

  const onGameWon = () => {
    if (levelHasNeverBeforeBeenWon) {
      addGameToCompletedLevels();

      if (isFinalLevelInSection(level)) {
        if (nextLevelHasNeverBeenSeen) {
          navigateToLevelsWithCompletedSection();
        }
      }
    } else {
      LevelsHelpers.updateAlreadyCompletedLevel(context, game);
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
    onUnlockHint: updateGameState,
  };

  return game ? <Game {...gameProps} {...props} /> : null;
};

export default GameScreen;
