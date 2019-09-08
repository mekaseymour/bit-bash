import operations, { ADD, SUBTRACT, MULTIPLY, DIVIDE } from '../util/operations';
import getRandomFactorOfOperand from './getRandomFactorOfOperand';
import getGameConfigsForLevel from './getGameConfigsForLevel';
import randomNumber from './randomNumber';
import getOperandForMultiplication from './getOperandForMultiplication';
import getOppositeOperator from './getOppositeOperator';
import formatHintForDisplay from './formatHintForDisplay';

const roundToTwoDecimals = num => Math.round(num * 100) / 100;

// choose random operation
const chooseRandomOperator = operators => operators[Math.floor(Math.random() * operators.length)];

// choose random second operand that is less than first operand
const chooseRandomSecondOperand = firstOperand => Math.floor(Math.random() * firstOperand - 1) + 2;

const generateGame = level => {
  const difficultyToBuild = getGameConfigsForLevel(level);

  const { maxTarget, numOfNodes, operators } = difficultyToBuild;
  const target = randomNumber(maxTarget);

  const nodes = [target];
  const hints = [];

  while (nodes.length !== numOfNodes) {
    const head = nodes[0];

    const operator = chooseRandomOperator(operators);

    const operation = operations[operator];
    let secondOperand;

    if (operation === operations[DIVIDE]) {
      secondOperand = getRandomFactorOfOperand(head);
    } else if (operation === operations[MULTIPLY]) {
      secondOperand = getOperandForMultiplication(head);
    } else {
      secondOperand = chooseRandomSecondOperand(head);
    }

    const leftChild = secondOperand;
    const rightChild = operation(head, secondOperand);

    hints.unshift(formatHintForDisplay(rightChild, leftChild, getOppositeOperator(operator), head));

    nodes.shift();
    nodes.push(leftChild, rightChild);
  }

  return { id: level, target, nums: nodes, difficulty: difficultyToBuild.difficulty, hints, hintsUnlocked: 0 };
};

export default generateGame;
