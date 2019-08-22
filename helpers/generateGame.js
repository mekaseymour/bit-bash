import operations, { ADD, SUBTRACT, MULTIPLY, DIVIDE } from '../util/operations';
import getRandomFactorOfOperand from './getRandomFactorOfOperand';

const EASY_OPERATORS = [ADD, SUBTRACT];
const MEDIUM_OPERATORS = [...EASY_OPERATORS, MULTIPLY, DIVIDE];

const SUPER_STARTER = 0;
const STARTER = 1;
const NOVICE = 2;
const JUNIOR = 3;
const INTERMEDIATE = 4;

export const DIFFICULTY_CONFIGS = {
  [SUPER_STARTER]: {
    maxTarget: 10,
    numOfNodes: 2,
    operators: EASY_OPERATORS,
    difficulty: SUPER_STARTER,
  },
  [STARTER]: {
    maxTarget: 15,
    numOfNodes: 3,
    operators: EASY_OPERATORS,
    difficulty: STARTER,
  },
  [NOVICE]: {
    maxTarget: 50,
    numOfNodes: 4,
    operators: EASY_OPERATORS,
    difficulty: NOVICE,
  },
  [JUNIOR]: {
    maxTarget: 50,
    numOfNodes: 5,
    operators: EASY_OPERATORS,
    difficulty: JUNIOR,
  },
  [INTERMEDIATE]: {
    maxTarget: 50,
    numOfNodes: 3,
    operators: MEDIUM_OPERATORS,
    difficulty: INTERMEDIATE,
  },
};

const MAX_LEVEL_FOR_SUPER_STARTER = 2;
const MAX_LEVEL_FOR_STARTER = MAX_LEVEL_FOR_SUPER_STARTER + 5;
const MAX_LEVEL_FOR_NOVICE = MAX_LEVEL_FOR_STARTER + 10;
const MAX_LEVEL_FOR_JUNIOR = MAX_LEVEL_FOR_NOVICE + 10;
const MAX_LEVEL_FOR_INTERMEDIATE = MAX_LEVEL_FOR_JUNIOR * 10000;

const determineDifficultyToBuild = level => {
  if (level <= MAX_LEVEL_FOR_SUPER_STARTER) {
    return SUPER_STARTER;
  } else if (level <= MAX_LEVEL_FOR_STARTER) {
    return STARTER;
  } else if (level <= MAX_LEVEL_FOR_NOVICE) {
    return NOVICE;
  } else if (level <= MAX_LEVEL_FOR_JUNIOR) {
    return JUNIOR;
  } else if (level <= MAX_LEVEL_FOR_INTERMEDIATE) {
    return INTERMEDIATE;
  }
};

const roundToTwoDecimals = num => Math.round(num * 100) / 100;

// chose random whole number as target
const chooseRandomTargetNumber = (max = 50) => Math.floor(Math.random() * max) + 1;

// choose random operation
const chooseRandomOperation = operators => operations[operators[Math.floor(Math.random() * operators.length)]];

// choose random second operand that is less than first operand
const chooseRandomSecondOperand = firstOperand => Math.floor(Math.random() * firstOperand - 1) + 2;

const generateGame = level => {
  const difficultyToBuild = determineDifficultyToBuild(level);

  const { maxTarget, numOfNodes, operators } = DIFFICULTY_CONFIGS[difficultyToBuild];
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

  return { id: level, target, nodes, difficulty: difficultyToBuild };
};

export default generateGame;
