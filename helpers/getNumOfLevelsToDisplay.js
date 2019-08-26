import { LEVELS_PER_SECTION } from '../config/gameConfig';

const getNumOfLevelsToDisplay = (levelsCompleted, levelsPerSection = LEVELS_PER_SECTION) => {
  const levelsCompletedToLevelsInSectionRatio = levelsCompleted / levelsPerSection;
  if (levelsCompletedToLevelsInSectionRatio < 1) {
    return levelsPerSection;
  } else {
    return Math.ceil(levelsCompletedToLevelsInSectionRatio) * levelsPerSection;
  }
};

export default getNumOfLevelsToDisplay;
