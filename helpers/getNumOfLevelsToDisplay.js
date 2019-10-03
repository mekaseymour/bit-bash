import { LEVELS_PER_SECTION } from '../config/gameConfig';
import furthestCompletedLevel from './furthestCompletedLevel';

const getNumOfLevelsToDisplay = context => {
  const { furthestSeenLevel, completedLevels } = context;

  if (Object.values(furthestSeenLevel).length === 0) return LEVELS_PER_SECTION;

  if (furthestSeenLevel.id < LEVELS_PER_SECTION) {
    return LEVELS_PER_SECTION;
  } else if (furthestSeenLevel.id % LEVELS_PER_SECTION === 0) {
    if (furthestSeenLevel.id === furthestCompletedLevel(context).id) {
      return furthestSeenLevel.id + LEVELS_PER_SECTION;
    } else {
      return furthestSeenLevel.id;
    }
  } else {
    return (Math.floor(furthestSeenLevel.id / LEVELS_PER_SECTION) + 1) * LEVELS_PER_SECTION;
  }
};

export default getNumOfLevelsToDisplay;
