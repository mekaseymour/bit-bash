import operations, { ADD, SUBTRACT, MULTIPLY, DIVIDE } from '../util/operations';
import getRandomFactorOfOperand from './getRandomFactorOfOperand';
import getGameConfigsForLevel from './getGameConfigsForLevel';

const roundToTwoDecimals = num => Math.round(num * 100) / 100;

// chose random whole number as target
const chooseRandomTargetNumber = (max = 50) => Math.floor(Math.random() * max) + 1;

// choose random operation
const chooseRandomOperation = operators => operations[operators[Math.floor(Math.random() * operators.length)]];

// choose random second operand that is less than first operand
const chooseRandomSecondOperand = firstOperand => Math.floor(Math.random() * firstOperand - 1) + 2;

const generateGame = level => {
  const difficultyToBuild = getGameConfigsForLevel(level);

  const { maxTarget, numOfNodes, operators } = difficultyToBuild;
  const target = chooseRandomTargetNumber(maxTarget);

  const nodes = [target];

  while (nodes.length !== numOfNodes) {
    const head = nodes[0];

    const operation = chooseRandomOperation(operators);
    let secondOperand;

    if (operation === operations[DIVIDE]) {
      secondOperand = getRandomFactorOfOperand(head);
    } else {
      secondOperand = chooseRandomSecondOperand(head);
    }

    const leftChild = secondOperand;

    const rightChild = operation(head, secondOperand);

    nodes.shift();
    nodes.push(leftChild, rightChild);
  }

  return { id: level, target, nums: nodes, difficulty: difficultyToBuild.difficulty };
};

export default generateGame;
