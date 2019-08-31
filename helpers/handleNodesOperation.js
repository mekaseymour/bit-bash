import updateNodeSize from './updateNodeSize';
import resolveEquation from './resolveEquation';

const handleNodesOperation = (nodes, equation, maxNodeSize) => {
  const [leftSideNode, operator, rightSideNode] = equation;

  const result = resolveEquation(leftSideNode, rightSideNode, operator);
  const remainingNodes = nodes.filter(n => n.id !== leftSideNode.id && n.id !== rightSideNode.id);
  const updatedNodeSize = updateNodeSize(result, remainingNodes, leftSideNode, maxNodeSize);

  const newNodes = [...nodes];
  const indexOfLeftOperand = nodes.findIndex(node => node.id === leftSideNode.id);
  const indexOfRightOperand = nodes.findIndex(node => node.id === rightSideNode.id);

  newNodes[indexOfLeftOperand] = { ...leftSideNode, size: updatedNodeSize, num: result };
  newNodes.splice(indexOfRightOperand, 1);

  return [newNodes, result];
};

export default handleNodesOperation;
