import React, { useEffect, useState } from 'react';
import { Dimensions, Modal, StyleSheet, Text, View } from 'react-native';
import { AdMobInterstitial } from 'expo-ads-admob';

import { Button, Colors, Typography } from '../styles';
import generateNumberNodesData from '../helpers/generateNumberNodesData';
import handleNodesOperation from '../helpers/handleNodesOperation';
import getEarnedBrainPower from '../helpers/getEarnedBrainPower';
import saveBrainPower from '../helpers/saveBrainPower';
import generateGame from '../helpers/generateGame';
import { DIFFICULTY_CONFIGS } from '../helpers/getGameConfigsForLevel';
import saveCompletedLevel from '../helpers/saveCompletedLevel';
import levelWasAlreadyWon from '../helpers/levelWasAlreadyWon';
import saveFurthestSeenLevel from '../helpers/saveFurthestSeenLevel';

import { ADD, SUBTRACT, MULTIPLY, DIVIDE } from '../util/operations';
import { VERTICAL_SPACING, HORIZONTAL_SPACING, getMaxNodeSize } from '../util/nodes';
import { LEVELS_PER_SECTION, LEVELS_BETWEEN_ADS } from '../config/gameConfig';
import { GOOGLE_INTERSTITIAL_AD_UNIT_ID } from '../config';
import { IPHONE_8_OR_SMALLER } from '../util/constants';

import {
  AddButton,
  DivideButton,
  EquationDisplay,
  GameLostModal,
  GameWonModal,
  MultiplyButton,
  NumberNode,
  PauseButton,
  PauseModal,
  SubtractButton,
  UndoButton,
} from '../components';

