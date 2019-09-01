import { Dimensions } from 'react-native';
import { IPHONE_8_OR_SMALLER } from './constants';

export const MIN_NODE_SIZE = IPHONE_8_OR_SMALLER ? 60 : 80;
export const VERTICAL_SPACING = Math.floor(Math.random() * 10) + 3;
export const HORIZONTAL_SPACING = Math.floor(Math.random() * 30) + 3;

// without considering spacing
export const getMaxNodeSize = numOfNodes => {
  const nodesContainerHeight = Dimensions.get('window').height * 0.6;
  const nodesContainerWidth = Dimensions.get('window').width;
  let smallerContainerSide;
  let largerContainerSide;

  if (nodesContainerHeight <= nodesContainerWidth) {
    smallerContainerSide = nodesContainerHeight;
    largerContainerSide = nodesContainerWidth;
  } else {
    smallerContainerSide = nodesContainerWidth;
    largerContainerSide = nodesContainerHeight;
  }

  const containerSideRequiredBasedOnSmallerSize = smallerContainerSide * numOfNodes;

  let maxSize;

  if (containerSideRequiredBasedOnSmallerSize > largerContainerSide) {
    const difference = containerSideRequiredBasedOnSmallerSize - largerContainerSide;
    const differenceSplitBetweenNodes = difference / numOfNodes;
    const largestPossibleSize = smallerContainerSide - differenceSplitBetweenNodes;

    maxSize = Math.floor(largestPossibleSize) < 200 ? Math.floor(largestPossibleSize) : 200;
  } else {
    maxSize = Math.floor(containerSideRequiredBasedOnSmallerSize);
  }

  return maxSize > MIN_NODE_SIZE ? maxSize : MIN_NODE_SIZE;
};
