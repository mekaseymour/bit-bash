import React, { useEffect, useState } from 'react';
import { Dimensions, Platform, StyleSheet, Text, View } from 'react-native';
import { AdMobInterstitial } from 'expo-ads-admob';

import { IPHONE_8_OR_SMALLER } from '../util/constants';
import {
  AdHelpers,
  BrainPowerHelpers,
  GameStateHelpers,
  generateNumberNodesData,
  handleNodesOperation,
} from '../helpers';
import { DIFFICULTY_CONFIGS } from '../helpers/getGameConfigsForLevel';
import { BRAIN_POWER_REQUIRED_TO_UNLOCK_HINT, BRAIN_POWER_AWARDED_FOR_PRACTICE_GAME } from '../config/gameConfig';
import { ADD, SUBTRACT, MULTIPLY, DIVIDE } from '../util/operations';
import { getMaxNodeSize } from '../util/nodes';
import persistGameChanges from '../helpers/persistGameChanges';
import HowToModal from '../components/HowToModal';

import {
  AddButton,
  DivideButton,
  EquationDisplay,
  GameLostModal,
  GameWonModal,
  HelpButton,
  HintModal,
  MultiplyButton,
  NumberNode,
  PauseButton,
  PauseModal,
  SubtractButton,
  UndoButton,
} from './index';
import { Colors, Typography } from '../styles';

