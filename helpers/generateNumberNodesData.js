import { MIN_NODE_SIZE, MAX_NODE_SIZE } from '../util/nodes';

const RANGE = MAX_NODE_SIZE - MIN_NODE_SIZE;

const calculateNodeSize = relativeSize => MIN_NODE_SIZE + Math.round(RANGE * relativeSize);

const generateNumberNodesData = nums => {
  const smallestNum = Math.min(...nums);
  const largestNum = Math.max(...nums);
  const smallestNumPosition = nums.indexOf(smallestNum);
  const largestNumPosition = nums.indexOf(largestNum);
  const numbersRange = largestNum - smallestNum;

  return nums.map((num, i) => {
    if (i === smallestNumPosition || num === smallestNum) {
      return { id: i + 1, size: MIN_NODE_SIZE, num };
    } else if (i === largestNumPosition || num === largestNum) {
      return { id: i + 1, size: MAX_NODE_SIZE, num };
    } else {
      return { id: i + 1, size: calculateNodeSize(num / numbersRange), num };
    }
  });
};

export default generateNumberNodesData;
