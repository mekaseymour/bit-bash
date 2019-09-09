import React from 'react';
import Game from '../components/Game';
import generateGame from '../helpers/generateGame';

const PracticeScreen = props => {
  const gameProps = {
    context: props.screenProps.context,
    game: generateGame(props.navigation.getParam('level')),
    mode: 'practice',
    onGameWon: () => {},
    onExitScreen: 'PracticeModes',
    onNextGamePress: () => props.navigation.navigate('PracticeModes', { level: props.navigation.getParam('level') }),
  };

  return <Game {...gameProps} {...props} />;
};

export default PracticeScreen;
