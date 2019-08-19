// import { ADDITION_OPERATOR } from '../util/operations';

const ADD = 'add';
const SUBTRACT = 'subtract';
const MULTIPLY = 'multiply';
const DIVIDE = 'divide';
const EASY_OPERATORS = [ADD, SUBTRACT];

/* copied from operations.js */

const roundToTwoDecimals = num => Math.round(num * 100) / 100;

const operations = {
  [ADD]: (a, b) => a + b,
  [SUBTRACT]: (a, b) => a - b,
  [MULTIPLY]: (a, b) => roundToTwoDecimals(a * b),
  [DIVIDE]: (a, b) => roundToTwoDecimals(a / b),
};

const DIFFICULTY_CONFIGS = {
  superStarter: {
    maxTarget: 10,
    numOfNodes: 2,
    operators: EASY_OPERATORS,
  },
  starter: {
    maxTarget: 15,
    numOfNodes: 3,
    operators: EASY_OPERATORS,
  },
};

// chose random whole number as target
const chooseRandomTargetNumber = (max = 50) => Math.floor(Math.random() * max) + 1;

// choose random operation
const chooseRandomOperation = operators => operations[operators[Math.floor(Math.random() * operators.length)]];

// choose random second operand that is less than first operand
const chooseRandomSecondOperand = firstOperand => Math.floor(Math.random() * firstOperand - 1) + 2;

const generateBoard = config => {
  const { maxTarget, numOfNodes, operators } = config;
  const target = chooseRandomTargetNumber(maxTarget);

  const nodes = [target];
  /* this layer attribute is not really serving a purpose at the moment other
    than nice visibility when testing */

  while (nodes.length !== numOfNodes) {
    const head = nodes[0];

    const secondOperand = chooseRandomSecondOperand(head);
    const operation = chooseRandomOperation(operators);

    const leftChild = secondOperand;

    const rightChild = operation(head, secondOperand);

    nodes.shift();
    nodes.push(leftChild, rightChild);
  }

  console.log('return', { target, nodes });
  return { target, nodes };
};

generateBoard(DIFFICULTY_CONFIGS.starter);
// add difficulty attribute to board