const Game = props => {
  const {
    context,
    game,
    levelHasNeverBeforeBeenWon,
    mode,
    navigation,
    onExitScreen,
    onGameWon,
    onNextGamePress,
    onUnlockHint,
  } = props;

  /* GAME ELEMENTS */
  const [gameState, setGameState] = useState(props.game);
  const [total, setTotal] = useState(null);
  const [equation, setEquation] = useState([]);
  const [nodes, setNodes] = useState([]);
  const [operators, setOperators] = useState([]);
  const [history, setHistory] = useState([]);

  const [maxNodeSize, setMaxNodeSize] = useState(0);

  /* GAME STATES */
  const [gamePaused, setGamePaused] = useState(false);
  const [gameLost, setGameLost] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [showingHintModal, setShowingHintModal] = useState(false);

  useEffect(() => {
    setupGame(gameState);
    setMaxNodeSize(getMaxNodeSize(gameState.nums.length));

    AdMobInterstitial.requestAdAsync().catch(e => console.log('error', e));

    return () => {
      AdMobInterstitial.removeEventListener('interstitialDidClose');
    };
  }, []);

  const setupGame = game => {
    const { difficulty, nums } = game;

    setNodes(
      generateNumberNodesData(nums).map(node => {
        node.selected = false;
        return node;
      })
    );
    setOperators(DIFFICULTY_CONFIGS[difficulty].operators);
  };

  const userHasEnoughBrainPowerForHint = () =>
    mode === 'practice' ? true : context.brainPower >= BRAIN_POWER_REQUIRED_TO_UNLOCK_HINT;

  /* MODAL BUTTON PRESSES */
  const resumeGame = () => setGamePaused(false);
  const onExitPress = () => navigation.navigate(onExitScreen);
  const resetGame = () => {
    setTotal(null);
    setEquation([]);
    setNodes(history[0].nodes);
    setGameLost(false);
    setHistory([]);
  };
  const dismissHintModal = () => setShowingHintModal(false);

  const unlockHint = hint => {
    const updatedHintsUnlocked = gameState.hintsUnlocked + 1;
    const gameWithUpdatedHints = { ...gameState, hintsUnlocked: updatedHintsUnlocked };

    setGameState(gameWithUpdatedHints);

    if (mode !== 'practice') {
      persistGameChanges(context, gameWithUpdatedHints);
      BrainPowerHelpers.deductFromTotalBrainPower(context, BRAIN_POWER_REQUIRED_TO_UNLOCK_HINT);
    }

    if (onUnlockHint) {
      onUnlockHint(gameWithUpdatedHints);
    }
  };

  /* GAME OPTIONS BUTTON PRESS*/
  const pauseGame = () => setGamePaused(true);
  const showHintModal = () => setShowingHintModal(true);
  const onUndoButtonPress = () => {
    const gameHistory = [...history];
    const previousState = gameHistory.pop();

    if (previousState && previousState.equation) {
      setEquation(previousState.equation);
    }

    if (previousState && previousState.nodes) {
      setNodes(previousState.nodes);
    }

    if (previousState && previousState.hasOwnProperty('total')) {
      setTotal(previousState.total);
    }

    setHistory(gameHistory);
  };

  /* GAME FUNCTIONALITY */
  const winGame = () => setGameWon(true);
  const loseGame = () => setGameLost(true);

  const onOperatorButtonPress = operator => {
    if (equation.length === 1) {
      updateGameState([[setEquation, [...equation, operator]]]);
    } else if (equation.length === 2) {
      updateGameState([[setEquation, [equation[0], operator]]]);
    }
  };

  const equationIsExpectingOperator = () => equation.length === 1;
  const equationIsExpectingLeftOperand = () => equation.length === 0 || equation.length === 3;
  const equationIsExpectingRightOperand = () => equation.length === 2;

  const isValidNodePress = node => !equationIsExpectingOperator() || node.selected;
  const toggleNode = node => ({ ...node, selected: !node.selected });

  const onNodePress = node => {
    if (isValidNodePress(node)) {
      const pressedNode = toggleNode(node);
      updateGameState([[setNodes, getUpdatedNodes(pressedNode)]]);

      const pressHasDeselectedNode = pressedNode.selected === false;

      if (pressHasDeselectedNode) {
        handleNodeDeselect();
      } else {
        handleNodeSelect(pressedNode);
      }
    }
  };

  const deselectNodes = nodes =>
    updateGameState([
      [
        setNodes,
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
      const operationResolution = handleNodesOperation(nodes, [...equation, node], maxNodeSize);
      const nodesAfterOperation = operationResolution[0];

      updateGameState([
        [setTotal, operationResolution[1]],
        [setEquation, [...equation, node]],
        [setNodes, nodesAfterOperation],
      ]);
      deselectNodes(nodesAfterOperation);
      checkForCompletedGame(nodesAfterOperation);
    }
  };

  const getUpdatedNodes = node => {
    const gameNodes = [...nodes];
    const positionOfNodeToUpdate = gameNodes.findIndex(nodeFromState => node.id === nodeFromState.id);

    gameNodes[positionOfNodeToUpdate] = node;
    return gameNodes;
  };

  const updateGameState = setStateFunctionsAndData => {
    snapshotCurrentState();
    setStateFunctionsAndData.forEach(([setStateFunction, data]) => setStateFunction(data));
  };

  const snapshotCurrentState = () => {
    const newHistory = [...history, { equation, nodes, total }];
    setHistory(newHistory);
  };

  const checkForCompletedGame = remainingNodes => {
    if (GameStateHelpers.gameIsInCompletedState(remainingNodes)) {
      const continueGame = () => handleGameCompletion(remainingNodes);

      if (AdHelpers.shouldShowAd(context)) {
        AdHelpers.showAd(continueGame, context);
      } else {
        context.setLevelsPlayedBetweenAds(context.levelsPlayedBetweenAds + 1);
        continueGame();
      }
    }
  };

  const handleGameCompletion = nodes => {
    if (GameStateHelpers.gameIsInWinningState(gameState, nodes)) {
      winGame();

      BrainPowerHelpers.addToTotalEarnedBrainPower(context, getEarnedBrainPower());

      onGameWon();
    } else {
      loseGame();
    }
  };

  const inPracticeMode = mode === 'practice';

  const getEarnedBrainPower = () => {
    if (inPracticeMode) {
      return BRAIN_POWER_AWARDED_FOR_PRACTICE_GAME;
    } else {
      if (levelHasNeverBeforeBeenWon) {
        return BrainPowerHelpers.getEarnedBrainPower(gameState.difficulty);
      } else {
        return 0;
      }
    }
  };

  return (
    <View style={styles.container}>
      <HowToModal context={context} visible={context.isFirstTimeOpeningApp} />
      <PauseModal
        brainPower={context.brainPower}
        visible={gamePaused}
        onResumePress={resumeGame}
        onExitPress={onExitPress}
        mode={mode}
        level={navigation.getParam('level')}
      />
      <GameLostModal visible={gameLost} onResetPress={resetGame} onExitPress={onExitPress} mode={mode} />
      <HintModal
        brainPower={context.brainPower}
        hints={gameState.hints}
        hintsUnlocked={gameState.hintsUnlocked}
        onDismissPress={dismissHintModal}
        onUnlockHintPress={unlockHint}
        userHasEnoughBrainPowerForHint={userHasEnoughBrainPowerForHint()}
        mode={mode}
        visible={showingHintModal}
        level={navigation.getParam('level')}
      />
      <GameWonModal
        visible={gameWon}
        earnedBrainPower={getEarnedBrainPower()}
        onNextLevelPress={onNextGamePress}
        onExitPress={onExitPress}
        mode={mode}
      />
      <View style={styles.topSectionContainer}>
        <View style={styles.placeholder} />
        <View style={styles.topSectionNumbers}>
          <Text style={styles.targetNumber}>{gameState.target}</Text>
          <View style={styles.totalContainer}>
            {total !== null && <Text style={styles.total(total)}>{total}</Text>}
          </View>
        </View>
        <View style={styles.topSectionButtons}>
          <PauseButton onPress={pauseGame} />
          <HelpButton onPress={showHintModal} />
          <UndoButton onPress={onUndoButtonPress} />
        </View>
      </View>
      <EquationDisplay equation={equation} />
      <View style={styles.nodesContainer}>
        <View style={styles.nodesWrapper}>
          {!!nodes &&
            nodes.map((data, i) => (
              <NumberNode
                key={`node=${i}`}
                data={data}
                onPress={() => onNodePress(data)}
                spacing={{
                  marginHorizontal: data.spacing[0],
                  marginVertical: data.spacing[1],
                }}
                context={context}
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

export default Game;

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
    paddingBottom: IPHONE_8_OR_SMALLER ? 20 : 35,
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
    ...Platform.select({
      android: {
        lineHeight: Typography.large.fontSize,
      },
    }),
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
    minHeight: 150,
    justifyContent: 'space-between',
  },
  topSectionNumbers: {
    width: topMidSectionWidth,
  },
  totalContainer: {
    height: 60,
  },
  total: total => {
    const calculatedFontSize = String(total).length > 4 ? 45 : Typography.large.fontSize;
    return {
      ...Typography.mainFont,
      color: Colors.gray,
      textAlign: 'center',
      fontSize: calculatedFontSize,
      ...Platform.select({
        android: {
          lineHeight: calculatedFontSize,
        },
      }),
    };
  },
});
