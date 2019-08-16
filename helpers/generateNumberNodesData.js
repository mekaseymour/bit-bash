/*

Don't really want to do any sorting here because I want to
preserve the order of the generated boards

*/

const MIN_NODE_SIZE = 55;
const MAX_NODE_SIZE = 180;
const RANGE = MAX_NODE_SIZE - MIN_NODE_SIZE;

const calculateNodeSize = relativeSize => MIN_NODE_SIZE + Math.round(RANGE * relativeSize);

const generateNumberNodesData = nums => {
  const smallestNum = Math.min(...nums);
  const largestNum = Math.max(...nums);
  const smallestNumPos = nums.indexOf(smallestNum);
  const largestNumPos = nums.indexOf(largestNum);
  const numbersRange = largestNum - smallestNum;

  return nums.map((num, i) => {
    if (i === smallestNumPos) {
      return { size: MIN_NODE_SIZE, num };
    } else if (i === largestNumPos) {
      return { size: MAX_NODE_SIZE, num };
    } else {
      return { size: calculateNodeSize(num / numbersRange), num };
    }
  });
};

export default generateNumberNodesData;
