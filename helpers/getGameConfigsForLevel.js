import { ADD, SUBTRACT, MULTIPLY, DIVIDE } from '../util/operations';
import { LEVELS_PER_SECTION } from '../config/gameConfig';

const EASY_OPERATORS = [ADD, SUBTRACT];
const MEDIUM_OPERATORS = [...EASY_OPERATORS, MULTIPLY, DIVIDE];

export const DIFFICULTY_CONFIGS = {
  0: {
    maxTarget: 10,
    numOfNodes: 2,
    operators: EASY_OPERATORS,
    difficulty: 0,
  },
  1: {
    maxTarget: 15,
    numOfNodes: 3,
    operators: EASY_OPERATORS,
    difficulty: 1,
  },
  2: {
    maxTarget: 50,
    numOfNodes: 4,
    operators: EASY_OPERATORS,
    difficulty: 2,
  },
  3: {
    maxTarget: 50,
    numOfNodes: 5,
    operators: EASY_OPERATORS,
    difficulty: 3,
  },
  4: {
    maxTarget: 50,
    numOfNodes: 3,
    operators: MEDIUM_OPERATORS,
    difficulty: 4,
  },
};

const getGameConfigsForLevel = level => {
  const difficultyForSection = Math.floor(level / LEVELS_PER_SECTION);
  const highestDifficultyLevel = Object.keys(DIFFICULTY_CONFIGS).length - 1;

  if (difficultyForSection > highestDifficultyLevel) {
    return DIFFICULTY_CONFIGS[highestDifficultyLevel];
  } else {
    return DIFFICULTY_CONFIGS[difficultyForSection];
  }
};

export default getGameConfigsForLevel;
