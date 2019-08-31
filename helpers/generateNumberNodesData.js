import { getMaxNodeSize } from '../util/nodes';

const generateNumberNodesData = nums => {
  const maxNodeSize = getMaxNodeSize(nums.length);
  const minNodeSize = Math.floor(maxNodeSize / 2);
  const RANGE = maxNodeSize - minNodeSize;
  const calculateNodeSize = relativeSize => minNodeSize + Math.round(RANGE * relativeSize);

  const smallestNum = Math.min(...nums);
  const largestNum = Math.max(...nums);
  const smallestNumPosition = nums.indexOf(smallestNum);
  const largestNumPosition = nums.indexOf(largestNum);
  const numbersRange = largestNum - smallestNum;

  return nums.map((num, i) => {
    if (i === smallestNumPosition || num === smallestNum) {
      return { id: i + 1, size: minNodeSize, num };
    } else if (i === largestNumPosition || num === largestNum) {
      return { id: i + 1, size: maxNodeSize, num };
    } else {
      /* this should technically eventually use the same logic as
      in updateNodeSize.js - may need to switch this to a for loop to get it to work though */
      const calculatedSize = calculateNodeSize(num / numbersRange);
      let nodeSize;

      if (calculatedSize > maxNodeSize) {
        nodeSize = maxNodeSize;
      } else if (calculatedSize < minNodeSize) {
        nodeSize = minNodeSize;
      } else {
        nodeSize = calculatedSize;
      }

      return { id: i + 1, size: nodeSize, num };
    }
  });
};

export default generateNumberNodesData;