const GameScreen = ({ navigation, screenProps }) => {
  const context = screenProps.context;

  const [level, setLevel] = useState(navigation.getParam('level'));
  const [game, setGame] = useState({});
  const [equation, setEquation] = useState([]);
  const [nodesData, setNodesData] = useState([]);
  const [total, setTotal] = useState(null);
  const [gameHistory, setGameHistory] = useState([]);
  const [gamePaused, setGamePaused] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [gameLost, setGameLost] = useState(false);
  const [earnedBrainPower, setEarnedBrainPower] = useState(0);
  const [levelHasNeverBeforeBeenWon] = useState(!levelWasAlreadyWon(context.completedLevels, level));
  const [operators, setOperators] = useState([]);
  const [maxNodeSize, setMaxNodeSize] = useState(0);

  useEffect(() => {
    const savedGame = context.completedLevels.find(l => l.id === level);
    const furthestSeenLevel = context.furthestSeenLevel.id === level ? context.furthestSeenLevel : null;
    const game = savedGame || furthestSeenLevel || generateGame(level);
    const { difficulty, target, nums } = game;
    const currentGame = { ...game, id: level };

    setGame(currentGame);
    setOperators(DIFFICULTY_CONFIGS[difficulty].operators);

    // add selected property to nodes
    setNodesData(
      generateNumberNodesData(nums).map(node => {
        node.selected = false;
        return node;
      })
    );

    if (levelHasNeverBeforeBeenWon) {
      context.setFurthestSeenLevel(currentGame);
      saveFurthestSeenLevel(currentGame);
    }

    setMaxNodeSize(getMaxNodeSize(nums.length));

    return () => AdMobInterstitial.removeEventListener('interstitialDidClose');
  }, []);

  const pauseGame = () => setGamePaused(true);
  const resumeGame = () => setGamePaused(false);
  const winGame = () => setGameWon(true);
  const loseGame = () => setGameLost(true);

  const equationIsExpectingOperator = () => equation.length === 1;
  const equationIsExpectingLeftOperand = () => equation.length === 0 || equation.length === 3;
  const equationIsExpectingRightOperand = () => equation.length === 2;

  const isFinalLevelInSection = () => level % LEVELS_PER_SECTION === 0;

  const isValidNodePress = node => !equationIsExpectingOperator() || node.selected;
  const toggledNode = node => ({ ...node, selected: !node.selected });

  const nodesWithUpdatedNode = node => {
    const nodes = [...nodesData];
    const positionOfNodeToUpdate = nodes.findIndex(nodeFromState => node.id === nodeFromState.id);

    nodes[positionOfNodeToUpdate] = node;
    return nodes;
  };

  const deselectNodes = nodes =>
    updateGameState([
      [
        setNodesData,
        nodes.map(node => {
          if (node.selected) {
            return { ...node, selected: false };
          } else {
            return node;
          }
        }),
      ],
    ]);

  const handleNodeDeselect = () => {
    if (equationIsExpectingRightOperand() || equationIsExpectingOperator()) {
      updateGameState([[setEquation, []]]);
    }
  };

  const handleNodeSelect = node => {
    if (equationIsExpectingLeftOperand()) {
      setEquation([node]);
    } else if (equationIsExpectingRightOperand()) {
      // evalutate equation, update nodes, set total to result
      const operationResolution = handleNodesOperation(nodesData, [...equation, node], maxNodeSize);
      const nodesAfterOperation = operationResolution[0];

      updateGameState([
        [setTotal, operationResolution[1]],
        [setEquation, [...equation, node]],
        [setNodesData, nodesAfterOperation],
      ]);
      deselectNodes(nodesAfterOperation);
      checkForCompletedGame(nodesAfterOperation);
    }
  };

  const addGameToCompletedLevels = () => {
    const updatedCompletedLevels = [...screenProps.context.completedLevels];
    updatedCompletedLevels.push(game);
    screenProps.context.setCompletedLevels(updatedCompletedLevels);
    saveCompletedLevel(game);
  };

  const addToTotalEarnedBrainPower = () => {
    const brainPowerEarnedInLevel = getEarnedBrainPower(game.difficulty);
    const newTotalBrainPower = screenProps.context.brainPower + brainPowerEarnedInLevel;

    setEarnedBrainPower(brainPowerEarnedInLevel);

    screenProps.context.setBrainPower(newTotalBrainPower);
    saveBrainPower(newTotalBrainPower);
  };

  const setNextLevelAsSeen = () => {
    const nextGame = generateGame(level + 1);
    context.setFurthestSeenLevel({ ...nextGame, id: level + 1 });
    navigateToLevelsWithCompletedSection();
  };

  const gameIsInCompletedState = nodes => nodes.length === 1;
  const gameIsInWinningState = nodes => gameIsInCompletedState(nodes) && nodes[0].num === game.target;

  const handleGameCompletion = nodes => {
    if (gameIsInWinningState(nodes)) {
      winGame();

      if (levelHasNeverBeforeBeenWon) {
        addGameToCompletedLevels();

        /* (only updates brain power if level was already completed) */
        addToTotalEarnedBrainPower();

        if (isFinalLevelInSection()) {
          setNextLevelAsSeen();
        } else {
          context.setFurthestSeenLevel(game);
        }
      }
    } else {
      loseGame();
    }
  };

  const checkForCompletedGame = remainingNodes => {
    if (gameIsInCompletedState(remainingNodes)) {
      context.setLevelsCompletedDuringSession(context.levelsCompletedDuringSession + 1);

      const afterShowAdAction = () => handleGameCompletion(remainingNodes);

      if (shouldShowAd()) {
        showAd(afterShowAdAction);
      } else {
        handleGameCompletion(remainingNodes);
      }
    }
  };

  const onNodePress = node => {
    if (isValidNodePress(node)) {
      const pressedNode = toggledNode(node);
      updateGameState([[setNodesData, nodesWithUpdatedNode(pressedNode)]]);

      const pressHasDeselectedNode = pressedNode.selected === false;

      if (pressHasDeselectedNode) {
        handleNodeDeselect();
      } else {
        handleNodeSelect(pressedNode);
      }
    }
  };

  const onOperatorButtonPress = operator => {
    if (equation.length === 1) {
      updateGameState([[setEquation, [...equation, operator]]]);
    } else if (equation.length === 2) {
      updateGameState([[setEquation, [equation[0], operator]]]);
    }
  };

  const onUndoButtonPress = () => {
    const history = [...gameHistory];
    const previousState = history.pop();

    if (previousState && previousState.equation) {
      setEquation(previousState.equation);
    }

    if (previousState && previousState.nodesData) {
      setNodesData(previousState.nodesData);
    }

    if (previousState && previousState.hasOwnProperty('total')) {
      setTotal(previousState.total);
    }

    setGameHistory(history);
  };

  /* takes array of arrays */
  const updateGameState = setStateFunctionsAndData => {
    snapshotCurrentState();
    setStateFunctionsAndData.forEach(([setStateFunction, data]) => setStateFunction(data));
  };

  const snapshotCurrentState = () => {
    const newHistory = [...gameHistory, { equation, nodesData, total }];
    setGameHistory(newHistory);
  };

  const resetGame = () => {
    setTotal(null);
    setEquation([]);
    setNodesData(gameHistory[0].nodesData);
    setGameLost(false);
    setGameHistory([]);
  };

  const shouldShowAd = () => {
    return context.levelsCompletedDuringSession > 0 && context.levelsCompletedDuringSession % LEVELS_BETWEEN_ADS === 0;
  };

  const showAd = async continueGame => {
    try {
      AdMobInterstitial.setAdUnitID(GOOGLE_INTERSTITIAL_AD_UNIT_ID);
      AdMobInterstitial.setTestDeviceID('EMULATOR');
      await AdMobInterstitial.requestAdAsync();
      await AdMobInterstitial.showAdAsync();
      AdMobInterstitial.addEventListener('interstitialDidClose', continueGame);
    } catch (error) {
      console.log('error from showAd', error);
      continueGame();
    }
  };

  const navigateToLevelsScreen = () => navigation.navigate('Levels');
  const navigateToNextLevel = () => navigation.navigate('Levels', { skipToLevel: level + 1 });
  const navigateToLevelsWithCompletedSection = () => navigation.navigate('Levels', { completedSection: true });

  return (
    <View style={styles.container}>
      <PauseModal visible={gamePaused} onResumePress={resumeGame} onExitPress={navigateToLevelsScreen} />
      <GameLostModal visible={gameLost} onResetPress={resetGame} onExitPress={navigateToLevelsScreen} />
      <GameWonModal
        visible={gameWon}
        earnedBrainPower={earnedBrainPower}
        onNextLevelPress={navigateToNextLevel}
        onExitPress={navigateToLevelsScreen}
      />
      <View style={styles.topSectionContainer}>
        <View style={styles.placeholder} />
        <View style={styles.topSectionNumbers}>
          <Text style={styles.targetNumber}>{game.target}</Text>
          <View style={styles.totalContainer}>{total !== null && <Text style={styles.total}>{total}</Text>}</View>
        </View>
        <View style={styles.topSectionButtons}>
          <PauseButton style={styles.pauseButton} onPress={pauseGame} />
          <UndoButton onPress={onUndoButtonPress} />
        </View>
      </View>
      <EquationDisplay equation={equation} />
      <View style={styles.nodesContainer}>
        <View style={styles.nodesWrapper}>
          {!!nodesData &&
            nodesData.map((data, i) => (
              <NumberNode
                key={`node=${i}`}
                data={data}
                onPress={() => onNodePress(data)}
                spacing={{
                  marginHorizontal: data.spacing[0],
                  marginVertical: data.spacing[1],
                }}
              />
            ))}
        </View>
      </View>
      <View style={styles.buttonsContainer}>
        {operators.includes(ADD) && <AddButton onPress={onOperatorButtonPress} />}
        {operators.includes(SUBTRACT) && <SubtractButton onPress={onOperatorButtonPress} />}
        {operators.includes(MULTIPLY) && <MultiplyButton onPress={onOperatorButtonPress} />}
        {operators.includes(DIVIDE) && <DivideButton onPress={onOperatorButtonPress} />}
      </View>
    </View>
  );
};

const topSideSectionWidth = Dimensions.get('window').width / 4;
const topMidSectionWidth = Dimensions.get('window').width / 2;

const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 45,
    paddingBottom: IPHONE_8_OR_SMALLER ? 15 : 25,
    justifyContent: 'space-between',
  },
  nodesContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nodesWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pauseButton: {
    marginBottom: 10,
  },
  placeholder: {
    width: topSideSectionWidth,
  },
  targetNumber: {
    ...Typography.mainFont,
    ...Typography.large,
    color: Colors.blue,
    textAlign: 'center',
  },
  topSectionContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  topSectionButtons: {
    width: topSideSectionWidth,
    alignItems: 'flex-end',
    paddingRight: 20,
  },
  topSectionNumbers: {
    width: topMidSectionWidth,
  },
  totalContainer: {
    height: 60,
  },
  total: {
    ...Typography.mainFont,
    ...Typography.large,
    color: Colors.gray,
    textAlign: 'center',
  },
});

export default GameScreen;
