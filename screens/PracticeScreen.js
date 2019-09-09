import React from 'react';
import Game from '../components/Game';
import generateGame from '../helpers/generateGame';

const PracticeScreen = props => {
  const gameProps = {
    context: props.screenProps.context,
    game: generateGame(props.navigation.getParam('level')),
    mode: 'practice',
    onGameCompleted: () => {
      props.screenProps.context.setLevelsPlayedBetweenAds(props.screenProps.context.levelsPlayedBetweenAds + 1);
    },
    onGameWon: () => {},
    onExitScreen: 'PracticeModes',
    onNextGamePress: () => props.navigation.navigate('PracticeModes', { level: props.navigation.getParam('level') }),
  };

  return <Game {...gameProps} {...props} />;
};

export default PracticeScreen;
