import { getMaxNodeSize, MIN_NODE_SIZE, HORIZONTAL_SPACING, VERTICAL_SPACING } from '../util/nodes';

const generateNumberNodesData = nums => {
  const maxNodeSize = getMaxNodeSize(nums.length);
  const RANGE = maxNodeSize - MIN_NODE_SIZE;
  const calculateNodeSize = relativeSize => MIN_NODE_SIZE + Math.round(RANGE * relativeSize);

  const smallestNum = Math.min(...nums);
  const largestNum = Math.max(...nums);
  const smallestNumPosition = nums.indexOf(smallestNum);
  const largestNumPosition = nums.indexOf(largestNum);
  const numbersRange = largestNum - smallestNum;

  return nums.map((num, i) => {
    if (i === smallestNumPosition || num === smallestNum) {
      return { id: i + 1, size: MIN_NODE_SIZE, spacing: [HORIZONTAL_SPACING(), VERTICAL_SPACING()], num };
    } else if (i === largestNumPosition || num === largestNum) {
      return { id: i + 1, size: maxNodeSize, spacing: [HORIZONTAL_SPACING(), VERTICAL_SPACING()], num };
    } else {
      /* this should technically eventually use the same logic as
      in updateNodeSize.js - may need to switch this to a for loop to get it to work though */
      const calculatedSize = calculateNodeSize(num / numbersRange);
      let nodeSize;

      if (calculatedSize > maxNodeSize) {
        nodeSize = maxNodeSize;
      } else if (calculatedSize < MIN_NODE_SIZE) {
        nodeSize = MIN_NODE_SIZE;
      } else {
        nodeSize = calculatedSize;
      }

      return { id: i + 1, size: nodeSize, spacing: [HORIZONTAL_SPACING(), VERTICAL_SPACING()], num };
    }
  });
};

export default generateNumberNodesData;
