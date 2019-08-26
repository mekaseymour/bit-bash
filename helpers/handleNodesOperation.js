import operations, {
  ADD,
  SUBTRACT,
  MULTIPLY,
  DIVIDE,
  ADDITION_OPERATOR,
  SUBTRACTION_OPERATOR,
  MULTIPLICATION_OPERATOR,
  DIVISION_OPERATOR,
} from '../util/operations';
import { MIN_NODE_SIZE, MAX_NODE_SIZE } from '../util/nodes';

const updateSize = (left, result) => {
  const changeInNodeNumber = left.num === 0 ? result : result / left.num;
  const newNodeSize = left.size * changeInNodeNumber;

  if (newNodeSize < MIN_NODE_SIZE) {
    return MIN_NODE_SIZE;
  } else if (newNodeSize > MAX_NODE_SIZE) {
    return MAX_NODE_SIZE;
  } else {
    return newNodeSize;
  }
};

const resolveEquation = (left, right, operator) => {
  switch (operator) {
    case ADDITION_OPERATOR:
      return operations[ADD](left.num, right.num);
    case SUBTRACTION_OPERATOR:
      return operations[SUBTRACT](left.num, right.num);
    case MULTIPLICATION_OPERATOR:
      return operations[MULTIPLY](left.num, right.num);
    case DIVISION_OPERATOR:
      return operations[DIVIDE](left.num, right.num);
  }
};

const handleNodesOperation = (nodes, equation) => {
  const leftSideNode = equation[0];
  const rightSideNode = equation[2];
  const operator = equation[1];

  const result = resolveEquation(leftSideNode, rightSideNode, operator);
  const updatedNodeSize = updateSize(leftSideNode, result);

  const newNodes = [...nodes];
  const indexOfLeftOperand = nodes.findIndex(node => node.id === leftSideNode.id);
  const indexOfRightOperand = nodes.findIndex(node => node.id === rightSideNode.id);

  newNodes[indexOfLeftOperand] = { ...leftSideNode, size: updatedNodeSize, num: result };
  newNodes.splice(indexOfRightOperand, 1);

  return [newNodes, result];
};

export default handleNodesOperation;
