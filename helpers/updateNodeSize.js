import { MIN_NODE_SIZE, MAX_NODE_SIZE } from '../util/nodes';

const updateNodeSize = (result, remainingNodes, leftSideNode) => {
  const resultObj = { id: 'result', num: result };
  const sortedByNums = [...remainingNodes, resultObj].sort((a, b) => a.num - b.num);
  const resultPosition = sortedByNums.findIndex(n => n.id === 'result');

  const nodeToLeftOfResult = sortedByNums[resultPosition - 1];
  const nodeToRightOfResult = sortedByNums[resultPosition + 1];
  const resultNodeHasSameValueAsLeftNode = !!(nodeToLeftOfResult && nodeToLeftOfResult.num === result);
  const resultNodeHasSameValueAsRightNode = !!(nodeToRightOfResult && nodeToRightOfResult.num === result);
  const resultIsNewSmallestValue = !nodeToLeftOfResult;
  const resultIsNewLargestValue = !nodeToRightOfResult;

  if (resultNodeHasSameValueAsLeftNode) {
    return nodeToLeftOfResult.size;
  } else if (resultNodeHasSameValueAsRightNode) {
    return nodeToRightOfResult.size;
  } else if (resultIsNewSmallestValue) {
    return MIN_NODE_SIZE;
  } else if (resultIsNewLargestValue) {
    return MAX_NODE_SIZE;
  } else {
    const neighboringNodesSizeRange = nodeToRightOfResult.size - nodeToLeftOfResult.size;
    const neighboringNodesNumRange = nodeToRightOfResult.num - nodeToLeftOfResult.num;
    const resultToLeftNeighborNumRange = result - nodeToLeftOfResult.num;

    const totalRangeToResultRangeRatio = resultToLeftNeighborNumRange / neighboringNodesNumRange;
    const differenceInSizeFromLeftNode = neighboringNodesSizeRange * totalRangeToResultRangeRatio;

    const calculatedSize = leftSideNode.size + differenceInSizeFromLeftNode;

    return calculatedSize;
  }
};

export default updateNodeSize;
